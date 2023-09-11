import { Box, Stack, TextField, Typography } from "@mui/material"
import { useGlobalContext } from "src/contexts/globalContext"
import { v4 as uuid } from 'uuid'
import {GrClose} from 'react-icons/gr'
import { neutral } from "src/theme/create-palette"
import { useHomeContext } from "src/contexts/homeContext"
import DatePicker from "../DatePicker"
import Button from "src/components/Button"
import { formatTime } from "src/utils/dateFormats"
import { useEffect, useState } from "react"
import fetchData from "src/utils/fetchData"
import { useBreakpoints } from "src/theme/mediaQuery"
import { BsArrowLeft } from "react-icons/bs"

const EditTask = () => {
    const {md} = useBreakpoints()

    const {date, setDate, toast} = useGlobalContext()

    const {currentSideView, setCurrentSideView, taskDetails, setTaskDetails, setReloadTasks} = useHomeContext()

    const startTime =  taskDetails?.date?.startTime ? formatTime(taskDetails?.date?.startTime) : null
    const finishTime = taskDetails?.date?.finishTime ? formatTime(taskDetails?.date?.finishTime) : null

    const [initialTaskDetails, setInitialTaskDetails] = useState(taskDetails)

    const [loading, setLoading] = useState(false)

    const handleEditTask = async () => {
        setLoading(true)
        try{
            const {message} = await fetchData('/editTodo', {
                todoId: taskDetails?.id,
                todoContent: taskDetails?.title,
                startTime: taskDetails?.date?.startTime,
                finishTime: taskDetails?.date?.finishTime
            })
            toast.success(message)
            setReloadTasks( (prevVal) => !prevVal )
        }
        catch(err){
            console.log(err.message)
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }
    

    const handleCloseEditTask = () => {
        setCurrentSideView('view-task')
        setTaskDetails(initialTaskDetails)
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
            }
        }}
        >
        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between'
        }}
        >
            <Typography
            variant="h6"
            sx={{fontWeight: 600}}
            >
                Edit Task
            </Typography>
            {
            !md ?
            <GrClose 
            size={20}
            color={neutral[600]}
            style={{cursor: 'pointer'}}
            onClick={() => setCurrentSideView('view-task')}
            /> :
            <BsArrowLeft
            size={30}
            color={neutral[900]}
            style={{cursor: 'pointer'}}
            onClick={() => setCurrentSideView('view-task')}
            />
            }
        </Stack>

        <TextField
        multiline
        value={taskDetails?.title}
        onChange={(e) => setTaskDetails( (prevVal) => ({...prevVal, title: e.target.value}) )}
        rows={5}
        sx={{
            '& input': {
                p: '10px 15px',
                fontWeight: 600
            }
        }}
        />

        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between',
            gap: '20px'
        }}
        >
        <DatePicker 
        forDate
        date={taskDetails?.date?.startTime}
        setDate={ (date) => setTaskDetails( (prevVal) => {
            const startTime = new Date(prevVal?.date?.startTime)
            const finishTime = new Date(prevVal?.date?.finishTime)

            const [newYear, newMonth, newDay] = [new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate()]
            startTime.setFullYear(newYear)
            startTime.setMonth(newMonth)
            startTime.setDate(newDay)

            finishTime.setFullYear(newYear)
            finishTime.setMonth(newMonth)
            finishTime.setDate(newDay)


            return {
                ...prevVal,
                date: {
                    startTime,
                    finishTime
                }
            }
        } ) }
        />
        <DatePicker
        forTime
        date={taskDetails?.date?.startTime}
        setDate={ (date) => setTaskDetails( (prevVal) => {
            const startTime = new Date(prevVal?.date?.startTime)
            const finishTime = new Date(prevVal?.date?.finishTime)

            const [newHours, newMins, newSecs] = [new Date(date).getHours(), new Date(date).getMinutes(), new Date(date).getSeconds()]
            startTime.setHours(newHours)
            startTime.setMinutes(newMins)
            startTime.setSeconds(newSecs)

            return {
                ...prevVal,
                date: {
                    startTime,
                    finishTime
                }
            }
        } ) }
        />
        <DatePicker 
        forTime
        date={taskDetails?.date?.finishTime}
        setDate={ (date) => setTaskDetails( (prevVal) => {
            const startTime = new Date(prevVal?.date?.startTime)
            const finishTime = new Date(prevVal?.date?.finishTime)

            const [newHours, newMins, newSecs] = [new Date(date).getHours(), new Date(date).getMinutes(), new Date(date).getSeconds()]
            finishTime.setHours(newHours)
            finishTime.setMinutes(newMins)
            finishTime.setSeconds(newSecs)

            return {
                ...prevVal,
                date: {
                    startTime,
                    finishTime
                }
            }
        } ) }
        />
        </Stack>

        <Stack
        direction='row'
        sx={{
            gap: '10px'
        }}
        >
        <Button
        title='Cancel'
        fullWidth
        squareCorners
        border={!loading}
        variant="outlined"
        sx={{textTransform: 'unset', borderColor: 'neutral.300'}}
        onClick={handleCloseEditTask}
        disabled={loading}
        />
        

        <Button
        title='Save'
        fullWidth
        squareCorners
        border={!loading}
        sx={{textTransform: 'unset'}}
        loading={loading}
        onClick={handleEditTask}
        />
        </Stack>
        </Stack>
    )
}

export default EditTask