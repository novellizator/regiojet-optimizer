import express from 'express'
import { NextFunction, Response, Request } from 'express'
import * as bodyParser from 'body-parser'
import { findCheapestRoutes } from './cheapestRoutesFinder'
import { type } from 'os'

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
  response.status(500)
  response.send(error.message)
}

interface SearchInput {
    cityFromSearch: string
    cityToSearch: string
}

function isSearchInput(test: unknown): test is SearchInput {
  const typed = test as SearchInput
  return typeof typed.cityFromSearch == "string" && typeof typed.cityToSearch == "string"
}

app.get('/search', async (req: Request, res: Response) => {
    const input = req.query
    console.log('input', input, 'params', req.params, 'body', req.body)
    if (!isSearchInput(input)) {
      processError(res, Error('Bad input format'))
      return
    }
    const {cityFromSearch, cityToSearch} = input

    try {
        const result = await findCheapestRoutes(cityFromSearch, cityToSearch, new Date())
        res.send({result})
    } catch (error) {
        processError(res, error)
    }
})

app.listen(port, () => console.log(`Regiojet backend running on ${port}!`))
