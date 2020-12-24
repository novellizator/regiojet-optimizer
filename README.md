# Regiojet Optimizer
Regiojet uses some dishonest pricing tricks so sometimes it's cheaper to buy 2 tickets with virtual transfer (within the same train) than a direct one. 
Or it's better to buy a ticket for a longer distance and get off sooner.
This app should automatize this.

## Usage
Run `npm install` first.

`npm run search praha ostr 2`

Searches all routes with 2 segments (1 transfer) from ostrava to praha. Notice the fulll text search in the name of the city.

`npm run search praha ostr 1`

Searches the direct line from prague to ostrava (1 segment = 0 transfers)

## Example output

```
➜  ~/workspace/regio-optimizer-backend/src  git:(master) ✗ npm run search praha ostr  

> regio-optimizer@1.0.0 search /Users/tnovella/workspace/regio-optimizer-backend
> ts-node ./src/index.ts "praha" "ostr"

Searching for cheapest route from Prague to Ostrava
[
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Olomouc - hl.n.(2020-12-25 10:5h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 244
  },
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 259
  },
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Hranice na M. - nádr.(2020-12-25 10:36h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 284
  },
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Pardubice - hl. nádraží(2020-12-25 8:44h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 328
  },
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Zábřeh na Moravě - nádr.(2020-12-25 9:41h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 358
  },
  {
    route: 'Prague - main train station(2020-12-25 7:50h)->Česká Třebová - nádr.(2020-12-25 9:19h)->Ostrava - Svinov(2020-12-25 11:2h)',
    priceCZK: 378
  }
]
```

As you can already see, the program found an optimization ;-)
