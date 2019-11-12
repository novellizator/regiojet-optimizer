import * as locations from './mocks/locations.json'

type RegiojetCountriesLocations = [CountryLocations]

interface CountryLocations {
    country: String
    cities: [CityLocations]
}

interface CityLocations {
    id: number
    name: string
    aliases: [string]
    stations: [any]
}

// doesn't work :shrug:
type ForceFlatten<T> = T extends [] ? T[number] : never
interface Array<T>  {
    flat(): ForceFlatten<T>
}

export class RegiojetLocationsProvider {  
    constructor(private locations: RegiojetCountriesLocations) {}
    findLocationId(cityName: string): CityLocations["id"] {
        return this.getAllCityLocations().find((cityLocation) => 
            cityLocation.name == cityName || cityLocation.aliases.includes(cityName)).id
    }   

    private getAllCityLocations(): [CityLocations] {
      return this.locations.map(country => country.cities).flat() as [CityLocations]
    }
}
console.log(333)
export const mockLocationsProvider = new RegiojetLocationsProvider(locations as RegiojetCountriesLocations)