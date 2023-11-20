# Heat Optimizer

## Overview

Heat Optimizer is a Node.js application developed using NestJS framework, designed to forecast heat consumption in the coming hours and optimize the runtime of a heat pump. It aims to efficiently charge an accumulator tank considering the upcoming electricity prices, thereby reducing operational costs.

## Features

- **Forecast-based Optimization:** Leverages forecasts to predict heat consumption and electricity prices.
- **Accumulator Tank Management:** Optimizes charging times for accumulator tanks.
- **Flexible Time Parameters:** Can be configured for different durations and split-hour intervals.
- **Energy Efficiency:** Aims to reduce the cost of heating by optimizing heat pump runtimes.

## Installation

To set up the project, you will need Node.js and npm installed on your system.

1. Clone the repository:
  
    ```git clone git@github.com:expicon/heat-optimizer.git```
    
2. Navigate to the project directory:

   ```cd heat-optimizer```
    
3. Install dependencies:

   ```npm install``` 
    

## Usage

1. Start the application:

   ```npm start```
    
2. The application will be running on `localhost:3000`.
    
3. To perform optimization, send a POST request to `/optimize` with the required parameters.
    

## API Endpoints

- **POST /optimize**: Accepts `OptimizationParameters` to perform the optimization process.
- **GET /optimize**: Retrieves the last optimization result.
- **GET /**: A simple endpoint to check if the service is running.

## Development

- **Technologies**: The application is built with TypeScript and uses the NestJS framework.
- **Testing**: Unit tests are included and can be run using the following command:
    
    bashCopy code
    
    `npm test` 
    

## Contributing

Contributions to the Heat Optimizer project are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).


## Example
### Request Body

```json
{
  "acc_spec": {
    "current_temp": "26.8",
    "liters": 501,
    "max_temp": 55,
    "min_temp": 20,
    "temp_loss_per_hour_degrees": 0.02189
  },
  "hot_water": {
    "average_power": 100,
    "min_temp": 20
  },
  "indoor": {
    "current_temp": 18.2,
    "passive_heating_degrees": 1.5,
    "target_temp": 18
  },
  "outdoor": [
    {
      "temp": 2,
      "time": "2023-11-20T21:20:00+01:00"
    },
    {
      "temp": 1.6,
      "time": "2023-11-20T21:00:00+01:00"
    },
    {
      "temp": 1.3,
      "time": "2023-11-20T22:00:00+01:00"
    },
    {
      "temp": 1.6,
      "time": "2023-11-20T23:00:00+01:00"
    },
    {
      "temp": 1.8,
      "time": "2023-11-21T00:00:00+01:00"
    },
    {
      "temp": 2,
      "time": "2023-11-21T01:00:00+01:00"
    },
    {
      "temp": 2.1,
      "time": "2023-11-21T02:00:00+01:00"
    },
    {
      "temp": 2.2,
      "time": "2023-11-21T03:00:00+01:00"
    },
    {
      "temp": 2.2,
      "time": "2023-11-21T04:00:00+01:00"
    },
    {
      "temp": 2.2,
      "time": "2023-11-21T05:00:00+01:00"
    },
    {
      "temp": 2,
      "time": "2023-11-21T06:00:00+01:00"
    },
    {
      "temp": 1.8,
      "time": "2023-11-21T07:00:00+01:00"
    },
    {
      "temp": 1.5,
      "time": "2023-11-21T08:00:00+01:00"
    },
    {
      "temp": 1.1,
      "time": "2023-11-21T09:00:00+01:00"
    },
    {
      "temp": 1.3,
      "time": "2023-11-21T10:00:00+01:00"
    },
    {
      "temp": 1.9,
      "time": "2023-11-21T11:00:00+01:00"
    },
    {
      "temp": 2.4,
      "time": "2023-11-21T12:00:00+01:00"
    },
    {
      "temp": 2.7,
      "time": "2023-11-21T13:00:00+01:00"
    },
    {
      "temp": 2.8,
      "time": "2023-11-21T14:00:00+01:00"
    },
    {
      "temp": 2.3,
      "time": "2023-11-21T15:00:00+01:00"
    },
    {
      "temp": 1.2,
      "time": "2023-11-21T16:00:00+01:00"
    },
    {
      "temp": 0.3,
      "time": "2023-11-21T17:00:00+01:00"
    },
    {
      "temp": -0.2,
      "time": "2023-11-21T18:00:00+01:00"
    },
    {
      "temp": -0.4,
      "time": "2023-11-21T19:00:00+01:00"
    },
    {
      "temp": -0.6,
      "time": "2023-11-21T20:00:00+01:00"
    }
  ],
  "plan_hours": 24,
  "prices": {
    "today": [
      1.85,
      1.746,
      1.706,
      1.708,
      1.776,
      2,
      2.302,
      2.682,
      2.662,
      2.544,
      2.454,
      2.366,
      2.323,
      2.48,
      2.571,
      2.692,
      2.852,
      2.953,
      2.852,
      2.666,
      2.515,
      2.331,
      2.347,
      2.203
    ],
    "tomorrow": [
      2.278,
      2.209,
      2.181,
      2.121,
      2.18,
      2.26,
      2.566,
      2.795,
      2.888,
      2.81,
      2.779,
      2.778,
      2.848,
      2.847,
      2.827,
      2.855,
      2.907,
      2.95,
      2.88,
      2.741,
      2.633,
      2.383,
      2.384,
      2.206
    ]
  },
  "pump_spec": {
    "max_temp": 55,
    "power": [
      {
        "below_degrees": 35,
        "consumed_power_watt": 1980,
        "heating_power_watt": 8200
      },
      {
        "below_degrees": 45,
        "consumed_power_watt": 2200,
        "heating_power_watt": 8000
      },
      {
        "below_degrees": 50,
        "consumed_power_watt": 3000,
        "heating_power_watt": 7900
      },
      {
        "consumed_power_watt": 3100,
        "heating_power_watt": 7800
      }
    ],
    "start_delay_minutes": 2
  },
  "radiator": {
    "c_flow": 0.45,
    "power_per_temp_delta": 300
  },
  "showers": [
    {
      "end": "2023-11-21T07:00:00+01:00",
      "energy": 1000,
      "start": "2023-11-21T06:00:00+01:00",
      "temp": 35
    }
  ],
  "split_hours_into": 3,
  "time": "2023-11-20T21:20:00+01:00"
}
```

### Response Body

```json
{
    "result": "optimal",
    "ok": true,
    "plan": [
        {
            "start": "2023-11-20T21:20:00+01:00",
            "end": "2023-11-20T21:40:00+01:00",
            "duration": 0.3332977777777778,
            "price": 2.331,
            "outdoor_temp": 1.6,
            "rad_flow_temp": 24.505,
            "acc_temp": 26.8,
            "consumption": {
                "radiator": 1951.4999999999998,
                "shower": 0,
                "hot_water": 100,
                "loss": 109.40569464000001,
                "total": 2160.90569464
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-20T21:40:00+01:00",
            "end": "2023-11-20T22:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.331,
            "outdoor_temp": 1.6,
            "rad_flow_temp": 24.505,
            "acc_temp": 25.56071122236414,
            "consumption": {
                "radiator": 1951.4999999999993,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 93.63996794502236,
                "total": 2145.1399679450215
            },
            "pump": {
                "on_fraction": 0.06584126414360891,
                "consumption": 130.36570300434565,
                "cost": 0.10129415123437656,
                "production": 539.8983659775931,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-20T22:00:00+01:00",
            "end": "2023-11-20T22:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.347,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.26511305549463443,
                "consumption": 524.9238498793761,
                "cost": 0.41066542522229854,
                "production": 2173.9270550560022,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-20T22:20:00+01:00",
            "end": "2023-11-20T22:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.347,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.26511305549463443,
                "consumption": 524.9238498793761,
                "cost": 0.41066542522229854,
                "production": 2173.9270550560022,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-20T22:40:00+01:00",
            "end": "2023-11-20T23:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.347,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.23640942134829265,
                "consumption": 468.09065426961945,
                "cost": 0.3662029218569322,
                "production": 1938.5572550559998,
                "target_temp": 24.505
            }
        },
        {
            "start": "2023-11-20T23:00:00+01:00",
            "end": "2023-11-20T23:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.203,
            "outdoor_temp": 1.6,
            "rad_flow_temp": 24.505,
            "acc_temp": 24.505,
            "consumption": {
                "radiator": 1951.4999999999993,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 80.20964008199999,
                "total": 2131.709640081999
            },
            "pump": {
                "on_fraction": 0.25996459025390267,
                "consumption": 514.7298887027273,
                "cost": 0.37798331493736936,
                "production": 2131.709640082002,
                "target_temp": 24.505
            }
        },
        {
            "start": "2023-11-20T23:20:00+01:00",
            "end": "2023-11-20T23:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.203,
            "outdoor_temp": 1.6,
            "rad_flow_temp": 24.505,
            "acc_temp": 24.505,
            "consumption": {
                "radiator": 1951.4999999999993,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 80.20964008199999,
                "total": 2131.709640081999
            },
            "pump": {
                "on_fraction": 0.2622149336152508,
                "consumption": 519.1855685581966,
                "cost": 0.38125526917790226,
                "production": 2150.1624556450565,
                "target_temp": 24.51558389861831
            }
        },
        {
            "start": "2023-11-20T23:40:00+01:00",
            "end": "2023-11-21T00:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.203,
            "outdoor_temp": 1.6,
            "rad_flow_temp": 24.505,
            "acc_temp": 24.51558389861831,
            "consumption": {
                "radiator": 1951.4999999999993,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 80.34428412622508,
                "total": 2131.844284126224
            },
            "pump": {
                "on_fraction": 1,
                "consumption": 1980,
                "cost": 1.4539799999999998,
                "production": 8200,
                "target_temp": 27.996068742650806
            }
        },
        {
            "start": "2023-11-21T00:00:00+01:00",
            "end": "2023-11-21T00:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.278,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 27.996068742650806,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 124.62159366638404,
                "total": 2149.121593666384
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T00:20:00+01:00",
            "end": "2023-11-21T00:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.278,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 26.763406714026225,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 108.94016977126496,
                "total": 2133.4401697712647
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T00:40:00+01:00",
            "end": "2023-11-21T01:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.278,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 25.539739009337172,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 93.3731679991671,
                "total": 2117.873167999167
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T01:00:00+01:00",
            "end": "2023-11-21T01:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.209,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 24.325000000000003,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.91975345000003,
                "total": 2075.419753450001
            },
            "pump": {
                "on_fraction": 0.253099969932927,
                "consumption": 501.13794046719545,
                "cost": 0.36900457016401156,
                "production": 2075.4197534500013,
                "target_temp": 24.325000000000003
            }
        },
        {
            "start": "2023-11-21T01:20:00+01:00",
            "end": "2023-11-21T01:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.209,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 24.325000000000003,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.91975345000003,
                "total": 2075.419753450001
            },
            "pump": {
                "on_fraction": 0.253099969932927,
                "consumption": 501.13794046719545,
                "cost": 0.36900457016401156,
                "production": 2075.4197534500013,
                "target_temp": 24.325000000000003
            }
        },
        {
            "start": "2023-11-21T01:40:00+01:00",
            "end": "2023-11-21T02:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.209,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 24.325000000000003,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.91975345000003,
                "total": 2075.419753450001
            },
            "pump": {
                "on_fraction": 0.24353209188414612,
                "consumption": 482.19354193060934,
                "cost": 0.35505517804157205,
                "production": 1996.9631534499981,
                "target_temp": 24.28
            }
        },
        {
            "start": "2023-11-21T02:00:00+01:00",
            "end": "2023-11-21T02:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.181,
            "outdoor_temp": 2.1,
            "rad_flow_temp": 24.28,
            "acc_temp": 24.28,
            "consumption": {
                "radiator": 1884.0000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.34728179200002,
                "total": 2061.3472817920006
            },
            "pump": {
                "on_fraction": 0.2513838148526831,
                "consumption": 497.7399534083125,
                "cost": 0.3618569461278432,
                "production": 2061.347281792001,
                "target_temp": 24.28
            }
        },
        {
            "start": "2023-11-21T02:20:00+01:00",
            "end": "2023-11-21T02:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.181,
            "outdoor_temp": 2.1,
            "rad_flow_temp": 24.28,
            "acc_temp": 24.28,
            "consumption": {
                "radiator": 1884.0000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.34728179200002,
                "total": 2061.3472817920006
            },
            "pump": {
                "on_fraction": 0.2513838148526831,
                "consumption": 497.7399534083125,
                "cost": 0.3618569461278432,
                "production": 2061.347281792001,
                "target_temp": 24.28
            }
        },
        {
            "start": "2023-11-21T02:40:00+01:00",
            "end": "2023-11-21T03:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.181,
            "outdoor_temp": 2.1,
            "rad_flow_temp": 24.28,
            "acc_temp": 24.28,
            "consumption": {
                "radiator": 1884.0000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 77.34728179200002,
                "total": 2061.3472817920006
            },
            "pump": {
                "on_fraction": 0.2418159368039022,
                "consumption": 478.7955548717264,
                "cost": 0.34808436839174506,
                "production": 1982.890681791998,
                "target_temp": 24.235
            }
        },
        {
            "start": "2023-11-21T03:00:00+01:00",
            "end": "2023-11-21T03:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.121,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 24.235,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 76.77481013399999,
                "total": 2047.2748101339998
            },
            "pump": {
                "on_fraction": 0.24966765977243913,
                "consumption": 494.34196634942947,
                "cost": 0.34949977020904666,
                "production": 2047.2748101340007,
                "target_temp": 24.235
            }
        },
        {
            "start": "2023-11-21T03:20:00+01:00",
            "end": "2023-11-21T03:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.121,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 24.235,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 76.77481013399999,
                "total": 2047.2748101339998
            },
            "pump": {
                "on_fraction": 1,
                "consumption": 1980,
                "cost": 1.3998599999999999,
                "production": 8200,
                "target_temp": 31.26723208464103
            }
        },
        {
            "start": "2023-11-21T03:40:00+01:00",
            "end": "2023-11-21T04:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.121,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 27.763990977737627,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 121.66919493605558,
                "total": 2092.169194936055
            },
            "pump": {
                "on_fraction": 1,
                "consumption": 1980,
                "cost": 1.3998599999999999,
                "production": 8200,
                "target_temp": 31.26723208464103
            }
        },
        {
            "start": "2023-11-21T04:00:00+01:00",
            "end": "2023-11-21T04:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.18,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 31.26723208464103,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 166.2360003770055,
                "total": 2136.7360003770054
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T04:20:00+01:00",
            "end": "2023-11-21T04:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.18,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 30.04167400518098,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 150.64495002758792,
                "total": 2121.1449500275876
            },
            "pump": {
                "on_fraction": 0.5738892858775245,
                "consumption": 1136.3007860374985,
                "cost": 0.8257119045205823,
                "production": 4705.892144195701,
                "target_temp": 31.52419585468204
            }
        },
        {
            "start": "2023-11-21T04:40:00+01:00",
            "end": "2023-11-21T05:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.18,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 31.52419585468204,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 169.50498872103458,
                "total": 2140.0049887210344
            },
            "pump": {
                "on_fraction": 1,
                "consumption": 1980,
                "cost": 1.4388,
                "production": 8200,
                "target_temp": 35.00000000000001
            }
        },
        {
            "start": "2023-11-21T05:00:00+01:00",
            "end": "2023-11-21T05:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.26,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 35.00000000000001,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 213.7227523200001,
                "total": 2184.22275232
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T05:20:00+01:00",
            "end": "2023-11-21T05:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.26,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 33.74720515731755,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 197.78520697057178,
                "total": 2168.2852069705714
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T05:40:00+01:00",
            "end": "2023-11-21T06:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.26,
            "outdoor_temp": 2.2,
            "rad_flow_temp": 24.235,
            "acc_temp": 32.50355154100387,
            "consumption": {
                "radiator": 1870.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 181.96395257704316,
                "total": 2152.463952577043
            },
            "pump": {
                "on_fraction": 0.793289257544832,
                "consumption": 1570.7127299387673,
                "cost": 1.183270256553871,
                "production": 6504.971911867623,
                "target_temp": 35.00000000000001
            }
        },
        {
            "start": "2023-11-21T06:00:00+01:00",
            "end": "2023-11-21T06:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.566,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 35.00000000000001,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 999.9999999999998,
                "hot_water": 99.99999999999999,
                "loss": 213.7227523200001,
                "total": 3211.2227523200004
            },
            "pump": {
                "on_fraction": 0.39161253077073044,
                "consumption": 775.3928109260463,
                "cost": 0.6632193176120783,
                "production": 3211.2227523199895,
                "target_temp": 35
            }
        },
        {
            "start": "2023-11-21T06:20:00+01:00",
            "end": "2023-11-21T06:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.566,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 35,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 999.9999999999998,
                "hot_water": 99.99999999999999,
                "loss": 213.72275232,
                "total": 3211.2227523200004
            },
            "pump": {
                "on_fraction": 0.39161253077073194,
                "consumption": 775.3928109260493,
                "cost": 0.6632193176120806,
                "production": 3211.2227523200017,
                "target_temp": 35
            }
        },
        {
            "start": "2023-11-21T06:40:00+01:00",
            "end": "2023-11-21T07:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.566,
            "outdoor_temp": 2,
            "rad_flow_temp": 24.325000000000003,
            "acc_temp": 35,
            "consumption": {
                "radiator": 1897.5000000000007,
                "shower": 999.9999999999998,
                "hot_water": 99.99999999999999,
                "loss": 213.72275232,
                "total": 3211.2227523200004
            },
            "pump": {
                "on_fraction": 0.3916125307707317,
                "consumption": 775.3928109260488,
                "cost": 0.6632193176120803,
                "production": 3211.22275232,
                "target_temp": 35
            }
        },
        {
            "start": "2023-11-21T07:00:00+01:00",
            "end": "2023-11-21T07:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.795,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 35,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 213.72275232,
                "total": 2238.22275232
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T07:20:00+01:00",
            "end": "2023-11-21T07:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.795,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 33.71623261963429,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 197.3911869705717,
                "total": 2221.8911869705717
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T07:40:00+01:00",
            "end": "2023-11-21T08:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.795,
            "outdoor_temp": 1.8,
            "rad_flow_temp": 24.415,
            "acc_temp": 32.441832461920654,
            "consumption": {
                "radiator": 1924.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 181.17878760964308,
                "total": 2205.6787876096428
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T08:00:00+01:00",
            "end": "2023-11-21T08:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.888,
            "outdoor_temp": 1.5,
            "rad_flow_temp": 24.55,
            "acc_temp": 31.1767311773578,
            "consumption": {
                "radiator": 1965,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 165.08468472271804,
                "total": 2230.084684722718
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T08:20:00+01:00",
            "end": "2023-11-21T08:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.888,
            "outdoor_temp": 1.5,
            "rad_flow_temp": 24.55,
            "acc_temp": 29.897631511905534,
            "consumption": {
                "radiator": 1965,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 148.81250013985792,
                "total": 2213.812500139858
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T08:40:00+01:00",
            "end": "2023-11-21T09:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.888,
            "outdoor_temp": 1.5,
            "rad_flow_temp": 24.55,
            "acc_temp": 28.627865010345516,
            "consumption": {
                "radiator": 1965,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 132.6590482638374,
                "total": 2197.6590482638376
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T09:00:00+01:00",
            "end": "2023-11-21T09:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.81,
            "outdoor_temp": 1.1,
            "rad_flow_temp": 24.73,
            "acc_temp": 27.36736357169188,
            "consumption": {
                "radiator": 2019,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 116.62346274167226,
                "total": 2235.6234627416725
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T09:20:00+01:00",
            "end": "2023-11-21T09:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.81,
            "outdoor_temp": 1.1,
            "rad_flow_temp": 24.73,
            "acc_temp": 26.0850870541857,
            "consumption": {
                "radiator": 2019,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 100.31086354186719,
                "total": 2219.310863541867
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T09:40:00+01:00",
            "end": "2023-11-21T10:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.81,
            "outdoor_temp": 1.1,
            "rad_flow_temp": 24.73,
            "acc_temp": 24.812166881002256,
            "consumption": {
                "radiator": 2019,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 84.11729194089,
                "total": 2203.11729194089
            },
            "pump": {
                "on_fraction": 0.23206680222574164,
                "consumption": 459.49226840696844,
                "cost": 0.4303910914078604,
                "production": 1902.9477782510814,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-21T10:00:00+01:00",
            "end": "2023-11-21T10:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.779,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.26511305549463443,
                "consumption": 524.9238498793761,
                "cost": 0.4862544596049287,
                "production": 2173.9270550560022,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-21T10:20:00+01:00",
            "end": "2023-11-21T10:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.779,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.26511305549463443,
                "consumption": 524.9238498793761,
                "cost": 0.4862544596049287,
                "production": 2173.9270550560022,
                "target_temp": 24.64
            }
        },
        {
            "start": "2023-11-21T10:40:00+01:00",
            "end": "2023-11-21T11:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.779,
            "outdoor_temp": 1.3,
            "rad_flow_temp": 24.64,
            "acc_temp": 24.64,
            "consumption": {
                "radiator": 1992,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 81.92705505600001,
                "total": 2173.927055056
            },
            "pump": {
                "on_fraction": 0.20770578720195162,
                "consumption": 411.2574586598642,
                "cost": 0.38096149253858747,
                "production": 1703.1874550560033,
                "target_temp": 24.37
            }
        },
        {
            "start": "2023-11-21T11:00:00+01:00",
            "end": "2023-11-21T11:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.778,
            "outdoor_temp": 1.9,
            "rad_flow_temp": 24.37,
            "acc_temp": 24.37,
            "consumption": {
                "radiator": 1911,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 78.49222510800001,
                "total": 2089.492225108
            },
            "pump": {
                "on_fraction": 0.2548161250131709,
                "consumption": 504.5359275260784,
                "cost": 0.4672002688891486,
                "production": 2089.4922251080015,
                "target_temp": 24.37
            }
        },
        {
            "start": "2023-11-21T11:20:00+01:00",
            "end": "2023-11-21T11:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.778,
            "outdoor_temp": 1.9,
            "rad_flow_temp": 24.37,
            "acc_temp": 24.37,
            "consumption": {
                "radiator": 1911,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 78.49222510800001,
                "total": 2089.492225108
            },
            "pump": {
                "on_fraction": 0.2548161250131709,
                "consumption": 504.5359275260784,
                "cost": 0.4672002688891486,
                "production": 2089.4922251080015,
                "target_temp": 24.37
            }
        },
        {
            "start": "2023-11-21T11:40:00+01:00",
            "end": "2023-11-21T12:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.778,
            "outdoor_temp": 1.9,
            "rad_flow_temp": 24.37,
            "acc_temp": 24.37,
            "consumption": {
                "radiator": 1911,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 78.49222510800001,
                "total": 2089.492225108
            },
            "pump": {
                "on_fraction": 0.9272542771417327,
                "consumption": 1835.9634687406308,
                "cost": 1.7001021720538243,
                "production": 7603.485072562208,
                "target_temp": 27.53263613431425
            }
        },
        {
            "start": "2023-11-21T12:00:00+01:00",
            "end": "2023-11-21T12:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.848,
            "outdoor_temp": 2.4,
            "rad_flow_temp": 24.145,
            "acc_temp": 27.53263613431425,
            "consumption": {
                "radiator": 1843.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 118.72599291825753,
                "total": 2062.2259929182574
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T12:20:00+01:00",
            "end": "2023-11-21T12:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.848,
            "outdoor_temp": 2.4,
            "rad_flow_temp": 24.145,
            "acc_temp": 26.349814425480044,
            "consumption": {
                "radiator": 1843.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 103.67861725659732,
                "total": 2047.1786172565971
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T12:40:00+01:00",
            "end": "2023-11-21T13:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.848,
            "outdoor_temp": 2.4,
            "rad_flow_temp": 24.145,
            "acc_temp": 25.175623372381303,
            "consumption": {
                "radiator": 1843.4999999999998,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 88.74103727934833,
                "total": 2032.2410372793481
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T13:00:00+01:00",
            "end": "2023-11-21T13:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.847,
            "outdoor_temp": 2.7,
            "rad_flow_temp": 24.01,
            "acc_temp": 24.01,
            "consumption": {
                "radiator": 1803.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.91245184400002,
                "total": 1976.9124518440005
            },
            "pump": {
                "on_fraction": 0.24108688437121953,
                "consumption": 477.35203105501466,
                "cost": 0.45300707747120883,
                "production": 1976.912451844,
                "target_temp": 24.01
            }
        },
        {
            "start": "2023-11-21T13:20:00+01:00",
            "end": "2023-11-21T13:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.847,
            "outdoor_temp": 2.7,
            "rad_flow_temp": 24.01,
            "acc_temp": 24.01,
            "consumption": {
                "radiator": 1803.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.91245184400002,
                "total": 1976.9124518440005
            },
            "pump": {
                "on_fraction": 0.24108688437121953,
                "consumption": 477.35203105501466,
                "cost": 0.45300707747120883,
                "production": 1976.912451844,
                "target_temp": 24.01
            }
        },
        {
            "start": "2023-11-21T13:40:00+01:00",
            "end": "2023-11-21T14:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.847,
            "outdoor_temp": 2.7,
            "rad_flow_temp": 24.01,
            "acc_temp": 24.01,
            "consumption": {
                "radiator": 1803.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.91245184400002,
                "total": 1976.9124518440005
            },
            "pump": {
                "on_fraction": 0.2315190063224387,
                "consumption": 458.4076325184286,
                "cost": 0.4350288432599887,
                "production": 1898.4558518439972,
                "target_temp": 23.965
            }
        },
        {
            "start": "2023-11-21T14:00:00+01:00",
            "end": "2023-11-21T14:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.827,
            "outdoor_temp": 2.8,
            "rad_flow_temp": 23.965,
            "acc_temp": 23.965,
            "consumption": {
                "radiator": 1789.5,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.33998018599999,
                "total": 1962.839980186
            },
            "pump": {
                "on_fraction": 0.23937072929097558,
                "consumption": 473.95404399613165,
                "cost": 0.446622694125688,
                "production": 1962.8399801859998,
                "target_temp": 23.965
            }
        },
        {
            "start": "2023-11-21T14:20:00+01:00",
            "end": "2023-11-21T14:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.827,
            "outdoor_temp": 2.8,
            "rad_flow_temp": 23.965,
            "acc_temp": 23.965,
            "consumption": {
                "radiator": 1789.5,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.33998018599999,
                "total": 1962.839980186
            },
            "pump": {
                "on_fraction": 0.23937072929097558,
                "consumption": 473.95404399613165,
                "cost": 0.446622694125688,
                "production": 1962.8399801859998,
                "target_temp": 23.965
            }
        },
        {
            "start": "2023-11-21T14:40:00+01:00",
            "end": "2023-11-21T15:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.827,
            "outdoor_temp": 2.8,
            "rad_flow_temp": 23.965,
            "acc_temp": 23.965,
            "consumption": {
                "radiator": 1789.5,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 73.33998018599999,
                "total": 1962.839980186
            },
            "pump": {
                "on_fraction": 0.5369841420110749,
                "consumption": 1063.2286011819283,
                "cost": 1.0019157518471036,
                "production": 4403.269964490814,
                "target_temp": 25.36474647504119
            }
        },
        {
            "start": "2023-11-21T15:00:00+01:00",
            "end": "2023-11-21T15:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.855,
            "outdoor_temp": 2.3,
            "rad_flow_temp": 24.19,
            "acc_temp": 25.36474647504119,
            "consumption": {
                "radiator": 1857.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 91.14698430481079,
                "total": 2048.146984304811
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T15:20:00+01:00",
            "end": "2023-11-21T15:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.855,
            "outdoor_temp": 2.3,
            "rad_flow_temp": 24.19,
            "acc_temp": 24.19,
            "consumption": {
                "radiator": 1857.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 76.20233847600002,
                "total": 2033.2023384760005
            },
            "pump": {
                "on_fraction": 0.2479515046921952,
                "consumption": 490.9439792905465,
                "cost": 0.4672150202915034,
                "production": 2033.2023384760007,
                "target_temp": 24.19
            }
        },
        {
            "start": "2023-11-21T15:40:00+01:00",
            "end": "2023-11-21T16:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.855,
            "outdoor_temp": 2.3,
            "rad_flow_temp": 24.19,
            "acc_temp": 24.19,
            "consumption": {
                "radiator": 1857.0000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 76.20233847600002,
                "total": 2033.2023384760005
            },
            "pump": {
                "on_fraction": 0.8927548240536541,
                "consumption": 1767.6545516262352,
                "cost": 1.6822179149643002,
                "production": 7320.589557239964,
                "target_temp": 27.22266296072451
            }
        },
        {
            "start": "2023-11-21T16:00:00+01:00",
            "end": "2023-11-21T16:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.907,
            "outdoor_temp": 1.2,
            "rad_flow_temp": 24.685000000000002,
            "acc_temp": 27.22266296072451,
            "consumption": {
                "radiator": 2005.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 114.78264054891442,
                "total": 2220.282640548915
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T16:20:00+01:00",
            "end": "2023-11-21T16:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.907,
            "outdoor_temp": 1.2,
            "rad_flow_temp": 24.685000000000002,
            "acc_temp": 25.949185409763835,
            "consumption": {
                "radiator": 2005.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 98.58197821504247,
                "total": 2204.081978215043
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T16:40:00+01:00",
            "end": "2023-11-21T17:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.907,
            "outdoor_temp": 1.2,
            "rad_flow_temp": 24.685000000000002,
            "acc_temp": 24.685000000000002,
            "consumption": {
                "radiator": 2005.5000000000007,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 82.49952671400004,
                "total": 2187.9995267140007
            },
            "pump": {
                "on_fraction": 0.9237289845964785,
                "consumption": 1828.9833895010274,
                "cost": 1.7722849044264957,
                "production": 7574.577673691123,
                "target_temp": 27.774555456315603
            }
        },
        {
            "start": "2023-11-21T17:00:00+01:00",
            "end": "2023-11-21T17:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.95,
            "outdoor_temp": 0.3,
            "rad_flow_temp": 25.09,
            "acc_temp": 27.774555456315603,
            "consumption": {
                "radiator": 2127,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 121.80359192644309,
                "total": 2348.803591926443
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T17:20:00+01:00",
            "end": "2023-11-21T17:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.95,
            "outdoor_temp": 0.3,
            "rad_flow_temp": 25.09,
            "acc_temp": 26.427362719991446,
            "consumption": {
                "radiator": 2127,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 104.66515505068647,
                "total": 2331.6651550506863
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        },
        {
            "start": "2023-11-21T17:40:00+01:00",
            "end": "2023-11-21T18:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.95,
            "outdoor_temp": 0.3,
            "rad_flow_temp": 25.09,
            "acc_temp": 25.09,
            "consumption": {
                "radiator": 2127,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 87.651771636,
                "total": 2314.651771636
            },
            "pump": {
                "on_fraction": 0.3301139965409757,
                "consumption": 653.6257131511319,
                "cost": 0.6427319512652797,
                "production": 2706.9347716360007,
                "target_temp": 25.315
            }
        },
        {
            "start": "2023-11-21T18:00:00+01:00",
            "end": "2023-11-21T18:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.88,
            "outdoor_temp": -0.2,
            "rad_flow_temp": 25.315,
            "acc_temp": 25.315,
            "consumption": {
                "radiator": 2194.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 90.51412992600001,
                "total": 2385.0141299260004
            },
            "pump": {
                "on_fraction": 0.29085538169829256,
                "consumption": 575.8936557626192,
                "cost": 0.5528579095321144,
                "production": 2385.014129925999,
                "target_temp": 25.315
            }
        },
        {
            "start": "2023-11-21T18:20:00+01:00",
            "end": "2023-11-21T18:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.88,
            "outdoor_temp": -0.2,
            "rad_flow_temp": 25.315,
            "acc_temp": 25.315,
            "consumption": {
                "radiator": 2194.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 90.51412992600001,
                "total": 2385.0141299260004
            },
            "pump": {
                "on_fraction": 0.29085538169829256,
                "consumption": 575.8936557626192,
                "cost": 0.5528579095321144,
                "production": 2385.014129925999,
                "target_temp": 25.315
            }
        },
        {
            "start": "2023-11-21T18:40:00+01:00",
            "end": "2023-11-21T19:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.88,
            "outdoor_temp": -0.2,
            "rad_flow_temp": 25.315,
            "acc_temp": 25.315,
            "consumption": {
                "radiator": 2194.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 90.51412992600001,
                "total": 2385.0141299260004
            },
            "pump": {
                "on_fraction": 0.30999113779585347,
                "consumption": 613.7824528357899,
                "cost": 0.5892311547223582,
                "production": 2541.9273299259985,
                "target_temp": 25.405
            }
        },
        {
            "start": "2023-11-21T19:00:00+01:00",
            "end": "2023-11-21T19:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.741,
            "outdoor_temp": -0.4,
            "rad_flow_temp": 25.405,
            "acc_temp": 25.405,
            "consumption": {
                "radiator": 2221.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 91.65907324200002,
                "total": 2413.1590732420004
            },
            "pump": {
                "on_fraction": 0.2942876918587804,
                "consumption": 582.6896298803852,
                "cost": 0.5323840918340452,
                "production": 2413.159073241999,
                "target_temp": 25.405
            }
        },
        {
            "start": "2023-11-21T19:20:00+01:00",
            "end": "2023-11-21T19:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.741,
            "outdoor_temp": -0.4,
            "rad_flow_temp": 25.405,
            "acc_temp": 25.405,
            "consumption": {
                "radiator": 2221.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 91.65907324200002,
                "total": 2413.1590732420004
            },
            "pump": {
                "on_fraction": 0.2942876918587804,
                "consumption": 582.6896298803852,
                "cost": 0.5323840918340452,
                "production": 2413.159073241999,
                "target_temp": 25.405
            }
        },
        {
            "start": "2023-11-21T19:40:00+01:00",
            "end": "2023-11-21T20:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.741,
            "outdoor_temp": -0.4,
            "rad_flow_temp": 25.405,
            "acc_temp": 25.405,
            "consumption": {
                "radiator": 2221.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 91.65907324200002,
                "total": 2413.1590732420004
            },
            "pump": {
                "on_fraction": 0.31342344795634136,
                "consumption": 620.5784269535559,
                "cost": 0.567001822759899,
                "production": 2570.072273241999,
                "target_temp": 25.495
            }
        },
        {
            "start": "2023-11-21T20:00:00+01:00",
            "end": "2023-11-21T20:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.633,
            "outdoor_temp": -0.6,
            "rad_flow_temp": 25.495,
            "acc_temp": 25.495,
            "consumption": {
                "radiator": 2248.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 92.80401655800001,
                "total": 2441.3040165580005
            },
            "pump": {
                "on_fraction": 0.29772000201926824,
                "consumption": 589.4856039981511,
                "cost": 0.517371865109044,
                "production": 2441.3040165579996,
                "target_temp": 25.495
            }
        },
        {
            "start": "2023-11-21T20:20:00+01:00",
            "end": "2023-11-21T20:40:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.633,
            "outdoor_temp": -0.6,
            "rad_flow_temp": 25.495,
            "acc_temp": 25.495,
            "consumption": {
                "radiator": 2248.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 92.80401655800001,
                "total": 2441.3040165580005
            },
            "pump": {
                "on_fraction": 0.29772000201926824,
                "consumption": 589.4856039981511,
                "cost": 0.517371865109044,
                "production": 2441.3040165579996,
                "target_temp": 25.495
            }
        },
        {
            "start": "2023-11-21T20:40:00+01:00",
            "end": "2023-11-21T21:00:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.633,
            "outdoor_temp": -0.6,
            "rad_flow_temp": 25.495,
            "acc_temp": 25.495,
            "consumption": {
                "radiator": 2248.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 92.80401655800001,
                "total": 2441.3040165580005
            },
            "pump": {
                "on_fraction": 0.29772000201926824,
                "consumption": 589.4856039981511,
                "cost": 0.517371865109044,
                "production": 2441.3040165579996,
                "target_temp": 25.495
            }
        },
        {
            "start": "2023-11-21T21:00:00+01:00",
            "end": "2023-11-21T21:20:00+01:00",
            "duration": 0.3333333333333333,
            "price": 2.383,
            "outdoor_temp": -0.6,
            "rad_flow_temp": 25.495,
            "acc_temp": 25.495,
            "consumption": {
                "radiator": 2248.5000000000005,
                "shower": 0,
                "hot_water": 99.99999999999999,
                "loss": 92.80401655800001,
                "total": 2441.3040165580005
            },
            "pump": {
                "on_fraction": 0,
                "consumption": 0,
                "cost": 0,
                "production": 0,
                "target_temp": 20
            }
        }
    ],
    "cost": 31.349259688566633    
}
```
