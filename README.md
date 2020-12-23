# Regiojet Optimizer
Regiojet uses some dishonest pricing tricks so sometimes it's cheaper to buy 2 tickets with virtual transfer (within the same train) than a direct one. 
Or it's better to buy a ticket for a longer distance and get off sooner.
This app should automatize this.

# Usage
Run `npm install` first.

`ts-node index.ts praha ostr 2`
Searches all routes with 2 segments (1 transfer) from ostrava to praha. Notice the fulll text search in the name of the city.

`ts-node index.ts praha ostr 1`
Searches the direct line from prague to ostrava (1 segment = 0 transfers)
