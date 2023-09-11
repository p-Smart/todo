import { Fade, Popper, Stack, Typography } from "@mui/material"
import { DateCalendar, LocalizationProvider, TimeClock } from "@mui/x-date-pickers"
import {FiCalendar, FiClock} from 'react-icons/fi'
import Button from "src/components/Button"
import { neutral } from "src/theme/create-palette"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useRef, useState } from "react"
import dayjs from 'dayjs'
import { formatTime, formatTime2, getDateDescription } from "src/utils/dateFormats"



const DatePicker = ({forDate, forTime, date, setDate}) => {

    const popperRef = useRef(null)
    const pickerRef = useRef(null)
    const [openPicker, setOpenPicker] = useState(false)


    const bodyHidePopup = (e) => {
        if (
            !pickerRef.current ||
            !popperRef.current ||
            (!pickerRef.current.contains(e.target) &&
            !popperRef.current.contains(e.target))
          ) {
            setOpenPicker(false)
          }
    }
    useEffect( () => {
        document.body.addEventListener('click', bodyHidePopup)
        return ( () => {
            document.body.removeEventListener('click', bodyHidePopup)
        } )
    }, [] )

    return (
        <div ref={pickerRef}>
        <Button
        sx={{
            display: 'flex',
            p: '7px 10px',
            gap: '10px',
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: 'neutral.50',
            border: '1px solid',
            borderColor: 'neutral.600',
            textTransform: 'unset',
            '&:hover': {
                bgcolor: 'neutral.50'
            }
        }}
        onClick={() => setOpenPicker(!openPicker)}
        >
        {
            forDate &&
            <FiCalendar
            color={neutral[900]} 
            size={20}
            />
        }
        {
            forTime &&
            <FiClock 
            color={neutral[900]} 
            size={20}
            />
        }

        <Typography
        sx={{
            color: 'neutral.600',
            fontWeight: 600
        }}
        >
            {
                forDate &&
                getDateDescription(date)
            }
            {
                forTime && 
                formatTime2(date)
            }
        </Typography>

        <Popper
        ref={popperRef}
        open={openPicker}
        anchorEl={pickerRef.current}
        placement="bottom"
        sx={{
            zIndex: 999,
        }}
        onClick={(e) => e.stopPropagation()}
        >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {
        forDate &&
        <DateCalendar 
        sx={{
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: 'neutral.50',
        }}
        value={dayjs(date ? new Date(date) : new Date())}
        onChange={(date) => setDate(new Date(date))}
        />
        }

        {
        forTime &&
        <TimeClock
        ampmInClock
        value={dayjs(date ? new Date(date) : new Date())}
        sx={{
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: 'neutral.50',
        }}
        onChange={(date) => setDate(new Date(date))}
        />
        }
        </LocalizationProvider>
        </Popper>
        </Button>
        </div>
    )
}

export default DatePicker