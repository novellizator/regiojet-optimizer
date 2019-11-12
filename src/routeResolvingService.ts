import {RegiojetLocationsProvider} from './locationsProvider'
import cityNamesOnRoute from './mocks/praha-kosice.json'
export interface RouteResolvingService {

}

export class MockRouteResolvingService implements RouteResolvingService {
    constructor(public locationsProvider: RegiojetLocationsProvider) {}
    async resolveRoute(from: string, to: string) {
        cityNamesOnRoute.map((cityName: string) => {
            this.locationsProvider.findLocationId(cityName)
        })
    }
}