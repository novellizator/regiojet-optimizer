import { allRoutePathsForSegmentations } from "./cheapestRouteFinder"
import { mockLocationsProvider } from "./locationsProvider"
import { lowestPriceForRoutePath, stationNamesOnRoutePath } from "./routePath"
import { cityToLocationDefinition } from "./types/locations"


async function main() {
    const cityFromSearch = "Prag"
    const cityToSearch = "kosice"

    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name}`)
    const allRoutePaths = await allRoutePathsForSegmentations(cityToLocationDefinition(cityFrom),cityToLocationDefinition(cityTo), new Date(), 2)
    const statementsForAllRoutePaths = allRoutePaths.map(routePath => {
        return `route: ${stationNamesOnRoutePath(routePath).join('->')} price:${lowestPriceForRoutePath(routePath)}`
    })
    console.log(statementsForAllRoutePaths)
}

main()


