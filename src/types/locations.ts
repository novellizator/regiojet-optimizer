export type Locations = Country[]

export interface Country {
    country: String
    cities: City[]
    //[key: string]: unknown
}

export interface City {
    id: number
    name: string
    aliases: string[]
    stations: Station[]
    //[key: string]: unknown
}

export interface Station {
    id: number
    name: string
    //[key: string]: unknown
}
