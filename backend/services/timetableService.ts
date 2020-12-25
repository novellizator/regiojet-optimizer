import axios from 'axios'
import { RouteId } from "../types/routeSearchRoutes"
import { Timetable } from "../types/timetable"

import timetable from '../mocks/timetables.json'

interface TimetableFetching {
    fetchTimetableForRoute(route: RouteId): Promise<Timetable>
}
export class MockTimetableService implements TimetableFetching {
    fetchTimetableForRoute = async (routeId: RouteId) => {
        return timetable as Timetable
    }
}

export class TimetableService implements TimetableFetching {
    fetchTimetableForRoute = async (routeId: RouteId): Promise<Timetable> => {
        const uri = "https://brn-ybus-pubapi.sa.cz/restapi/consts/timetables/" + routeId
        return axios.get(uri).then(response => response.data)
    }
}

