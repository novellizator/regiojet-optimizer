import { allRoutePathsForNumberOfSegments } from "./allSegmentsEvaluator"
import { mockLocationsProvider } from "./locationsProvider"
import { lowestPriceForRoutePath, routeDescriptionForRoutePath } from "./routePath"
import { SearchOutput } from "./types/api"
import { cityToLocationDefinition } from "./types/locations"
import { flattened } from "./utils"


export async function findAllVirtualRoutes(cityFromSearch: string, cityToSearch: string, date: Date): Promise<SearchOutput> {
    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name} at ${date.toISOString()}`)

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
            currency: "CZK",
            route: routeDescriptionForRoutePath(routePath),
            price: lowestPriceForRoutePath(routePath)
        }
    }).sort((report1, report2) => report1.price - report2.price)

    return {
        cityFrom: cityFrom.name,
        cityTo: cityTo.name,
        routeItems: reportsForAllRoutePaths
    }
}
