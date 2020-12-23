export type Locations = Country[]

export interface Country {
    country: String
    cities: City[]
}

export interface City {
    id: number
    name: string
    aliases: string[]
    stations: Station[]
}

export interface Station {
    id: number
    name: string
}

export interface LocationDefinition {
    id: number
    type: "STATION" | "CITY"
}

export function cityToLocationDefinition(city: City): LocationDefinition {
    return {
        id: city.id,
        type: 'CITY'
    }
}
