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
function App() {
  const [response, setResponse] = useState<SearchOutputResponse | undefined>(undefined)
  const [error, setError] = useState<String | undefined>(undefined)
  const [action, setAction] = useState<Action>(noopAction())
  useEffect(() => {
    if (action.kind != 'loadRoutes') {
      return
    }
    const { payload: {cityFromValue, cityToValue, dateValue}} = action
    const date = new Date(dateValue).getTime()
    fetch(`http://localhost:3000/api/search?cityFromSearch=${cityFromValue}&cityToSearch=${cityToValue}&date=${date}`)
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Regiojet Optimizer</h1>
        <Form onSubmit={(input) => setAction({kind: 'loadRoutes', payload: input})}/>
        {error && <div>{error}</div>}
        {response && <SearchResult result={response.result}/> }
      </header>
    </div>
  );
}

export default App;
