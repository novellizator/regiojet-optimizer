import { cheapestRoute } from "./cheapestRouteFinder"
import { mockLocationsProvider } from "./locationsProvider"
import { cityToLocationDefinition } from "./types/locations"


async function main() {
    const cityFromSearch = "Prag"
    const cityToSearch = "Kassa"

    const cityFrom = mockLocationsProvider.findCity(cityFromSearch)
    const cityTo = mockLocationsProvider.findCity(cityToSearch)
    if (!cityFrom || !cityTo) {
        throw Error("City not found")
    }

    console.log(`Searching for cheapest route from ${cityFrom.name} to ${cityTo.name}`)
    let x = await cheapestRoute(cityToLocationDefinition(cityFrom),cityToLocationDefinition(cityTo), new Date(), 1)
    console.log(x)
}

main()


