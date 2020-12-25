export interface RouteSearchResult {
    routes: Route[]
}

export interface Route {
    id: string
    departureStationId: number
    departureTime: string,
    arrivalStationId: number,
    arrivalTime: string,
    priceFrom: number,
}

export type RouteId = Route["id"]
