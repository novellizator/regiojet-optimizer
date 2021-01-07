import locations from './mocks/locations.json'
import { City, Locations, Station } from './types/locations'
import { flattened, stripDiacritics } from './utils'
export class LocationsProvider {
    constructor(private locations: Locations) {
    }

    findCity(searchCity: string): City | undefined {
      const lowercaseSearchCity = stripDiacritics(searchCity.toLowerCase())
      // empty string is a substring of everything
      if (lowercaseSearchCity == "") {
        return undefined
      }

      return this
        .getAllCities()
        .find((city) =>
          [...city.aliases, city.name]
            .map(cityName => stripDiacritics(cityName.toLowerCase()))
            .some(cityName => cityName.includes(lowercaseSearchCity)))
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
