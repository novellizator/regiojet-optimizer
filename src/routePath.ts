import { LocationsProvider, mockLocationsProvider } from "./locationsProvider";
import { Route } from "./types/routeSearchRoutes";

export type RoutePath = Route[]

export function lowestPriceForRoutePath(routePath: RoutePath): number {
    return routePath.reduce((acc, route) => acc + route.priceFrom, 0)
}

export function stationIdsOnRoutePath(routePath: RoutePath): number[] {
    return [...routePath.map(route => route.departureStationId), routePath[routePath.length - 1].arrivalStationId]
}

export function departuresOnRoutePath(routePath: RoutePath): string[] {
    return routePath.map(route => route.departureTime)
}


export function stationNamesOnRoutePath(routePath: RoutePath): String[] {
    const stationIds = stationIdsOnRoutePath(routePath)
    return stationIds.map((stationId, i) => {
        const time = i == stationIds.length - 1 ? routePath[i-1]?.arrivalTime : routePath[i].departureTime
        const station = mockLocationsProvider.findStationFromId(stationId)
        let stationName: string
        if (!station) {
            stationName = "XXXXX"
        } else {
            stationName = station.fullname
        }

        return `${stationName}(${time})`
    })
}
