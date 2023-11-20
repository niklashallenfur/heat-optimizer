import {
    AccSpec,
    Forecast,
    HotWaterSpec,
    IndoorSpec,
    OptimizationParameters,
    PumpSpec,
    RadiatorSpec,
    Shower
} from "./optimizationParameters";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";

export const example_day = dayjs("2023-11-01T00:00:00+01:00");
const pump_spec: PumpSpec = {
    start_delay_minutes: 2,
    max_temp: 55,
    power: [
        {
            below_degrees: 35,
            heating_power_watt: 8200,
            consumed_power_watt: 1980
        },
        {
            below_degrees: 45, // questionable!
            heating_power_watt: 7900,
            consumed_power_watt: 2200
        },
        {
            below_degrees: 50,
            heating_power_watt: 7850,
            consumed_power_watt: 2700
        },
        {
            // below_degrees: 55,
            heating_power_watt: 7200,
            consumed_power_watt: 3000
        },
        // {
        //     heating_power_watt: 6000,
        //     consumed_power_watt: 3500
        // }
    ]
}
const outdoor: Forecast<Dayjs>[] = Array(24).fill(0).map((_, i) => ({
    time: example_day.add(i, "hour"),
    temp: i
}))
const acc_spec: AccSpec = {
    liters: 500,
    max_temp: 60,
    min_temp: 20,
    current_temp: 30,
    temp_loss_per_hour_degrees: 0.02189
}
const indoor: IndoorSpec = {
    target_temp: 21,
    passive_heating_degrees: 0.1,
}
const showers: Shower<Dayjs>[] = [
    {
        temp: 50,
        start: example_day.add(22, "hour"),
        end: example_day.add(22, "hour").add(60, "minute"),
        energy: 1000
    }
]
const prices = {
    today: [
        1.281,
        1.208,
        1.204,
        1.202,
        1.256,
        1.677,
        1.721,
        3.232,
        3.644,
        3.001,
        2.653,
        2.385,
        2.288,
        2.302,
        2.048,
        2.29,
        2.303,
        2.787,
        2.744,
        1.985,
        1.818,
        1.766,
        1.313,
        1.198
    ]
}
const radiator: RadiatorSpec = {
    c_flow: 0.45,
    power_per_temp_delta: 400
}
const hot_water: HotWaterSpec = {
    min_temp: 20,
    average_power: 50
}
export const parametersExample: OptimizationParameters<Dayjs> = {
    time: example_day,
    split_hours_into: 3,
    plan_hours: 24,
    acc_spec,
    pump_spec,
    indoor,
    outdoor,
    radiator,
    prices,
    showers,
    hot_water
};
