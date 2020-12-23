import { LocationsProvider } from '../locationsProvider';
import routeSearch from '../mocks/route-search.json'
import { Locations, Station } from '../types/locations';
import { RouteSearchResult } from '../types/routeSearchRoutes';
import routeSearchResult from '../mocks/route-search.json'

//  "https://brn-ybus-pubapi.sa.cz/restapi/routes/search/simple?departureDate=2020-12-20&fromLocationId=372825000&fromLocationType=STATION&locale=cs&tariffs=REGULAR&toLocationId=1763018007&toLocationType=STATION",

interface RoutesFetching {
    fetchRouteForDate(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<RouteSearchResult>
    fetchRouteForDateTime(departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition): Promise<RouteSearchResult>
}

export interface LocationDefinition {
    id: number
    type: "STATION" | "CITY"
}
interface LocationItem extends LocationDefinition{
    direction: 'from' | 'to'
}


export class MockRouteSearchService implements RoutesFetching {
    fetchRouteForDate = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        const fromItem: LocationItem = {...fromLocation, direction: 'from'}
        const toItem: LocationItem = {...toLocation, direction: 'to'}
        const uri = `https://brn-ybus-pubapi.sa.cz/restapi/routes/search/simple\
?departureDate=${dateToUriString(departureDate)}\
&${locationItemToUriString(fromItem)}\
&${locationItemToUriString(toItem)}\
&locale=cs&tariffs=REGULAR`
        console.warn(uri)
        return routeSearchResult as RouteSearchResult
    }

    fetchRouteForDateTime = async (departureDate: Date, fromLocation: LocationDefinition, toLocation: LocationDefinition) => {
        // does the same in mock
        return routeSearchResult as RouteSearchResult
    }
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
