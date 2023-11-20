import {OptimizationService} from "./optimization.service";
import {Test, TestingModule} from "@nestjs/testing";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";
import {OptimizationParameters, PriceSpec} from "./optimizationParameters";
import {loadModule, Model} from "glpk-ts";
import {example_day, parametersExample} from "./parametersExample";

describe("OptimizationService", () => {
    let service: OptimizationService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OptimizationService],
        }).compile();
        service = module.get(OptimizationService);


    });

    describe("Given unreasonable heating demand", () => {
        const time = dayjs("2023-11-13T00:00:00+01:00");
        const parameters: OptimizationParameters<Dayjs> = {
            ...parametersExample,
            time,
            plan_hours: 2,
            split_hours_into: 4, // we have only 15 minutes to reach desired temp
            acc_spec: {
                ...parametersExample.acc_spec,
                liters: 500, // we need to heat 500 liters
                current_temp: 20 // we are currently at only 20 degrees
            },
            hot_water: {
                min_temp: 50, // we want 50 degrees within 15 minutes
                average_power: 0
            },
            pump_spec: {
                ...parametersExample.pump_spec,
                power: [{heating_power_watt: 10000, consumed_power_watt: 10000,}] // We have only 1000W heating power
            },
        }

        it("should try to reach the demand", async () => {
            const result = await service.optimize(parameters);

            console.log(`result ${JSON.stringify(result, null, 2)}`);

            expect(result.plan[0].pump.production).toEqual(10000);
        })


    })

    it("test calc", async () => {
        await loadModule();

        const model = new Model();
        const x = model.addVar({
            name: "x",
            type: "continuous",
            lb: 9.5,
            ub: 10.5,
            obj: 1
        });

        const y = model.addVar({
            name: "y",
            type: "binary",
        });

        model.addConstr({
            coeffs: [
                [x, 1],
                [y, 1]],
            lb: 10,
            ub: 10
        });


        // model.simplex()
        // model.vars.forEach(v => console.log(`${v.name}: ${v.value}`));
        // model.interior()
        // model.update()
        // const result1 = model.intopt({presolve: true, binarize: false});
        const result = model.intopt({presolve: true, binarize: false});
        console.log(`result: ${result}`);

        // console.log(`model.solution: ${model.solution}`);
        // console.log(`model.solutionInt: ${model.solutionInt}`);


        model.vars.forEach(v => console.log(`${v.name}: ${v.valueMIP}`));


    });

    it("should optimize!", async () => {
        const result = await service.optimize({
            ...parametersExample,
            time: example_day.add(0, "hours").add(12, "minutes")
        });

        console.log(`result.result ${result.result}`);
        console.log(`result.cost ${result.cost}`);

        expect(result).toBeDefined();
    })

    it("should properly map prices", async () => {
        const prices: PriceSpec = {
            today: new Array(24).fill(0).map((_, i) => i),
            tomorrow: new Array(24).fill(0).map((_, i) => i + 24)
        }

        const result = await service.optimize({
            ...parametersExample,
            time: example_day.add(1, "hours").add(12, "minutes"),
            split_hours_into: 3,
            plan_hours: 10,
            prices
        });

        const pricemapping = result.plan.slice(0, 9).map(p => ({start: p.start, price: p.price}));
        const expected: Pick<typeof result.plan[0], "start" | "price">[] = [
            {start: example_day.add(1, "hours").add(12, "minutes"), price: 1},
            {start: example_day.add(1, "hours").add(20, "minutes"), price: 1},
            {start: example_day.add(1, "hours").add(40, "minutes"), price: 1},

            {start: example_day.add(2, "hours").add(0, "minutes"), price: 2},
            {start: example_day.add(2, "hours").add(20, "minutes"), price: 2},
            {start: example_day.add(2, "hours").add(40, "minutes"), price: 2},

            {start: example_day.add(3, "hours").add(0, "minutes"), price: 3},
            {start: example_day.add(3, "hours").add(20, "minutes"), price: 3},
            {start: example_day.add(3, "hours").add(40, "minutes"), price: 3},
        ]

        expect(pricemapping).toEqual(expected);
    });

    it("should properly map outdoor temp", async () => {

        const result = await service.optimize({
            ...parametersExample,
            time: example_day.add(2, "hours").add(12, "minutes"),
            outdoor: [
                {time: example_day.add(0, "hours"), temp: 0},
                {time: example_day.add(1, "hours"), temp: 1},
                {time: example_day.add(2, "hours"), temp: 2},
                {time: example_day.add(3, "hours"), temp: 3},
                {time: example_day.add(4, "hours"), temp: 4},
            ],
            split_hours_into: 3,
            plan_hours: 3,
        });

        const pricemapping = result.plan.map(p => ({start: p.start, outdoor_temp: p.outdoor_temp}));
        const expected: Pick<typeof result.plan[0], "start" | "outdoor_temp">[] = [
            {start: example_day.add(2, "hours").add(12, "minutes"), outdoor_temp: 2},
            {start: example_day.add(2, "hours").add(20, "minutes"), outdoor_temp: 2},
            {start: example_day.add(2, "hours").add(40, "minutes"), outdoor_temp: 2},

            {start: example_day.add(3, "hours").add(0, "minutes"), outdoor_temp: 3},
            {start: example_day.add(3, "hours").add(20, "minutes"), outdoor_temp: 3},
            {start: example_day.add(3, "hours").add(40, "minutes"), outdoor_temp: 3},

            {start: example_day.add(4, "hours").add(0, "minutes"), outdoor_temp: 4},
            {start: example_day.add(4, "hours").add(20, "minutes"), outdoor_temp: 4},
            {start: example_day.add(4, "hours").add(40, "minutes"), outdoor_temp: 4},
        ]

        expect(pricemapping).toEqual(expected);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});


