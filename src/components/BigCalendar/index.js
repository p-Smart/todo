import { Box, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import {PiCaretLeftLight, PiCaretRightLight} from 'react-icons/pi'
import { useGlobalContext } from "src/contexts/globalContext"
import { getDateDescription, longMonthYear, shortMonthDayYear } from "src/utils/dateFormats"
import { buttonStyle, textFieldStyle } from "./styles"
import Button from "../Button"
import { v4 as uuid } from 'uuid'
import { useBreakpoints } from "src/theme/mediaQuery"
  

const datesEqual = (date1, date2) => {
    const dayEqual = date1.getDate() === date2.getDate()
    const monthEqual = date1.getMonth() === date2.getMonth()
    return dayEqual && monthEqual
}

const BigCalendar = () => {

    const {md} = useBreakpoints()
    const {date, setDate} = useGlobalContext()

    const initialDaysObject = {
        'Mo' : [],
        'Tu' : [],
        'Wed' : [],
        'Th' : [],
        'Fr' : [],
        'Sat' : [],
        'Su' : []
    }

    const [daysObject, setDaysObject] = useState(initialDaysObject)


    const computeCalendarRows = (year, month) => {
        const firstDayOfMonthObj = new Date(year, month, 1)
        const lastDayOfMonthObj = new Date(year, month+1, 0)
    
        const firstDayOfWeek = firstDayOfMonthObj.getDay()
        const numberOfDays = lastDayOfMonthObj.getDate()
    
        const firstWeek = firstDayOfMonthObj.getDay()
        const daysArray = Object.keys(daysObject)
        const remWeekDays = (daysArray.length - 1) - (firstWeek===0 ? 6 : firstWeek-1)
        
        let numOfWeeks = Math.ceil(numberOfDays / 7)

        let lastValOnFirstDayCol = 1
        while(lastValOnFirstDayCol < numberOfDays && (numberOfDays - lastValOnFirstDayCol) >= 7 ){
            lastValOnFirstDayCol += 7
        }
    
        const remDays = numberOfDays - lastValOnFirstDayCol

        if(remDays > remWeekDays){
            const weeksToAdd = Math.ceil(remDays / 7)
            numOfWeeks += weeksToAdd
        }

        return numOfWeeks
    }

    useEffect(() => {
        const currentDate = new Date(date)
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth()

        const weeksInMonth = computeCalendarRows(currentYear, currentMonth)

        
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    
        let dateCounter = firstDayOfMonth.getDay()
    
        const updatedDaysObject = { ...initialDaysObject }
        const daysTextArray = Object.keys(updatedDaysObject)
    
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
          const currentDayOfWeek = daysTextArray[dateCounter===0 ? 6 : dateCounter-1]
          
          if (currentDayOfWeek) {
            updatedDaysObject[currentDayOfWeek].push({
              dayNum: day,
              date: new Date(currentYear, currentMonth, day)
            })
          }
          dateCounter = (dateCounter + 1) % 7
        }

        // const maxLength = Object.values(updatedDaysObject).reduce( (result, dayArray) =>  Math.max(result, dayArray.length), 0)

        const firstDayOfMonthText = daysTextArray[firstDayOfMonth.getDay()===0 ? 6 : firstDayOfMonth.getDay()-1]
        const lastDayOfMonthText = daysTextArray[lastDayOfMonth.getDay()===0 ? 6 : lastDayOfMonth.getDay()-1]
        const daysBeforeFirstDay = daysTextArray.slice(0, daysTextArray.indexOf(firstDayOfMonthText))
        const daysAfterLastDay = daysTextArray.slice(daysTextArray.indexOf(lastDayOfMonthText) + 1)

        daysTextArray?.forEach( (day) => {
            if(updatedDaysObject[day].length !== weeksInMonth){
                const dayArray = updatedDaysObject[day]

                const firstDate = new Date((dayArray[0]).date)
                const lastDate = new Date((dayArray[dayArray.length - 1]).date)
                firstDate.setDate(firstDate.getDate() - 7)
                lastDate.setDate(lastDate.getDate() + 7)

                if(daysBeforeFirstDay.includes(day)){
                    updatedDaysObject[day].unshift({
                        dayNum: firstDate.getDate(),
                        date: firstDate,
                        paddedDate: true
                    })
                }

                if(daysAfterLastDay.includes(day)){
                    updatedDaysObject[day].push({
                        dayNum: lastDate.getDate(),
                        date: lastDate,
                        paddedDate: true
                    })
                }
            }
        } )
        
        
    
        setDaysObject(updatedDaysObject)
      }, [date] )



      const handleSetPreviousMonth = () => {
        setDate( (prevDate) => {
            const newDate = new Date(prevDate)
            const month = newDate.getMonth()
            newDate.setMonth(month - 1)
            newDate.setDate(1)
            return new Date(newDate)
        } )
        
    }

    const handleSetNextMonth = () => {
        setDate( (prevDate) => {
            const newDate = new Date(prevDate)
            const month = newDate.getMonth()
            newDate.setMonth(month + 1)
            newDate.setDate(1)
            return new Date(newDate)
        } )
    }

    const handleSetDate = (dateObj) => {
        setDate( dateObj )
    }




    return (
        <Stack
        sx={{
            width: !md ? 'max-content' : 'unset',
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: 'neutral.50',
            p: '20px',
            gap: '8px',
            height: 'fit-content',
            '& p, input': {
                fontSize: '.85rem'
            }
        }}
        >
        
        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
        }}
        >
        <Button
        sx={buttonStyle}
        onClick={handleSetPreviousMonth}
        >
        <PiCaretLeftLight />
        </Button>
        <Typography sx={{fontWeight: 600}}>
            {longMonthYear(date)}
        </Typography>
        <Button
        sx={buttonStyle}
        onClick={handleSetNextMonth}
        >
        <PiCaretRightLight />
        </Button>
        </Stack>

        <Stack
        direction='row'
        sx={{
            gap: '10px'
        }}
        >
        <TextField 
        value={shortMonthDayYear(date)}
        sx={{
            ...textFieldStyle
        }}
        />
        <TextField 
        value={getDateDescription(date)}
        sx={{
            ...textFieldStyle
        }}
        />
        </Stack>

        <Stack
        direction='row'
        sx={{
            p: '0 10px',
            justifyContent: 'space-between',
        }}
        >
            {
            Object.keys(daysObject).map( (day) => (
                <Stack
                key={uuid()}
                sx={{gap: '8px', alignItems: 'center'}}
                >
                <Typography
                sx={{fontWeight: 600}}
                >
                {day}
                </Typography>

                {
                daysObject[day].map( (dayObject) => (
                    <Button
                    key={uuid()}
                    sx={{
                        ...buttonStyle,
                        bgcolor: datesEqual(date, dayObject?.date) ? 'primary.main' : 'unset',
                        '& p': {
                            color: dayObject?.paddedDate ? 'neutral.400' : datesEqual(date, dayObject?.date) ? 'neutral.50' : 'neutral.900',
                            fontWeight: datesEqual(date, dayObject?.date) ? 600 : 'none'
                        },
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        '&:hover p': {
                            color: 'neutral.50',
                        }
                    }}
                    onClick={() => handleSetDate(dayObject?.date)}
                    >
                    <Typography 
                    key={uuid()}
                    sx={{color: dayObject?.paddedDate ? 'neutral.400' : 'neutral.900'}}
                    >
                    {dayObject?.dayNum}
                    </Typography>
                    </Button>
                ) )
                }
                </Stack>
            ) )
            }
        </Stack>
        </Stack>
    )
}

export default BigCalendar