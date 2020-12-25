import { allRoutePathsForNumberOfSegments } from "./allSegmentsEvaluator"
import { mockLocationsProvider } from "./locationsProvider"
import { lowestPriceForRoutePath, stationNamesOnRoutePath } from "./routePath"
import { cityToLocationDefinition } from "./types/locations"
import { flattened } from "./utils"


export async function findCheapestRoutes(cityFromSearch: string, cityToSearch: string, date: Date) {
    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name}`)

    const fromLocationDefinition = cityToLocationDefinition(cityFrom)
    const toLocationDefinition = cityToLocationDefinition(cityTo)

    const allRoutePathsPromise = [1, 2].map(numberOfSegments => allRoutePathsForNumberOfSegments(
        fromLocationDefinition,
        toLocationDefinition,
        date,
        numberOfSegments
    ))


    const allRoutePaths = flattened((await Promise.all(allRoutePathsPromise)))
    const reportsForAllRoutePaths = allRoutePaths.map(routePath => {
        return {
            route: stationNamesOnRoutePath(routePath),
            priceCZK: lowestPriceForRoutePath(routePath)
        }
    }).sort((report1, report2) => report1.priceCZK - report2.priceCZK)

    return reportsForAllRoutePaths
}


