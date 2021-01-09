# Regiojet Optimizer
Regiojet uses some dishonest pricing tricks so sometimes it's cheaper to buy 2 tickets with a virtual transfer (within the same train) than a direct one.
Other times it's better to buy a ticket for a longer distance and get off sooner.
This app should automatize search for the cheapest ticket.

## Installation

In the root folder run:
`npm install`
`npm run install:children`

## Deployment
After you have installed the dependencies, you can use the program in three ways

### As a CLI script

Search for the cheapest route between two places via command line.

For example

`npm run search praha ostr`

More detailed documentation can be found in "backend/README.md".

### As a local web page
Launch it via

`npm run start:local`

And it opens the browser.

### Deploy via heroku

No setup needed.


## Limitations
Current version doesn't search for paths that require a transfer.

The frontend was phoned in so don't expect miracles.

## Contact

Tomas Novella (tomasnovella(at)Gmail(dot)com)
