import { allRoutePathsForNumberOfSegments } from "./cheapestRouteFinder"
import { mockLocationsProvider } from "./locationsProvider"
import { lowestPriceForRoutePath, stationNamesOnRoutePath } from "./routePath"
import { cityToLocationDefinition } from "./types/locations"
import { promiseAllResolved } from "./utils"


async function main() {
    const [cityFromSearch, cityToSearch] = process.argv.slice(2)

    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }
    const date = new Date()

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name}`)

    const allRoutePathsPromise = [1, 2].map(numberOfSegments => allRoutePathsForNumberOfSegments(
        cityToLocationDefinition(cityFrom),
        cityToLocationDefinition(cityTo),
        date,
        numberOfSegments
    ))

    const allRoutePaths = (await promiseAllResolved(allRoutePathsPromise)).flat()
    const reportsForAllRoutePaths = allRoutePaths.map(routePath => {
        return {
            route: stationNamesOnRoutePath(routePath),
            priceCZK: lowestPriceForRoutePath(routePath)
        }
    }).sort((report1, report2) => report1.priceCZK - report2.priceCZK)
    console.log(reportsForAllRoutePaths)
}

main()


