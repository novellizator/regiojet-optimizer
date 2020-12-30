import { SearchOutputResponse } from "../../backend/types/api"

export function SearchResult({ result }: SearchOutputResponse) {
return (<>
  <h2>From:{result.cityFrom} To: {result.cityTo}</h2>
  <table>
  <thead style={{display: 'table-header-group'}}>
      <tr><th>Route</th><th>Price</th><th>Currency</th></tr>
  </thead>
  <tbody>
    {result.routes.map((route, i) => {
      return <tr key={i}><td>{route.route.join('->')}</td><td>{route.price}</td><td>{route.currency}</td></tr>
    })}
  </tbody>
  </table>
  <pre>{JSON.stringify(result.routes, null, 4)}</pre>
</>)

}

export const mockSearchOutputResponse: SearchOutputResponse = {
  result: {
      cityFrom: 'Prague',
      cityTo: 'Ostrava',
      routes: [
          {
              currency: 'CZK',
              route: [
                  'Prague - main train station(2020-12-30 13:50h)',
                  'Olomouc - hl.n.(2020-12-30 16:05h)',
                  'Ostrava - Svinov(2020-12-30 17:02h)'
              ],
              price: 268
          },
          {
              currency: 'CZK',
              route: [
                  'Prague - main train station(2020-12-30 13:50h)',
                  'Ostrava - Svinov(2020-12-30 17:02h)'
              ],
              price: 295
          },
          {
              currency: 'CZK',
              route: [
                  'Prague - main train station(2020-12-30 13:50h)',
                  'Hranice na M. - nádr.(2020-12-30 16:36h)',
                  'Ostrava - Svinov(2020-12-30 17:02h)'
              ],
              price: 334
          },
          {
              currency: 'CZK',
              route: [
                  'Prague - main train station(2020-12-30 13:50h)',
                  'Pardubice - hl. nádraží(2020-12-30 14:44h)',
                  'Ostrava - Svinov(2020-12-30 17:02h)'
              ],
              price: 388
          }
      ]
  }
}
