import {Injectable} from '@nestjs/common';
import {Dayjs} from "dayjs";
import {loadModule, Model, Variable} from "glpk-ts";
import {
    AccSpec,
    ConsumptionPlan,
    Forecast,
    OptimizationParameters,
    OptimizationResult, PlannedPeriod,
    PriceSpec, PumpPlan,
    PumpSpec,
    Shower
} from "./optimizationParameters";


@Injectable()
export class OptimizationService {

    public async optimize(params: OptimizationParameters<Dayjs>): Promise<OptimizationResult<Dayjs>> {
        await loadModule();

        const {
            time,
            split_hours_into,
            plan_hours,
            indoor,
            outdoor,
            radiator,
            acc_spec,
            hot_water,
            pump_spec,
            showers
        } = params;

        const number_of_periods = plan_hours * split_hours_into;

        const start_of_current_hour = time
            .subtract(time.millisecond(), "ms")
            .subtract(time.second(), "second")
            .subtract(time.minute(), "minute");

        const start_of_current_day = start_of_current_hour.subtract(time.hour(), "hour");


        const current_part_of_hour = time.diff(start_of_current_hour, "hour", true);
        const current_split_hour = Math.floor(current_part_of_hour * split_hours_into);
        const current_split_hour_start = start_of_current_hour.add(current_split_hour * (60 / split_hours_into), "minute");

        const showerX = new ShowerExtractor(showers);
        const prices = new PriceExtractor(params.prices, start_of_current_day);
        const outdoorTemps = new OutdoorTempExtractor(outdoor);
        const pumpEffect = new PumpEffectExtractor(pump_spec, acc_spec.liters);

        // water heat storage capacity in Wh per degree celcius
        const acc_heat_capacity = acc_spec.liters * 1.16;

        const periods = [...Array(number_of_periods).keys()]
            .map((_, i) => {
                const start = i === 0
                    ? time
                    : current_split_hour_start.add(i * (60 / split_hours_into), "minute");
                const end = current_split_hour_start.add((i + 1) * (60 / split_hours_into), "minute");
                const duration = end.diff(start, "hour", true);

                return {start, end, duration}
            })
            .map(period => ({
                ...period,
                outdoor_temp: outdoorTemps.get_temp_at(period.start)
            }))
            .map(period => ({
                ...period,
                rad_flow_temp: Math.max(
                    indoor.target_temp
                    + (indoor.target_temp - (indoor.current_temp !== undefined ? indoor.current_temp : indoor.target_temp))
                    + (indoor.target_temp - period.outdoor_temp - indoor.passive_heating_degrees) * radiator.c_flow,
                    indoor.target_temp)
            }))
            .map(period => ({
                ...period,
                acc_min_temp: Math.max(
                    period.rad_flow_temp - (acc_spec.radiator_flow_temp_above_acc_avg_temp || 0),
                    hot_water.min_temp,
                    acc_spec.min_temp,
                    showerX.get_shower(period).temp)
            }))
            .map(period => ({
                ...period,
                price: prices.get_price_at(period.start)
            }))
            .map(period => {
                const radiator_temp_change = (period.rad_flow_temp - indoor.target_temp) * radiator.power_per_temp_delta * period.duration / acc_heat_capacity;
                const hot_water_temp_loss = (hot_water.average_power / acc_heat_capacity) * period.duration;
                const shower_temp_loss = period.duration * showerX.get_shower(period).power / acc_heat_capacity;
                return ({
                    ...period,
                    consumption: {
                        radiator: radiator_temp_change,
                        hot_water: hot_water_temp_loss,
                        shower: shower_temp_loss,
                        total: radiator_temp_change + hot_water_temp_loss + shower_temp_loss
                    }
                });
            });

        const model = new Model({name: "Optimize", sense: "min"})

        const acc_temp = periods.map((period, i) =>
            model.addVar({
                name: `acc_temp_${period.start.format("YYYY-MM-DD_HH:mm")}`,
                lb: i === 0 ? acc_spec.current_temp : period.acc_min_temp,
                ub: i === 0 ? acc_spec.current_temp : Math.min(acc_spec.max_temp, pump_spec.max_temp),
                type: "continuous",
            }));

        const acc_surrounding_diff = periods.map((period, period_i) =>
            model.addVar({
                name: `acc_surrounding_diff_${period.start.format("YYYY-MM-DD_HH:mm")}`,
                type: "continuous",
                obj: 0,
            }));

        // constraint temeraturdiff mot omgivningen
        periods.forEach((period, period_i) => {
            model.addConstr({
                name: `calc_acc_surrounding_diff_${period.start.format("YYYY-MM-DD_HH:mm")}`,
                coeffs: [
                    [acc_temp[period_i], 1],
                    [acc_surrounding_diff[period_i], -1]],
                lb: indoor.current_temp !== undefined ? indoor.current_temp : indoor.target_temp,
                ub: indoor.current_temp !== undefined ? indoor.current_temp : indoor.target_temp
            })
        });

        // pump 0-1 power in respective temperature interval
        const period_pump = periods.map((period, period_i) =>
            pump_spec.power.map((powerSpec, power_i) =>
                model.addVar({
                    name: `pump_on_${period.start.format("YYYY-MM-DD_HH:mm")}_below_${powerSpec.below_degrees || "max"}`,
                    type: "continuous",
                    lb: 0,
                    ub: 1,
                    obj: period.price * powerSpec.consumed_power_watt * period.duration / 1000,
                })));

        // Constraint Ackumulatortankens temperaturändring
        periods.slice(0, periods.length - 1).forEach((period, period_i) =>
            model.addConstr({
                name: `acc_temp_change_${period.start.format("YYYY-MM-DD_HH:mm")}`,
                coeffs: [
                    [acc_temp[period_i], 1],
                    [acc_temp[period_i + 1], -1],
                    [acc_surrounding_diff[period_i], -acc_spec.temp_loss_per_hour_degrees * period.duration],
                    ...pumpEffect.heating_per_hour_intervals
                        .map((hph, i) =>
                            [period_pump[period_i][i], hph.deg * period.duration] as [Variable, number])],
                lb: period.consumption.total, // - showerTempLoss,
                ub: period.consumption.total// - showerTempLoss
            }));

        // Constraint sum of pump power <= 1
        period_pump.forEach((temp_intervals, i) => model.addConstr({
            name: `pump_power_sum_${i}`,
            coeffs: temp_intervals.map((pump) => [pump, 1]),
            lb: 0,
            ub: 1
        }));

        // constraints pump power in respective temperature interval
        const acc_below_limit = periods.map((period, period_i) =>
            pumpEffect.heating_per_hour_intervals
                .slice(0, pump_spec.power.length - 1)
                .map((main_hph, hph_i) => {


                    const below = model.addVar({
                        name: `acc_below_${period.start.format("YYYY-MM-DD_HH:mm")}_${main_hph.max_temp || "max"}`,
                        type: "binary",
                        obj: -0.00001, // "force" to 1
                    });

                    // either the effect of period_pump[period_i,hph_i] is below the temp limit
                    const m_1 = 30;
                    model.addConstr({
                        name: `pump_interval_${period.start.format("YYYY-MM-DD_HH:mm")}_${hph_i}_below_${main_hph.max_temp}`,
                        coeffs: [
                            [acc_temp[period_i], 1],
                            [acc_surrounding_diff[period_i], -acc_spec.temp_loss_per_hour_degrees * period.duration],
                            ...pumpEffect.heating_per_hour_intervals
                                .slice(0, hph_i + 1)
                                .map((hph, i) =>
                                    [period_pump[period_i][i], hph.deg * period.duration] as [Variable, number]),
                            [below, m_1]],
                        ub: main_hph.max_temp + period.consumption.total + m_1
                    })

                    // or the effect of period_pump[period_i,hph_i] is 0
                    const m_2 = 1;
                    model.addConstr({
                        name: `pump_interval_${period.start.format("YYYY-MM-DD_HH:mm")}_${hph_i}_below_${main_hph.max_temp}`,
                        coeffs: [
                            [period_pump[period_i][hph_i], 1],
                            [below, -m_2]],
                        ub: 0
                    })

                    return below;
                }))

        // solve
        model.intopt({presolve: true, limitTime: 10*1000});

        const result = this.getResult(
            x => x?.statusMIP,
            x => x?.valueMIP,
            model, periods, pump_spec, period_pump, acc_temp, acc_spec, acc_heat_capacity, acc_surrounding_diff, params);

        if (result.ok) {
            return result;
        }

        // try again with relaxed integer constraints
        model.simplex({});
        return this.getResult(
            x => x?.status,
            x => x?.value,
            model, periods, pump_spec, period_pump, acc_temp, acc_spec, acc_heat_capacity, acc_surrounding_diff, params);
    }

    private getResult(getStatus: (x?: { statusMIP: any; status: any }) => any,
                      getValue: (x?: { valueMIP: any; value: any }) => any,
                      model: Model,
                      periods: { duration: number; price: number; start: Dayjs; outdoor_temp: number; end: Dayjs; consumption: { shower: number; total: number; radiator: number; hot_water: number }; rad_flow_temp: number; acc_min_temp: number }[],
                      pump_spec: PumpSpec,
                      period_pump: Variable[][],
                      acc_temp: Variable[],
                      acc_spec: AccSpec,
                      acc_heat_capacity: number,
                      acc_surrounding_diff: Variable[],
                      params: OptimizationParameters<Dayjs>) {
        const ok = getStatus(model) === 'optimal' || getStatus(model) === 'feasible';

        const plan = periods.map((period, period_i) => {

            const pump_consumption = pump_spec.power.map((powerSpec, power_i) =>
                getValue(period_pump[period_i][power_i]) * powerSpec.consumed_power_watt)
                .reduce((prev, curr) => prev + curr, 0);

            const production = pump_spec.power.map((powerSpec, power_i) =>
                getValue(period_pump[period_i][power_i]) * powerSpec.heating_power_watt)
                .reduce((prev, curr) => prev + curr, 0);

            const nextHourStartTemp = getValue(acc_temp[period_i + 1]) || getValue(acc_temp[period_i]);
            const fullPowerTargetTemp = Math.max(
                nextHourStartTemp,
                getValue(acc_temp[period_i + 2]) || nextHourStartTemp);
            const noPowerTargetTemp = acc_spec.min_temp;
            const on_fraction = period_pump[period_i].reduce((prev, curr) => prev + getValue(curr), 0);
            const pump: PumpPlan = {
                on_fraction,
                consumption: pump_consumption,
                cost: pump_consumption * period.duration * period.price / 1000,
                production,
                target_temp:
                    on_fraction > 0
                        ? on_fraction > 0.66
                            ? fullPowerTargetTemp
                            : nextHourStartTemp
                        : noPowerTargetTemp
            };

            const consumption_radiator = period.consumption.radiator * acc_heat_capacity / period.duration;
            const consumption_hot_water = period.consumption.hot_water * acc_heat_capacity / period.duration;
            const consumption_shower = period.consumption.shower * acc_heat_capacity / period.duration;
            const consumption_loss = acc_spec.temp_loss_per_hour_degrees * getValue(acc_surrounding_diff[period_i]) * acc_heat_capacity;

            const consumption: ConsumptionPlan = {
                radiator: consumption_radiator,
                shower: consumption_shower,
                hot_water: consumption_hot_water,
                loss: consumption_loss,
                total: consumption_radiator + consumption_hot_water + consumption_shower + consumption_loss
            }

            const resultPeriod: PlannedPeriod<Dayjs> = {
                start: period.start,
                end: period.end,
                duration: period.duration,
                price: period.price,
                outdoor_temp: period.outdoor_temp,
                rad_flow_temp: period.rad_flow_temp,
                acc_temp: getValue(acc_temp[period_i]),
                consumption,
                pump
            }

            return resultPeriod;
        });

        return {
            result: getStatus(model),
            ok,
            plan,
            cost: getValue(model),
            params
        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}

class PriceExtractor {
    constructor(private readonly priceSpec: PriceSpec, private readonly startAt: Dayjs) {
        this.prices = [...priceSpec.today, ...priceSpec.tomorrow || [], ...priceSpec.today]
    }

    private readonly prices;

    get_price_at(time: Dayjs): number {
        const hour_since_start = time.diff(this.startAt, "hour");
        return this.prices[hour_since_start % this.prices.length];
    }
}

class OutdoorTempExtractor {
    constructor(private readonly forecasts: Forecast<Dayjs>[]) {

    }

    get_temp_at(time: Dayjs): number {
        return this.forecasts.reduce((prevTemp, f) => {
            return f.time.isBefore(time) || f.time.isSame(time) ? f.temp : prevTemp;
        }, this.forecasts[0]?.temp || 0);
    }
}

class PumpEffectExtractor {
    constructor(private readonly pumpSpec: PumpSpec, private readonly acc_volume: number) {

    }

    public readonly heating_per_hour_intervals = this.pumpSpec.power.map((powerSpec, power_i) => ({
        deg: this.get_heating_per_hour(power_i),
        max_temp: powerSpec.below_degrees || 10000
    }));

    get_heating_per_hour(i: number) {
        return this.pumpSpec.power[i].heating_power_watt / (this.acc_volume * 1.16);
    }

}

class ShowerExtractor {
    constructor(private readonly showers?: Shower<Dayjs>[]) {
    }

    get_shower(period: { start: Dayjs; end: Dayjs; duration: number }): { temp: number, power: number } {
        if (!this.showers) {
            return {temp: 0, power: 0};
        }

        const shower = this.showers.find(shower => !(shower.start.unix() >= period.end.unix() || shower.end.unix() <= period.start.unix()));
        if (!shower) {
            return {temp: 0, power: 0};
        }

        return {temp: shower.temp, power: shower.energy};

    }

}
