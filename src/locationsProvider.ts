import locations from './mocks/locations.json'
import { City, Locations } from './types/locations'
export class LocationsProvider {
    constructor(private locations: Locations) {}
    findCity(searchCity: string): City | undefined {
      const lowercaseCity = searchCity.toLowerCase()
      return this
        .getAllCities()
        .find((cityLocation) =>
          [...cityLocation.aliases, cityLocation.name]
            .map(cityName => cityName.toLowerCase())
            .some(cityName => cityName.indexOf(lowercaseCity) !== -1))
    }

    private getAllCities(): City[] {
      return this.locations.map(country => country.cities).flat()
    }
}
export const mockLocationsProvider = new LocationsProvider(locations)



console.log("lc provider!")
console.log(mockLocationsProvider.findCity("rag"))
