import express from 'express'
import { NextFunction, Response, Request } from 'express'
import { findAllVirtualRoutes } from './allRoutesFinder'
import { isSearchInput, SearchOutputResponse } from './types/api'
import { parseDate } from './utils'

const app = express()
const port = 3000

const addCrossDomainHeaders = function(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(addCrossDomainHeaders)

const processError = (response: Response, error: Error): void => {
  const jsonError = {error: error.message}
  console.error('jsonerror', jsonError)
  response.status(500)
  response.send(jsonError)
}

app.get('/search', async (req: Request, res: Response) => {
    const input = req.query

    if (!isSearchInput(input)) {
      processError(res, new Error(`Bad input format. Expecting: cityFromSearch, cityToSearch and optional date. Received: ${JSON.stringify(input)}`))
      return
    }
    const {cityFromSearch, cityToSearch, date} = input
    const validatedDate = parseDate(date)
    try {
      const result = await findAllVirtualRoutes(cityFromSearch, cityToSearch, validatedDate)
      const output = { result } as SearchOutputResponse
      res.send(output)
    } catch (error) {
      processError(res, error)
    }
})

app.get('/ping', async (req: Request, res: Response) => {
  res.send('{"pong": 1 }')
})

app.listen(port, () => console.log(`Regiojet backend running on ${port}!`))
