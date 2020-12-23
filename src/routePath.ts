import { LocationsProvider, mockLocationsProvider } from "./locationsProvider";
import { Route } from "./types/routeSearchRoutes";

export type RoutePath = Route[]

export function lowestPriceForRoutePath(routePath: RoutePath): number {
    return routePath.reduce((acc, route) => acc + route.priceFrom, 0)
}

export function stationIdsOnRoutePath(routePath: RoutePath): number[] {
    return [...routePath.map(route => route.departureStationId), routePath[routePath.length - 1].arrivalStationId]
}

export function stationNamesOnRoutePath(routePath: RoutePath): String[] {
    const stationIds = stationIdsOnRoutePath(routePath)
    return stationIds.map(stationId => {
        const station = mockLocationsProvider.findStationFromId(stationId)
        if (!station) {
            return "XXXXX"
        }
        return station.fullname
    })
}
