import {RegiojetLocationsProvider, mockLocationsProvider}from './locationsProvider'
import {RouteProvider}from './routeProvider'
////

/// I have a route
enum StationType {
  fullName, regioId, idosId  
}
interface Station {
    value: string | number
    type: StationType
}
interface Price {
    value: number
    currency: string
}

interface PricedRouteSegment extends RouteSegment {
    from: Station
    to: Station
    price: Price
}

type Route = [RouteSegment]
type PricedRoute = [PricedRouteSegment]

interface RouteSegment {
    from: Station
    to: Station
}
interface RouteDivisionStrategy {
    getDivisions(from: Station, to: Station): [Route]
}

class NoDivisionStrategy implements RouteDivisionStrategy {
   constructor(public routeProvider: RouteProvider) {
   }
   getDivisions(from: Station, to: Station): [Route] {

   }

}



async function findCheapestRoute(from: Station, to: Station, time: Date): PricedRoute {
   const divisionStrategy: RouteDivisionStrategy = NoDivisionStrategy()
   const divisions = divisionStrategy.getDivisions(from, to)
   for (const division of divisions) {
       let route = []
       for (const divisionSegment of division) {
         let ticketsResponse = await TicketService().fetchTickets(from, to, time)
         let ticketProvider = TicketProvider(ticketsResponse)
         let ticket = ticket.asTicket()
         route.push(ticket)
       }
   }

} 

console.log(33333)