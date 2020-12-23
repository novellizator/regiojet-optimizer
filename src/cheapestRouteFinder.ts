import { RoutePath } from "./routePath"
import { divideIntoSegments, Segmentation } from "./segmentDivider"
import { RouteSearchService } from "./services/routeSearchService"
import { MockTimetableService } from "./services/timetableService"
import { LocationDefinition } from "./types/locations"
import { RouteSearchResult, Route } from "./types/routeSearchRoutes"
import { TimetableStation } from "./types/timetable"
import { promiseAllResolved } from "./utils"


const routeSearchService = new RouteSearchService()
const timetableService = new MockTimetableService()

function routeDepartureLaterThan(date: Date) {
    return (route: Route) => new Date(route.departureTime) > date
}

async function cheapestDirectRoute(fromLocation: LocationDefinition, toLocation: LocationDefinition, departureDate: Date): Promise<Route> {
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
                                            resolveRouteForConditions: ((from: LocationDefinition, to: LocationDefinition, departure: Date) => Promise<Route | undefined>) = cheapestDirectRoute): Promise<RoutePath> {
    const routePath: RoutePath = []
    let startDateForSegment = startDate
    for (let i = 0; i < segmentation.length - 1; ++i) {
        const segment = { fromIndex: segmentation[i], toIndex: segmentation[i + 1] }
        const fromLocation: LocationDefinition = {id: stations[segment.fromIndex].stationId, type: 'STATION'}
        const toLocation: LocationDefinition = {id: stations[segment.toIndex].stationId, type: 'STATION'}
        const route = await cheapestDirectRoute(fromLocation, toLocation, startDateForSegment)
        routePath.push(route)
        startDateForSegment = new Date(route.departureTime)
    }
    return routePath
}

export async function allRoutePathsForSegmentations(fromLocation: LocationDefinition, toLocation: LocationDefinition, departureDate: Date, numberOfSegments: number) {
    const canonicalRoutesSearchResult = await routeSearchService.fetchRouteForDate(departureDate, fromLocation, toLocation)
    const firstViableRoute = canonicalRoutesSearchResult[0]
    if (!firstViableRoute) {
        throw Error("No canonical route found")
    }

    const timetableForRoute = await timetableService.fetchTimetableForRoute(firstViableRoute.id)
    const stationsOnRoute = timetableForRoute.stations
    const segmentations = divideIntoSegments(0, stationsOnRoute.length - 1, numberOfSegments)
    const routePathsForSegmentationsPromise = segmentations.map(segmentation => findRoutePathForSegmentation(segmentation, stationsOnRoute, departureDate))
    const routePathsForSegmentations = await promiseAllResolved(routePathsForSegmentationsPromise)

    return routePathsForSegmentations
}
