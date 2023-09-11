import { Box, Stack, TextField, Typography } from "@mui/material"
import { useGlobalContext } from "src/contexts/globalContext"
import { v4 as uuid } from 'uuid'
import {GrClose} from 'react-icons/gr'
import { neutral, primary } from "src/theme/create-palette"
import { useHomeContext } from "src/contexts/homeContext"
import DatePicker from "../DatePicker"
import Button from "src/components/Button"
import { FiCalendar, FiClock } from "react-icons/fi"
import { dayMonthYear, dayMonthYear2, formatTime } from "src/utils/dateFormats"
import { useState } from "react"
import fetchData from "src/utils/fetchData"
import { useBreakpoints } from "src/theme/mediaQuery"
import { BsArrowLeft } from "react-icons/bs"

const ViewTask = () => {


    const {md} = useBreakpoints()
    const {date, setDate, toast} = useGlobalContext()

    const {currentSideView, setCurrentSideView, taskDetails, setTaskDetails, setReloadTasks} = useHomeContext()

    const startTime =  taskDetails?.date?.startTime ? formatTime(taskDetails?.date?.startTime) : null
    const finishTime = taskDetails?.date?.finishTime ? formatTime(taskDetails?.date?.finishTime) : null

    const [loading, setLoading] = useState(false)


    const handleDeleteTask = async () => {
        setLoading(true)
        try{
            const {message} = await fetchData('/deleteTodo', {
                todoId: taskDetails?.id,
            })
            toast.success(message)
            setReloadTasks( (prevVal) => !prevVal )
            setCurrentSideView('calendar')
        }
        catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    

    return (
        <Stack
        sx={{
            width: !md ? 'max-content' : 'unset',
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: md ? 'transparent' : 'neutral.50',
            p: '20px',
            gap: '20px',
            height: 'fit-content',
            '& p, input': {
                fontSize: '.85rem'
            },
            ...!md && {
                minWidth: '280px'
            }
        }}
        >
        <Stack
        sx={{
            alignSelf: 'flex-end'
        }}
        >
            {
            !md ?
            <GrClose 
            size={20}
            color={neutral[600]}
            style={{cursor: 'pointer'}}
            onClick={() => setCurrentSideView('calendar')}
            /> :
            <BsArrowLeft
            size={30}
            color={neutral[900]}
            style={{cursor: 'pointer'}}
            onClick={() => setCurrentSideView('calendar')}
            />
            }
        </Stack>

        <Typography
        variant="h6"
        >
            {taskDetails?.title}
        </Typography>

        <Stack
        sx={{
            gap: '10px'
        }}
        >
        <Stack 
        direction='row'
        sx={{gap: '10px'}}>
        <FiCalendar
        color={primary.main}
        size={20}
        />
        <Typography sx={{fontWeight: 600}}>
            {dayMonthYear2(taskDetails?.date?.startTime)}
        </Typography>
        </Stack>

        <Stack 
        direction='row'
        sx={{gap: '10px'}}
        >
        <FiClock
        color={primary.main}
        size={20}
        />
        <Typography sx={{fontWeight: 600}}>
        { finishTime ? `${startTime} - ${finishTime}` : startTime }
        </Typography>
        </Stack>
        </Stack>

        <Stack
        direction='row'
        sx={{
            gap: '10px'
        }}
        >
        <Button
        title='Delete'
        fullWidth
        squareCorners
        border={!loading}
        variant="outlined"
        sx={{textTransform: 'unset', borderColor: 'neutral.300'}}
        onClick={handleDeleteTask}
        loading={loading}
        />
        

        <Button
        title='Edit'
        fullWidth
        squareCorners
        border={!loading}
        sx={{textTransform: 'unset'}}
        onClick={() => setCurrentSideView('edit-task')}
        disabled={loading}
        />
        </Stack>
        </Stack>
    )
}

export default ViewTask