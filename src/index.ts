import { cheapestRoute } from "./cheapest-route-finder"

/// I have a route

// async function findCheapestRoute(from: Station, to: Station, time: Date): Promise<[PricedRoute]> {
//    const divisionStrategy: RouteDivisionStrategy = NoDivisionStrategy()
//    const divisions = divisionStrategy.getDivisions(from, to)
//    for (const division of divisions) {
//        let route = []
//        for (const divisionSegment of division) {
//          let ticketsResponse = await TicketService().fetchTickets(from, to, time)
//          let ticketProvider = TicketProvider(ticketsResponse)
//          let ticket = ticket.asTicket()
//          route.push(ticket)
//        }
//    }

// }
interface IC {
    flat<U>(this: U[][], depth?: 1): U[];
}

async function main() {
    let date = new Date()
    date.setFullYear(2000)
    let x = await cheapestRoute({id: 123, type: 'CITY'},{id: 456, type: 'CITY'}, date, 1)
    console.log(x)
}

main()


