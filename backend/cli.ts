import { findAllVirtualRoutes } from './allRoutesFinder'
import { parseDate } from './utils'

async function main() {
    const [cityFromSearch, cityToSearch, optionalDate] = process.argv.slice(2)

    const date = parseDate(optionalDate)

    const report = await findAllVirtualRoutes(cityFromSearch, cityToSearch, date)
    console.log(JSON.stringify(report, null, 4))
}

main()
