import locations from './mocks/locations.json'
import { City, Locations, Station } from './types/locations'
import { flattened, stripDiacritics } from './utils'
export class LocationsProvider {
    constructor(private locations: Locations) {
    }

    findCity(searchCity: string): City | undefined {
      const lowercaseCity = stripDiacritics(searchCity.toLowerCase())
      return this
        .getAllCities()
        .find((cityLocation) =>
          [...cityLocation.aliases, cityLocation.name]
            .map(cityName => cityName.toLowerCase())
            .map(cityName => stripDiacritics(cityName))
            .some(cityName => cityName.indexOf(lowercaseCity) !== -1))
    }

    findCityFromId(cityId: number): City | undefined {
      return this.getAllCities().find(city => city.id == cityId)
    }

    findCityFromStationId(stationId: number): City | undefined {
      return this.getAllCities().find(city => city.stations.find(station => station.id == stationId))
    }

    findStationFromId(stationId: number): Station | undefined {
      return this.getAllStations().find(station => station.id == stationId)
    }

    private getAllCities(): City[] {
      return flattened(this.locations.map(country => country.cities))
    }

    private getAllStations(): Station[] {
      return flattened(this.getAllCities().map(city => city.stations))
    }
}
export const mockLocationsProvider = new LocationsProvider(locations)
