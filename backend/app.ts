import express from 'express'
import { NextFunction, Response, Request } from 'express'
import { findAllVirtualRoutes } from './allRoutesFinder'
import { isSearchInput, SearchOutputResponse } from './types/api'

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
  console.error(error)
  response.status(500)
  response.send(error.message)
}

app.get('/search', async (req: Request, res: Response) => {
    const input = req.query

    if (!isSearchInput(input)) {
      processError(res, Error(`Bad input format. Received: ${input}`))
      return
    }
    const {cityFromSearch, cityToSearch, date} = input

    try {
      const result = await findAllVirtualRoutes(cityFromSearch, cityToSearch, new Date(date))
      const output = { result } as SearchOutputResponse
      res.send(output)
    } catch (error) {
      processError(res, error)
    }
})

app.listen(port, () => console.log(`Regiojet backend running on ${port}!`))
