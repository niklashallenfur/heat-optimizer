import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { OptimizationService } from "./optimization.service";
import {
    OptimizationParameters,
    OptimizationResult,
    Shower,
} from "./optimizationParameters";
import * as dayjs from "dayjs";
import { Dayjs } from "dayjs";

@Controller()
export class AppController {
    constructor(private readonly appService: OptimizationService) {}

    private readonly logger = new Logger(AppController.name);

    private last_result?: OptimizationResult<string>;
    private last_result_error?: any;
    private last_params?: OptimizationParameters<string>;

    @Post("optimize")
    public async optimize(@Body() params: OptimizationParameters<string>) {
        this.last_params = params;
        this.last_result_error = undefined;
        this.logger.log("POST");
        try {
            const deserializedParams = transformParameters(params, stringToDay);
            this.last_result = transformResult(
                await this.appService.optimize(deserializedParams),
                dayToString,
            );
        } catch (error) {
            this.last_result_error = error;
            throw error;
        }

        // this.last_result = transformResult<Dayjs, string>(await this.appService.optimize(parametersExample), dayToString);
        this.logger.log("POST done");
        return this.last_result;
    }

    @Get("optimize")
    public async get_result() {
        this.logger.log("GET");
        if (this.last_result_error) {
            throw this.last_result_error;
        }

        return this.last_result;
    }

    @Get("optimize/parameters")
    public async get_parameters() {
        this.logger.log("GET");
        return this.last_params;
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}

const dayToString = (day: Dayjs) => day.format();
const stringToDay = (str: string) => dayjs(str);

function transformParameters<T1, T2>(
    params: OptimizationParameters<T1>,
    transformTime: (time: T1) => T2,
): OptimizationParameters<T2> {
    return {
        ...params,
        time: transformTime(params.time),
        showers: params.showers?.map(
            (shower) =>
                ({
                    ...shower,
                    start: transformTime(shower.start),
                    end: transformTime(shower.end),
                }) as Shower<T2>,
        ),
        outdoor: params.outdoor.map((forecast) => ({
            ...forecast,
            time: transformTime(forecast.time),
        })),
    };
}

function transformResult<T1, T2>(
    result: OptimizationResult<T1>,
    transformTime: (time: T1) => T2,
): OptimizationResult<T2> {
    return {
        ...result,
        params: transformParameters(result.params, transformTime),
        plan: result.plan.map((plan) => ({
            ...plan,
            start: transformTime(plan.start),
            end: transformTime(plan.end),
        })),
    };
}
