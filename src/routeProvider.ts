import {RegiojetLocationsProvider} from './locationsProvider'
export class RouteProvider {
    constructor(public locationsProvider: RegiojetLocationsProvider, public routeResolvingService: RouteResolvingService) {}
    getStationsOnRoute() {

    }
}