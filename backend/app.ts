import express from 'express'
import { NextFunction, Response, Request } from 'express'
import * as bodyParser from 'body-parser'
import { findCheapestRoutes } from './cheapestRoutesFinder'

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(addCrossDomainHeaders)
app.use(urlencodedParser)
app.use(jsonParser)


const processError = (response: Response, error: Error): void => {
  console.error(error)
  response.send(error.message)
}

interface Input {
    cityFromSearch: string
    cityToSearch: string
    date?: Date
}

app.get('/search', async (req: Request<Input>, res: Response) => {

    const {cityFromSearch, cityToSearch, date} = req.params

    try {
        const result = await findCheapestRoutes(cityFromSearch, cityToSearch, date)
        res.send(result)
    } catch (error) {
        processError(res, error)
    }
})

app.listen(port, () => console.log(`Regiojet backend running on ${port}!`))
