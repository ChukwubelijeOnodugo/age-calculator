import React, { useState, useEffect } from 'react';
import './AgeDisplay.css';
import { useDate } from '../context/DateContext';


function AgeDisplay() {
  const { age, display } = useDate();


  return (
    <section className='derived-age'>
      <div><span className='derived-figure'>{age.year !== '' ? display.year : '--'}</span> years</div>
      <div><span className='derived-figure'>{age.month !== '' ? display.month : '--'}</span> months</div>
      <div><span className='derived-figure'>{age.day !== '' ? display.day : '--'}</span> days</div>
    </section>
  )
}

export default AgeDisplay