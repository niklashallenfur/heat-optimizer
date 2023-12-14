export interface PumpSpec {
    start_delay_minutes: number,
    max_temp: number;
    power: {
        below_degrees?: number
        heating_power_watt: number
        consumed_power_watt: number
    }[];
}

export interface Forecast<TTime> {
    time: TTime;
    temp: number
}

export interface AccSpec {
    liters: number;
    temp_loss_per_hour_degrees: number;
    current_temp: number;
    min_temp: number;
    max_temp: number;
    radiator_flow_temp_above_acc_avg_temp?: number;
}

export interface Shower<TTime> {
    temp: number;
    start: TTime;
    end: TTime;
    energy: number;
}

export interface RadiatorSpec {
    c_flow: number;
    power_per_temp_delta: number;
}

export interface PriceSpec {
    today: number[];
    tomorrow?: number[];
}

export interface IndoorSpec {
    current_temp?: number;
    target_temp: number;
    passive_heating_degrees: number;
}

export interface HotWaterSpec {
    average_power: number;
    min_temp: number;
}

export interface OptimizationParameters<TTime> {
    time: TTime
    split_hours_into: number;
    plan_hours: number;
    pump_spec: PumpSpec;
    acc_spec: AccSpec;
    outdoor: Forecast<TTime>[];
    showers?: Shower<TTime>[];
    prices: PriceSpec;
    indoor: IndoorSpec;
    radiator: RadiatorSpec;
    hot_water: HotWaterSpec;
}

export interface PumpPlan {
    on_fraction: number;
    consumption: number;
    production: number;
    cost: number;
    target_temp: number;
}

export interface ConsumptionPlan {
    loss: number;
    hot_water: number;
    shower: number;
    radiator: number;
    total: number;
}

export interface PlannedPeriod<TTime> {
    start: TTime;
    end: TTime;
    duration: number;
    price: number;
    outdoor_temp: number;
    rad_flow_temp: number;
    acc_temp: number;
    pump: PumpPlan,
    consumption: ConsumptionPlan
}

export interface OptimizationResult<TTime> {
    params: OptimizationParameters<TTime>;
    result: string;
    ok: boolean;
    plan: PlannedPeriod<TTime> []

    cost: number
}
