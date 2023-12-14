import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {OptimizationService} from './optimization.service';
import {
    AccSpec,
    Forecast, HotWaterSpec, IndoorSpec,
    OptimizationParameters,
    OptimizationResult,
    PumpSpec, RadiatorSpec,
    Shower
} from "./optimizationParameters";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";


@Controller()
export class AppController {
    constructor(private readonly appService: OptimizationService) {
    }

    private readonly logger = new Logger(AppController.name)

    private last_result?: OptimizationResult<string>;

    @Post("optimize")
    public async optimize(@Body() params: OptimizationParameters<string>) {
        this.logger.log("POST")
        const deserializedParams = transformParameters(params, stringToDay);
        this.last_result = transformResult(await this.appService.optimize(deserializedParams), dayToString);
        // this.last_result = transformResult<Dayjs, string>(await this.appService.optimize(parametersExample), dayToString);
        this.logger.log("POST done")
        return this.last_result;
    }

    @Get("optimize")
    public async get_result(@Body() params: OptimizationParameters<string>) {
        this.logger.log("GET")
        return this.last_result;
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}

const dayToString = (day: Dayjs) => day.format();
const stringToDay = (str: string) => dayjs(str);

function transformParameters<T1, T2>(params: OptimizationParameters<T1>, transformTime: (time: T1) => T2): OptimizationParameters<T2> {
    return {
        ...params,
        time: transformTime(params.time),
        showers: params.showers
            ?.map(shower => ({
                ...shower,
                start: transformTime(shower.start),
                end: transformTime(shower.end)
            }) as Shower<T2>),
        outdoor: params.outdoor
            .map(forecast => ({
                ...forecast,
                time: transformTime(forecast.time)
            }))
    }
}

function transformResult<T1, T2>(result: OptimizationResult<T1>, transformTime: (time: T1) => T2): OptimizationResult<T2> {
    return {
        ...result,
        params: transformParameters(result.params, transformTime),
        plan: result.plan.map(plan => ({
            ...plan,
            start: transformTime(plan.start),
            end: transformTime(plan.end)
        }))
    }
}
