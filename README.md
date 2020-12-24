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
➜  ~/workspace/regio-optimizer-backend/src: npm run search praha ostr 2

> regio-optimizer@1.0.0 search /Users/tnovella/workspace/regio-optimizer-backend
> ts-node ./src/index.ts "praha" "ostr" "2"

Searching for cheapest route from Prague to Ostrava
[
  'Prague - main train station(2020-12-24 5:20h)->Pardubice - hl. nádraží(2020-12-24 6:44h)->Ostrava - Svinov(2020-12-24 9:2h) CZK:188',
  'Prague - main train station(2020-12-24 5:50h)->Česká Třebová - nádr.(2020-12-24 7:19h)->Ostrava - Svinov(2020-12-24 9:2h) CZK:218',
  'Prague - main train station(2020-12-24 5:50h)->Zábřeh na Moravě - nádr.(2020-12-24 7:41h)->Ostrava - Svinov(2020-12-24 9:2h) CZK:178',
  'Prague - main train station(2020-12-24 5:50h)->Olomouc - hl.n.(2020-12-24 8:5h)->Ostrava - Svinov(2020-12-24 9:2h) CZK:158',
  'Prague - main train station(2020-12-24 5:50h)->Hranice na M. - nádr.(2020-12-24 8:36h)->Ostrava - Svinov(2020-12-24 9:2h) CZK:174'
]
```
