import { divideIntoSegments, Segmentation } from "./segmentDivider"
import { LocationDefinition, MockRouteSearchService } from "./services/routeSearchService"
import { MockTimetableService } from "./services/timetableService"
import { Locations } from "./types/locations"
import { RouteSearchResult, Route } from "./types/routeSearchRoutes"
import { TimetableStation } from "./types/timetable"


const routeSearchService = new MockRouteSearchService()
const timetableService = new MockTimetableService()

function routeDepartureLaterThan(date: Date) {
    return (route: Route) => new Date(route.departureTime) > date
}

async function cheapestDirectRoute(fromLocation: LocationDefinition, toLocation: LocationDefinition, departureDate: Date): Promise<Route> {
    const routeSearchResult = await routeSearchService.fetchRouteForDateTime(departureDate, fromLocation, toLocation)
    const firstViableRoute = routeSearchResult.routes.find(routeDepartureLaterThan(departureDate))
    if (!firstViableRoute) {
        throw Error("No route found")
    }
    return firstViableRoute
}

type RoutePath = Route[]
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

export async function cheapestRoute(fromLocation: LocationDefinition, toLocation: LocationDefinition, departureDate: Date, numberOfSegments: number) {
    const canonicalRoutesSearchResult = await routeSearchService.fetchRouteForDate(departureDate, fromLocation, toLocation)
    const firstViableRoute = canonicalRoutesSearchResult.routes.find(routeDepartureLaterThan(departureDate))
    if (!firstViableRoute) {
        throw Error("No canonical route found")
    }

    let timetableForRoute = await timetableService.fetchTimetableForRoute(firstViableRoute.id)
    let stationsOnRoute = timetableForRoute.stations
    let segmentations = divideIntoSegments(0, stationsOnRoute.length - 1, numberOfSegments)
    let routePathsForSegmentationsPromise = segmentations.map(segmentation => findRoutePathForSegmentation(segmentation, stationsOnRoute, departureDate))
    let routePathsForSegmentations = await promiseAllResolved(routePathsForSegmentationsPromise)

    return routePathsForSegmentations
}

function promiseAllResolved<T>(promises: Promise<T>[]): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
        let nFullfilled = 0
        let results: T[] = []
        function checkAllFullfilled() {
            if (promises.length == nFullfilled) {
                resolve(results.filter(r => !!r))
            }
        }

        promises.forEach((promise, index)=> {
            promise.then((val) => {
                results[index] = val
                nFullfilled++
                checkAllFullfilled()
            }, (err) => {
                nFullfilled++
                checkAllFullfilled()
            })
        })
    })
}
