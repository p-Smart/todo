import { Box, Stack, TextField, Typography } from "@mui/material"
import { useGlobalContext } from "src/contexts/globalContext"
import { v4 as uuid } from 'uuid'
import {GrClose} from 'react-icons/gr'
import { neutral } from "src/theme/create-palette"
import { useHomeContext } from "src/contexts/homeContext"
import DatePicker from "../DatePicker"
import Button from "src/components/Button"
import { useState } from "react"
import fetchData from "src/utils/fetchData"
import { useBreakpoints } from "src/theme/mediaQuery"
import { BsArrowLeft } from "react-icons/bs"

const AddTask = () => {

    const {md} = useBreakpoints()
    const {date, setDate, toast} = useGlobalContext()
    const {currentSideView, setCurrentSideView, setReloadTasks} = useHomeContext()

    const [loading, setLoading] = useState(false)

    const currentDate = [new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0]
    const initialTaskDetails = {
        title: '',
        date: {startTime: new Date(...currentDate), finishTime: new Date(...currentDate)}
    }
    const [taskDetails, setTaskDetails] = useState(initialTaskDetails)


    const handleAddTask = async () => {
        setLoading(true)
        try{
            const {message} = await fetchData('/addTodo', {
                todoContent: taskDetails?.title,
                startTime: taskDetails?.date?.startTime, 
                finishTime: taskDetails?.date?.finishTime, 
                completed: false
            })
            toast.success(message)
            setTaskDetails(initialTaskDetails)
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
    

    return (
        <Stack
        sx={{
            width: !md ? 'max-content' : 'unset',
            boxShadow: '0 0 10px rgb(0,0,0,.225)',
            borderRadius: '8px',
            bgcolor: md ? 'transparent' : 'neutral.50',
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
            justifyContent: 'space-between'
        }}
        >
            <Typography
            variant="h6"
            sx={{fontWeight: 600}}
            >
                Add Task
            </Typography>
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

        <TextField 
        multiline
        value={taskDetails?.title}
        rows={5}
        sx={{
            '& input': {
                p: '10px 15px',
                fontWeight: 600
            }
        }}
        onChange={(e) => setTaskDetails( (prevVal) => ({...prevVal, title: e.target.value}) )}
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
        onClick={() => setCurrentSideView('calendar')}
        disabled={loading}
        />
        

        <Button
        title='Add'
        fullWidth
        squareCorners
        border={!loading}
        sx={{textTransform: 'unset'}}
        onClick={handleAddTask}
        loading={loading}
        />
        </Stack>
        </Stack>
    )
}

export default AddTask