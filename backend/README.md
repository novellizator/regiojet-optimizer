
## Usage of the command line tool
`npm run search praha ostr`

Searches all routes from ostrava to praha departing right away. Notice the full text search of the name of the city.

`npm run search prague ostr 1610224846431`

Searches all routes from prague to ostrava leaving at january the 9th 2021 (we're using unix timestamp).

### Example output

```
➜  ~/regio-optimizer/ ✗ npm run search praha ostr
> ts-node ./src/index.ts "praha" "ostr"

Searching for cheapest route from Prague to Ostrava
[
    {
        "currency": "CZK",
        "route": [
            {
                "station": "Prague - main train station",
                "date": "2021-01-09T21:50:00.000+01:00"
            },
            {
                "station": "Olomouc - hl.n.",
                "date": "2021-01-10T00:07:00.000+01:00"
            },
            {
                "station": "Ostrava - Svinov",
                "date": "2021-01-10T01:07:00.000+01:00"
            }
        ],
        "price": 208
    },
    {
        "currency": "CZK",
        "route": [
            {
                "station": "Prague - main train station",
                "date": "2021-01-09T21:50:00.000+01:00"
            },
            {
                "station": "Ostrava - Svinov",
                "date": "2021-01-10T01:07:00.000+01:00"
            }
        ],
        "price": 229
    },
    {
        "currency": "CZK",
        "route": [
            {
                "station": "Prague - main train station",
                "date": "2021-01-09T21:50:00.000+01:00"
            },
            {
                "station": "Hranice na M. - nádr.",
                "date": "2021-01-10T00:40:00.000+01:00"
            },
            {
                "station": "Ostrava - Svinov",
                "date": "2021-01-10T01:07:00.000+01:00"
            }
        ],
        "price": 234
    },
    {
        "currency": "CZK",
        "route": [
            {
                "station": "Prague - main train station",
                "date": "2021-01-09T21:50:00.000+01:00"
            },
            {
                "station": "Zábřeh na Moravě - nádr.",
                "date": "2021-01-09T23:42:00.000+01:00"
            },
            {
                "station": "Ostrava - Svinov",
                "date": "2021-01-10T01:07:00.000+01:00"
            }
        ],
        "price": 258
    },
    {
        "currency": "CZK",
        "route": [
            {
                "station": "Prague - main train station",
                "date": "2021-01-09T21:50:00.000+01:00"
            },
            {
                "station": "Pardubice - hl. nádraží",
                "date": "2021-01-09T22:45:00.000+01:00"
            },
            {
                "station": "Ostrava - Svinov",
                "date": "2021-01-10T01:07:00.000+01:00"
            }
        ],
        "price": 284
    }
]
```

As you can already see, the program found an optimization ;-)
