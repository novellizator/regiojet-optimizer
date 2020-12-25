import { findCheapestRoutes } from './cheapestRoutesFinder'

async function main() {
    const [cityFromSearch, cityToSearch] = process.argv.slice(2)
    const date = new Date()

    const report = await findCheapestRoutes(cityFromSearch, cityToSearch, date)
    console.log(report)
}

main()
