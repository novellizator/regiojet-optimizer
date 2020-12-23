import { LocationsProvider } from "../locationsProvider";
import { RouteId } from "../types/routeSearchRoutes";
import { Timetable } from "../types/timetable";

import timetable from '../mocks/timetables.json'

interface TimetableFetching {
    fetchTimetableForRoute(route: RouteId): Promise<Timetable>
}
// class TimetableService implements TimetableFetching {
//     constructor(private locationsProvider: LocationsProvider) {
//     }

//     fetchTimetableForRoute = (route: RouteId) => {
//         return fetch("https://brn-ybus-pubapi.sa.cz/restapi/consts/timetables/" + route)
//         .then(req => req.json()) as Timetable
//     }
// }

export class MockTimetableService implements TimetableFetching {
    fetchTimetableForRoute = async (routeId: RouteId) => {
        return timetable as Timetable
    }
}

export class DefaultTimetableService implements TimetableFetching {
    fetchTimetableForRoute = async (routeId: RouteId) => {
        return fetch("https://brn-ybus-pubapi.sa.cz/restapi/consts/timetables/" + routeId)
            .then(response => response.json())
    }
}

