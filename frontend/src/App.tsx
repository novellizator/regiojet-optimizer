import React, { useState, useEffect } from 'react';

import { isSearchOutputResponse, SearchOutputResponse } from '../../backend/types/api'
import { SearchResult, mockSearchOutputResponse } from './SearchResult'
import { FormInputElements, Form } from './Form'
interface LoadRoutes {
  kind: 'loadRoutes'
  payload: FormInputElements
}
interface Noop {
  kind: 'noop'
}
const noopAction = () => ({kind: 'noop'} as Noop)

type Action = Noop | LoadRoutes

function useAction() {
  const [response, setResponse] = useState<SearchOutputResponse | undefined>(undefined)
  const [error, setError] = useState<String | undefined>(undefined)
  const [action, setAction] = useState<Action>(noopAction())
  useEffect(() => {
    if (action.kind != 'loadRoutes') {
      return
    }
    const { payload: {cityFromValue, cityToValue, dateValue}} = action
    const date = new Date(dateValue).getTime()
    const baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    //const baseUrl = `${window.location.protocol}//${window.location.hostname}:3000`
    fetch(`${baseUrl}/search?cityFromSearch=${cityFromValue}&cityToSearch=${cityToValue}&date=${date}`)
      .then(async response => {
        const resp = await response.json()
        if (response.status != 200) {
          setResponse(undefined)
          setError(`${response.status}: ${resp.error}`)
        } else {
          setResponse(resp)
          setError(undefined)
        }
      })

  }, [action])

  return {error, response, setAction}
}

function Intro() {
  return (<>
    <p>Regiojet uses some dishonest pricing tricks so sometimes it's cheaper to buy 2 tickets with a virtual transfer (within the same train) than a direct one. Other times it's better to buy a ticket for a longer distance and get off sooner. This app should automatize search for the cheapest ticket.</p>
    <p>Sources available at <a href="https://github.com/novellizator/regiojet-optimizer">github/novellizator/regiojet-optimizer</a></p>
    <hr />
    </>
  )

}
function App() {
  const {error, response, setAction} = useAction()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Regiojet Optimizer</h1>
        <Intro />
        <Form onSubmit={(input) => setAction({kind: 'loadRoutes', payload: input})}/>
        {error && <div>{error}</div>}
        {response && <SearchResult result={response.result}/> }
      </header>
    </div>
  );
}

export default App;
