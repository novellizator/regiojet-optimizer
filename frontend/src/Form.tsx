import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker'

export interface FormInputElements {
    dateValue: Date
    cityFromValue: string
    cityToValue: string
}

export interface FormProps {
    onSubmit: (a: FormInputElements)=> void
}

export function Form({ onSubmit }: FormProps) {
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
