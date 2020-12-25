import axios from 'axios'
import { RouteId } from "../types/routeSearchRoutes"
import { Timetable } from "../types/timetable"

import timetable from '../mocks/timetables.json'

interface TimetableFetching {
    fetchTimetableForRoute(route: RouteId): Promise<Timetable>
}
class TimetableService implements TimetableFetching {
    fetchTimetableForRoute = (route: RouteId): Promise<Timetable> => {
        const uri = "https://brn-ybus-pubapi.sa.cz/restapi/consts/timetables/" + route
        return axios.get(uri).then(response => response.data)
    }
}

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

