import { Route, RouteSearchResult } from '../types/routeSearchRoutes';
import routeSearchResult from '../mocks/route-search.json'

//  "https://brn-ybus-pubapi.sa.cz/restapi/routes/search/simple?departureDate=2020-12-20&fromLocationId=372825000&fromLocationType=STATION&locale=cs&tariffs=REGULAR&toLocationId=1763018007&toLocationType=STATION",

interface RoutesFetching {
    fetchRouteForDate(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<Route[]>
    fetchRouteForDateTime(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<Route[]>
}

export interface LocationDefinition {
    id: number
    type: "STATION" | "CITY"
}
interface LocationItem extends LocationDefinition{
    direction: 'from' | 'to'
}

export class RouteSearchService implements RoutesFetching {
    private async fetchRawRoute(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<RouteSearchResult> {
        const uri = generateUri(departureDate, fromLocation, toLocation)
        return fetch(uri).then(response => response.json() as Promise<RouteSearchResult>)
    }

    fetchRouteForDate = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        // this ignores the time, only accounts for the date
        const rawResult = await this.fetchRawRoute(departureDate, fromLocation, toLocation)
        return rawResult.routes
    }

    fetchRouteForDateTime = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        const routes = await this.fetchRouteForDate(departureDate, fromLocation, toLocation)
        return routes.filter(routeDepartureLaterThan(departureDate))
    }
}

export class MockRouteSearchService implements RoutesFetching {
    fetchRouteForDate = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        return (routeSearchResult as RouteSearchResult).routes
    }

    fetchRouteForDateTime = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        // does the same in mock
        return (routeSearchResult as RouteSearchResult).routes
    }
}

export function generateUri(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) {
    const fromItem: LocationItem = {...fromLocation, direction: 'from'}
    const toItem: LocationItem = {...toLocation, direction: 'to'}

    return `https://brn-ybus-pubapi.sa.cz/restapi/routes/search/simple\
        ?departureDate=${dateToUriString(departureDate)}\
        &${locationItemToUriString(fromItem)}\
        &${locationItemToUriString(toItem)}\
        &locale=cs&tariffs=REGULAR`.replace(/\s*/g,'')
}

function locationItemToUriString(locationItem: LocationItem) {
    return `${locationItem.direction}LocationId=${locationItem.id}&${locationItem.direction}LocationType=${locationItem.type}`
}

// 2020-12-20
// shaves off the time
function dateToUriString(date: Date) {
    const year = date.getFullYear()
    const month = prefixByZeroIfNeeded(date.getMonth())
    const day = prefixByZeroIfNeeded(date.getDate())
    return `${year}-${month}-${day}`
}

function prefixByZeroIfNeeded(number: number) {
    return `${number < 10 ? "0":'' }${number}`
}

function routeDepartureLaterThan(date: Date) {
    return (route: Route) => new Date(route.departureTime) > date
}
