import { Skeleton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { v4 as uuid } from 'uuid'
import CheckBox from "./CheckBox"
import { dayMonthYear, formatTime, getDateDescription } from "src/utils/dateFormats"
import { useHomeContext } from "src/contexts/homeContext"
import { useGlobalContext } from "src/contexts/globalContext"
import Button from "./Button"
import fetchData from "src/utils/fetchData"
import { neutral } from "src/theme/create-palette"
import Pagination from "./Pagination"
import { useBreakpoints } from "src/theme/mediaQuery"



const Tasks = ({tasks}) => {
    const {tasksLoading, 
        totalTasks,        
        currentPage,
        setCurrentPage,
        perPage
    } = useHomeContext()

    return (
        <Stack
        sx={{
            gap: '10px'
        }}
        >
        <Typography
        variant="h6"
        >
            My Tasks
        </Typography>

        <Stack
        sx={{
            gap: '10px'
        }}
        >
        {
            !tasksLoading ?
            (tasks.length !== 0 ? 
            tasks.map(({title, date, completed, _id}) => (
                <Task 
                key={uuid()}
                title={title}
                date={date}
                completed={completed}
                id={_id}
                />
            )) :
            <Task noTasks /> ) : 
            Array.from({length: 3}).map( () => (
                <Task 
                key={uuid()}
                loading
                />
            ) )
        }
        </Stack>


        {
        tasks.length!==0 &&
        <Pagination 
        totalItems={totalTasks}
        page={currentPage}
        setPage={setCurrentPage}
        perPage={perPage}
        />
        }
        </Stack>
    )
}

export default Tasks





const Task = ({title, date, completed, id, loading, noTasks}) => {
    const {sm} = useBreakpoints()
    const startTime = date?.startTime ? formatTime(date.startTime) : null
    const finishTime = date?.finishTime ? formatTime(date.finishTime) : null

    const [completedSwitch, setCompletedSwitch] = useState(completed)

    const {date: globalDate, toast} = useGlobalContext()
    const {currentSideView, setCurrentSideView, taskDetails, setTaskDetails, setReloadTasks} = useHomeContext()

    const handleTaskClick = () => {
        setTaskDetails({
            title,
            date,
            completed,
            id
        })
        setCurrentSideView('view-task')
    }


    const handleChangeCompleted = async (complete) => {
        try{
            const {message} = await fetchData('/editTodo', {
                todoId: id,
                todoContent: title,
                startTime: date?.startTime,
                finishTime: date?.finishTime,
                completed: complete
            })
            toast.success(message, {position: {horizontal: 'left', vertical: 'top'}})
            setReloadTasks( (prevVal) => !prevVal )
            setCurrentSideView('calendar')
        }
        catch(err){
            console.log(err.message)
            toast.error(err.message, {position: {horizontal: 'left', vertical: 'top'}})
        }
        finally{
        }
    }



    return (
        <Button
        onClick={() => !noTasks && handleTaskClick()}
        sx={{
            display: 'flex',
            width: '100%',
            borderRadius: 0,
            p: sm ? '2px 4px' : '10px 20px',
            bgcolor: (currentSideView==='view-task' || currentSideView==='edit-task') && taskDetails?.id===id ? 'primary.light' : 'primary.lightest',
            borderBottom: '1px solid',
            borderColor: 'neutral.300',
            justifyContent: 'space-between',
            alignItems: 'center',
            textTransform: 'unset',
            ...noTasks && {justifyContent: 'center'},

            textAlign: 'left',
            '& p, h6': {
                color: 'neutral.900',
            },
            '&:hover p,&:hover  h6': {
                color: 'neutral.50'
            }
        }}
        >
        {
        !loading && noTasks ? 
        <Typography variant="h6">
            You have no task scheduled for {dayMonthYear(globalDate)}
        </Typography> :

        <>
        <Stack
        direction='row'
        sx={{
            gap: '10px',
            alignItems: 'center',
            width: '100%'
        }}
        >
        {
            !loading ?
            <CheckBox
            check={completedSwitch}
            setCheck={setCompletedSwitch}
            onChange={handleChangeCompleted}
            /> :
            <Skeleton 
            width={20}
            height={20}
            />
        }

        <Stack
        sx={{
            gap: '1px',
            width: '100%'
        }}
        >
            <Typography 
            variant="h6" 
            sx={{
                fontSize: '.95rem',
                ...completedSwitch && {
                    color: `${neutral[400]} !important`,
                    textDecoration: 'line-through'
                }
            }}
            >
            {!loading ? title : 
            <Skeleton 
            width={sm ? 150 : 300}
            height={15} />
            }
            </Typography>
            <Stack
            direction='row'
            sx={{justifyContent: 'space-between'}}
            >
            <Typography
            sx={{
                fontSize: '.9rem',
                color: 'neutral.600',
                ...completedSwitch && {
                    color: `${neutral[400]} !important`,
                    textDecoration: 'line-through'
                }
            }}
            >
            {!loading ?
                ( finishTime ? `${startTime} - ${finishTime}` : startTime ) :
            <Skeleton 
            width={sm ? 50 : 100}
            height={15} 
            />
            }
            </Typography>

            {
            sm &&
            <DateDescription 
            date={globalDate}
            loading={loading}
            />
            }
            </Stack>
        </Stack>
        </Stack>

        {
        !sm &&
        <DateDescription 
        date={globalDate}
        loading={loading}
        />
        }
        </>
        }
        </Button>
    )
}



const DateDescription = ({date, loading}) => {
    const {sm} = useBreakpoints()

    return (
        <Typography
        sx={{
            color: 'neutral.700',
            alignSelf: 'flex-end',
            whiteSpace: 'nowrap',
            ...sm && {
                fontSize: '.8rem'
            }
        }}
        >
        {!loading ?
            ( getDateDescription(date) ) :
        <Skeleton 
        width={sm ? 20 : 50}
        height={15} 
        />
        }
        </Typography>
    )
}