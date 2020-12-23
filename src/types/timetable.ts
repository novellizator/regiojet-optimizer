export interface Timetable {
    fromCityName: string
    toCityName: string
    stations: TimetableStation[]
}

export interface TimetableStation {
    stationId: number
    departure: string
}
