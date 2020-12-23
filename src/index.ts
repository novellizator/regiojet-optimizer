import { allRoutePathsForSegmentations } from "./cheapestRouteFinder"
import { mockLocationsProvider } from "./locationsProvider"
import { lowestPriceForRoutePath, stationNamesOnRoutePath } from "./routePath"
import { cityToLocationDefinition } from "./types/locations"


async function main() {
    const [cityFromSearch, cityToSearch, segments] = process.argv.slice(2)
    const numberOfSegments = Math.max(1, Number(segments == undefined ? 0 : segments))
    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name}`)
    const allRoutePaths = await allRoutePathsForSegmentations(cityToLocationDefinition(cityFrom),cityToLocationDefinition(cityTo), new Date(), numberOfSegments)
    const statementsForAllRoutePaths = allRoutePaths.map(routePath => {
        return `${stationNamesOnRoutePath(routePath).join('->')} CZK:${lowestPriceForRoutePath(routePath)}`
    })
    console.log(statementsForAllRoutePaths)
}

main()


