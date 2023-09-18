import React from 'react';
import { useDate } from '../context/DateContext';

function Evaluate() {
    const { calculateAge, isValidDay, isValidMonth, isValidYear } = useDate();
    return (
        <div className='divider'>
            <button onClick={() => calculateAge()} disabled={!isValidDay || !isValidMonth || !isValidYear} className='convert-button'>
                <i className="fa-solid fa-arrow-down"></i>
            </button>
        </div>
    )
}

export default Evaluate