import { createContext, useContext, useLayoutEffect, useState, useEffect } from "react";

const DateContext = createContext();

export const AgeProvider = ({ children }) => {
    //State that holds the inputs for the date
    const [dateOfBirth, setDateOfBirth] = useState({
        day: '',
        month: '',
        year: ''
    });

    //State that holds the calculated age
    const [age, setAge] = useState({
        day: '',
        month: '',
        year: ''
    })

    //State that holds the age to be displayed
    const [display, setDisplay] = useState({
        day: 0,
        month: 0,
        year: 0
    })

    //State that holds the indicator that an input has been touched
    const [touched, setTouched] = useState({
        year: false,
        month: false,
        day: false
    })

    //State that holds the validation errors for the inputs
    const [errors, setErrors] = useState({
        year: '',
        month: '',
        day: ''
    })

    //Boolean to indicate whether the inputs are valid
    const isValidDay = errors.day === '';
    const isValidMonth = errors.month === '';
    const isValidYear = errors.year === '';

    //Funcions that check the validity of an input when it changes
    useLayoutEffect(() => {
        if (touched.day) {
            validateDay()
        }
    }, [dateOfBirth.day])

    useLayoutEffect(() => {
        if (touched.month) {
            validateMonth()
        }
    }, [dateOfBirth.month])

    useLayoutEffect(() => {
        if (touched.year) {
            validateYear()
        }
    }, [dateOfBirth.year])

    //Functions that handle the counting animation when the displayed age changes
    useEffect(() => {

        if (display.day == age.day) return

        if (age.day == '') return

        const animationLength = 1000;
        const intervalLength = animationLength / age.day;

        let intervalId = setInterval(() => {
            if (display.day < age.day) {
                setDisplay({ ...display, day: ++display.day })
            } else {
                setDisplay({ ...display, day: --display.day })
            }

            if (display.day == age.day) { clearInterval(intervalId) }
        }, intervalLength);

        return () => { clearInterval(intervalId) }
    }, [age.day])

    useEffect(() => {

        if (display.month == age.month) return

        if (age.month == '') return

        const animationLength = 2000;
        const intervalLength = animationLength / age.month;

        let intervalId = setInterval(() => {
            if (display.month < age.month) {
                setDisplay({ ...display, month: ++display.month })
            } else {
                setDisplay({ ...display, month: --display.month })
            }

            if (display.month == age.month) { clearInterval(intervalId) }
        }, intervalLength);

        return () => { clearInterval(intervalId) }
    }, [age.month])

    useEffect(() => {

        if (display.year == age.year) return

        if (age.year == '') return

        const animationLength = 2000;
        const intervalLength = animationLength / age.year;

        let intervalId = setInterval(() => {
            if (display.year < age.year) {
                setDisplay({ ...display, year: ++display.year })
            } else {
                setDisplay({ ...display, year: --display.year })
            }

            if (display.year == age.year) { clearInterval(intervalId) }
        }, intervalLength);

        return () => { clearInterval(intervalId) }
    }, [age.year])

    //Handles setting the status of each input when touched
    function inputTouched(e) {
        setTouched({ ...touched, [e.target.name]: true })
    }

    //Handles setting the value of each input when they change
    function inputChanged(e) {
        setDateOfBirth({ ...dateOfBirth, [e.target.name]: e.target.value })
    }

    function validateDay() {
        const month = parseInt(dateOfBirth.month);
        const day = parseInt(dateOfBirth.day);
        // console.log('Hit');

        if (dateOfBirth.day === '' && touched.day) {
            setErrors({ ...errors, day: 'This field is required' })
        } else if (isNaN(dateOfBirth.day)) {
            setErrors({ ...errors, day: 'Must be a number' })
        } else if (day < 1 || day > 31) {
            setErrors({ ...errors, day: 'Must be a valid day' })
        } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
            setErrors({ ...errors, day: 'Must be a valid date' })
        } else if (month === 2 && day > 28) {
            setErrors({ ...errors, day: 'Must be a valid date' })
        } else {
            setErrors({ ...errors, day: '' })
        }
    }

    function validateMonth() {
        const month = parseInt(dateOfBirth.month);
        const day = parseInt(dateOfBirth.day);
        // console.log('Hit');

        if (dateOfBirth.month === '' && touched.month) {
            setErrors({ ...errors, month: 'This field is required' })
        } else if (isNaN(dateOfBirth.month)) {
            setErrors({ ...errors, month: 'Must be a number' })
        } else if (month < 1 || month > 12) {
            setErrors({ ...errors, month: 'Must be a valid month' })
        } else if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
            setErrors({ ...errors, day: 'Must be a valid date', month: '' })
        } else if (month === 2 && day > 28) {
            setErrors({ ...errors, day: 'Must be a valid date', month: '' })
        } else {
            setErrors({ ...errors, month: '', day: '' })
        }
    }

    function validateYear() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const year = parseInt(dateOfBirth.year);
        // console.log('Hit');

        if (dateOfBirth.year === '' && touched.year) {
            setErrors({ ...errors, year: 'This field is required' })
        } else if (isNaN(dateOfBirth.year)) {
            setErrors({ ...errors, year: 'Must be a number' })
        } else if (year > currentYear) {
            setErrors({ ...errors, year: 'Must be in the past' })
        } else {
            setErrors({ ...errors, year: '' })
        }
    }

    // function validate(event) {
    //     setDateOfBirth({ ...dateOfBirth, [event.target.name]: event.target.value })
    //     // validateDay();
    //     // validateMonth();
    //     // validateYear();
    //     console.log(dateOfBirth)
    //     console.log('Hit');
    // }

    //Handles all the age calculations
    function calculateAge() {
        if (dateOfBirth.day === '' && dateOfBirth.month === '' && dateOfBirth.year === '') return
        const today = new Date();
        const dob = new Date(`${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`);
        //const msPerYear = 12

        let yearsLived = today.getFullYear() - dob.getFullYear();
        let monthsLived = today.getMonth() - dob.getMonth();
        let daysLived = today.getDate() - dob.getDate();

        let dayTotal = today.getMonth() - 1 === 1 ? 28 : today.getMonth() - 1 === 3 || today.getMonth() - 1 === 5 || today.getMonth() - 1 === 8 || today.getMonth() - 1 === 10 ? 30 : 31;

        if (monthsLived < 0) {
            yearsLived--;
            monthsLived += 12;
        }

        if (daysLived < 0 && monthsLived !== 0) {
            monthsLived--;
            daysLived += dayTotal;
        }

        if (daysLived < 0 && monthsLived === 0) {
            yearsLived--;
            monthsLived = 11;
            daysLived += dayTotal;
        }

        setAge({ ...age, day: daysLived, month: monthsLived, year: yearsLived });
    }

    return (
        <DateContext.Provider value={{
            touched,
            errors,
            age,
            display,
            inputChanged,
            inputTouched,
            isValidDay,
            isValidMonth,
            isValidYear,
            validateDay,
            validateMonth,
            validateYear,
            calculateAge
        }}>
            {children}
        </DateContext.Provider>
    )
}

export const useDate = () => useContext(DateContext);