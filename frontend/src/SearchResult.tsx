import { RouteNodeDescription } from "../../backend/routePath"
import { SearchOutputResponse } from "../../backend/types/api"

export function SearchResult({ result }: SearchOutputResponse) {
return (<>
  <h2>From:{result.cityFrom} To: {result.cityTo}</h2>
  <table>
  <thead style={{display: 'table-header-group'}}>
      <tr><th>Route</th><th>Price</th><th>Currency</th></tr>
  </thead>
  <tbody>
    {result.routeItems.map((routeItem, i) => {
      return <tr key={i}><td>{routeNodeDescription(routeItem.route)}</td><td>{routeItem.price}</td><td>{routeItem.currency}</td></tr>
    })}
  </tbody>
  </table>
  <pre>{JSON.stringify(result.routeItems, null, 4)}</pre>
</>)

}

function routeNodeDescription(desc: RouteNodeDescription[]): string {
     return desc.map(descItem => {
        return `${descItem.station} (${new Date(descItem.date).toLocaleDateString()} ${new Date(descItem.date).toLocaleTimeString()})`
     }).join('->')
}

export const mockSearchOutputResponse: SearchOutputResponse = {
  result: {
    "cityFrom": "Prague",
    "cityTo": "Ostrava",
    "routeItems": [
        {
            "currency": "CZK",
            "route": [
                {
                    "station": "Prague - main train station",
                    "date": "2021-01-07T05:50:00.000+01:00"
                },
                {
                    "station": "Ostrava - Svinov",
                    "date": "2021-01-07T09:02:00.000+01:00"
                }
            ],
            "price": 199
        },
        {
            "currency": "CZK",
            "route": [
                {
                    "station": "Prague - main train station",
                    "date": "2021-01-07T05:50:00.000+01:00"
                },
                {
                    "station": "Hranice na M. - nádr.",
                    "date": "2021-01-07T08:36:00.000+01:00"
                },
                {
                    "station": "Ostrava - Svinov",
                    "date": "2021-01-07T09:02:00.000+01:00"
                }
            ],
            "price": 204
        },
        {
            "currency": "CZK",
            "route": [
                {
                    "station": "Prague - main train station",
                    "date": "2021-01-07T05:50:00.000+01:00"
                },
                {
                    "station": "Olomouc - hl.n.",
                    "date": "2021-01-07T08:05:00.000+01:00"
                },
                {
                    "station": "Ostrava - Svinov",
                    "date": "2021-01-07T09:02:00.000+01:00"
                }
            ],
            "price": 208
        }
    ]
  }
}
