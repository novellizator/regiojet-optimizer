import DateTimePicker from 'react-datetime-picker'
import React, { useState, useEffect } from 'react';

import { isSearchOutputResponse, SearchOutputResponse } from '../../backend/types/api'
import { SearchResult, mockSearchOutputResponse } from './SearchResult'


interface FormElements {
  dateValue: Date
  cityFromValue: string
  cityToValue: string
}

function App() {
  const [response, setResponse] = useState<SearchOutputResponse | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (isLoading) {
      Promise.resolve(mockSearchOutputResponse).then(setResponse)
      // fetch('http://localhost')
      //   .then(r => r.json())
      //   .then(r => {
      //     setResponse(r)
      //   })
    }
  }, [isLoading])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Regiojet Optimizer</h1>
        <Form onSubmit={() => setIsLoading(true)}/>
        {response && <SearchResult result={response.result}/> }
      </header>
    </div>
  );
}


interface FormProps {
  onSubmit: (a: FormElements)=> void
}

function Form({ onSubmit }: FormProps) {
  const [dateValue, onDateChange] = useState(new Date());
  const [cityFromValue, setCityFromValue] = useState("prag")
  const [cityToValue, setCityToValue] = useState("ostra")

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({dateValue, cityFromValue, cityToValue}) }}>
      <table>
      <tbody>
        <tr>
            <td>City from: <input type="text" name="from" value={cityFromValue} onChange={e => { setCityFromValue(e.target.value) }}/></td>
            <td>City to: <input type="text" name="to" value={cityToValue} onChange={e => { setCityToValue(e.target.value) }}/></td>
        </tr>
        <tr><td><DateTimePicker onChange={onDateChange} value={dateValue}/></td></tr>
        <tr><td><input type="submit" name="search" value="Search!" /></td></tr>
      </tbody>
      </table>

    </form>
  )
}

export default App;
