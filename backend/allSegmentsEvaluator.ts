import { mockLocationsProvider } from "./locationsProvider"
import { RoutePath } from "./routePath"
import { divideIntoSegments, Segmentation } from "./segmentDivider"
import { RouteSearchService } from "./services/routeSearchService"
import { TimetableService } from "./services/timetableService"
import { LocationDefinition } from "./types/locations"
import { Route } from "./types/routeSearchRoutes"
import { TimetableStation } from "./types/timetable"
import { promiseAllResolved } from "./utils"


const routeSearchService = new RouteSearchService()
const timetableService = new TimetableService()

async function cheapestDirectRoute(fromLocation: LocationDefinition,
                                   toLocation: LocationDefinition,
                                   departureDate: Date): Promise<Route> {
    const routeSearchResult = await routeSearchService.fetchRouteForDateTime(departureDate, fromLocation, toLocation)
    const firstViableRoute = routeSearchResult[0]
    if (!firstViableRoute) {
        throw Error("No route found")
    }
    return firstViableRoute
}

async function findRoutePathForSegmentation(segmentation: Segmentation,
                                            stations: TimetableStation[],
                                            startDate: Date,
                                            resolveRouteForConditions: ((from: LocationDefinition, to: LocationDefinition, departure: Date) => Promise<Route>) = cheapestDirectRoute): Promise<RoutePath> {
    const routePath: RoutePath = []
    let startDateForSegment = startDate
    for (let i = 0; i < segmentation.length - 1; ++i) {
        const segment = { fromIndex: segmentation[i], toIndex: segmentation[i + 1] }
        const fromLocation: LocationDefinition = {id: stations[segment.fromIndex].stationId, type: 'STATION'}
        const toLocation: LocationDefinition = {id: stations[segment.toIndex].stationId, type: 'STATION'}
        const route = await resolveRouteForConditions(fromLocation, toLocation, startDateForSegment)
        routePath.push(route)
        startDateForSegment = new Date(route.arrivalTime)
    }
    return routePath
}

export async function allRoutePathsForNumberOfSegments(fromLocation: LocationDefinition,
                                                    toLocation: LocationDefinition,
                                                    departureDate: Date,
                                                    numberOfSegments: number) {
    const canonicalRoutesSearchResult = await routeSearchService.fetchRouteForDate(departureDate, fromLocation, toLocation)

    const firstViableRoute = canonicalRoutesSearchResult.find(route => !route.id.includes(','))
    if (!firstViableRoute) {
        throw Error("No canonical route found. Maybe the route has a transfer. As of now, we cannot process that")
    }

    const timetableForRoute = await timetableService.fetchTimetableForRoute(firstViableRoute.id)
    const stationsOnRoute = timetableForRoute.stations

    const finalStationIndex = stationsOnRoute.findIndex(stationOnRoute =>
        toLocation.id == mockLocationsProvider.findCityFromStationId(stationOnRoute.stationId)?.id)
    const segmentations = divideIntoSegments(0, finalStationIndex, numberOfSegments)
    const routePathsForSegmentationsPromise = segmentations.map(segmentation => findRoutePathForSegmentation(segmentation, stationsOnRoute, departureDate))
    const routePathsForSegmentations = await promiseAllResolved(routePathsForSegmentationsPromise)

    return routePathsForSegmentations
}
