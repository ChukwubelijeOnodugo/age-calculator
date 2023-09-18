import React from 'react';
import './DOBInput.css';
import { useDate } from '../context/DateContext';

function DOBInput() {

  const { touched, errors, isValidDay, isValidMonth, isValidYear, inputChanged, inputTouched } = useDate();

  const invalidInput = {
    outline: 'none',
    border: '1px solid var(--lred)'
  }

  const invalidLabel = {
    color: 'var(--lred)'
  }

  return (
    <section className='inputs'>
      <span>
        <label htmlFor="day" style={isValidDay ? null : invalidLabel}>DAY</label>
        <input type="text" name="day" id="day" placeholder='DD' style={isValidDay ? null : invalidInput} onChange={inputChanged} onFocus={inputTouched} />
        {touched.day && errors.day && <p className='error'>{errors.day}</p>}
      </span>
      <span>
        <label htmlFor="month" style={isValidMonth ? null : invalidLabel}>MONTH</label>
        <input type="text" name="month" placeholder='MM' id="month" style={isValidMonth ? null : invalidInput} onChange={inputChanged} onFocus={inputTouched} />
        {touched.month && errors.month && <p className='error'>{errors.month}</p>}
      </span>
      <span>
        <label htmlFor="year" style={isValidYear ? null : invalidLabel}>YEAR</label>
        <input type="text" name="year" placeholder='YYYY' id="year" style={isValidYear ? null : invalidInput} onChange={inputChanged} onFocus={inputTouched} />
        {touched.year && errors.year && <p className='error'>{errors.year}</p>}
      </span>
    </section>
  )
}

export default DOBInput