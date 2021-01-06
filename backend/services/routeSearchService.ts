import { Route, RouteSearchResult } from '../types/routeSearchRoutes';
import routeSearchResult from '../mocks/route-search.json'
import axios from 'axios'
import { LocationDefinition } from '../types/locations';
import { dateToUriString } from '../utils';
interface RoutesFetching {
    fetchRouteForDate(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<Route[]>
    fetchRouteForDateTime(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<Route[]>
}

export class RouteSearchService implements RoutesFetching {
    private async fetchRawRoute(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<RouteSearchResult> {
        const uri = generateUri(departureDate, fromLocation, toLocation)
        return axios.get(uri,{
            headers: {
                'X-Currency': 'CZK'
            }
        }).then(response => response.data)
    }

    fetchRouteForDate = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        // this ignores the time, only accounts for the date
        const rawResult = await this.fetchRawRoute(departureDate, fromLocation, toLocation)
        return rawResult.routes
    }

    fetchRouteForDateTime = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        const routes = await this.fetchRouteForDate(departureDate, fromLocation, toLocation)
        return routes.filter(routeDepartureLaterThanEqual(departureDate))
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

interface LocationItem extends LocationDefinition {
    direction: 'from' | 'to'
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

function routeDepartureLaterThanEqual(date: Date) {
    return (route: Route) => new Date(route.departureTime) >= date
}
