import locations from './mocks/locations.json'
import { City, Locations, Station } from './types/locations'
import { stripDiacritics } from './utils'
export class LocationsProvider {
    constructor(private locations: Locations) {
      console.log('locations', this.locations.length, this.locations)
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
      return this.locations.map(country => country.cities).flat()
    }

    private getAllStations(): Station[] {
      return this.getAllCities().map(city => city.stations).flat()
    }
}
export const mockLocationsProvider = new LocationsProvider(locations)
