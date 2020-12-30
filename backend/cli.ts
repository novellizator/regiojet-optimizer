import { findAllVirtualRoutes } from './allRoutesFinder'

async function main() {
    const [cityFromSearch, cityToSearch] = process.argv.slice(2)
    const date = new Date()

    const report = await findAllVirtualRoutes(cityFromSearch, cityToSearch, date)
    console.log(JSON.stringify(report, null, 4))
}

main()
