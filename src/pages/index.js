import { Stack, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Button from "src/components/Button"
import TopNav from "src/components/TopNav"
import getGreeting from "src/utils/getGreeting"
import {AiOutlinePlus} from 'react-icons/ai'
import MiniCalendar from "src/components/MiniCalendar"
import BigCalendar from "src/components/BigCalendar"
import Tasks from "src/components/Tasks"
import { useGlobalContext } from "src/contexts/globalContext"
import fetchData from "src/utils/fetchData"
import HomeContext from "src/contexts/homeContext"
import AddTask from "src/components/AddTask"
import EditTask from "src/components/EditTask"
import ViewTask from "src/components/ViewTask"
import { useBreakpoints } from "src/theme/mediaQuery"
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'


const HomePage = () => {
    const {sm, md, lg} = useBreakpoints()
    const greeting = getGreeting()
    const {date} = useGlobalContext()
    const [tasks, setTasks] = useState([])
    const [totalTasks, setTotalTasks] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [tasksLoading, setTasksLoading] = useState(true)
    const [currentSideView, setCurrentSideView] = useState('calendar')
    const [reloadTasks, setReloadTasks] = useState(false)
    const [openBottomSheet, setOpenBottomSheet] = useState(false)
    const bottomSheetRef = useRef(null)

    const initialTaskDetails = {
        title: '',
        date: {startTime: null, finishTime: null},
        completed: null,
    }
    const [taskDetails, setTaskDetails] = useState(initialTaskDetails)
    console.log('Loading', tasksLoading, '-', 'Tasks Length', tasks.length)

    const handleFetchTasks = async () => {
        setTasksLoading(true)
        const dateDay = new Date(date).getDate()
        const dateMonth = new Date(date).getMonth()
        const dateYear = new Date(date).getFullYear()

        const from = new Date(dateYear, dateMonth, dateDay, 0 , 0 ,0)
        const to = new Date(dateYear, dateMonth, dateDay, 23, 59, 59, 999)
        try{
            const response = await fetchData('/todos', {date: {
                from,
                to
            }, start: ((currentPage-1) * perPage) + 1, perPage})
            setTasks(response?.data)
            setTotalTasks(response?.total)
        }
        catch(err){
            console.log(err.message)
        }
        finally{
            setTasksLoading(false)
        }
    }


    useEffect( () => {
        handleFetchTasks()
    }, [date, reloadTasks, currentPage] )


    useEffect( () => {
        setCurrentPage(1)
    }, [date] )





    useEffect( () => {
        if(currentSideView!=='calendar'){
            setOpenBottomSheet(true)
        }
        else{
            setOpenBottomSheet(false)
        }
    }, [currentSideView] )

    const handleBottomSheetDismiss = () => {
        setOpenBottomSheet(false)
        md && setCurrentSideView('calendar')
    }

    return (
        <HomeContext.Provider
        value={{
            tasksLoading,
            currentSideView,
            setCurrentSideView,
            taskDetails,
            setTaskDetails,
            setReloadTasks,
            currentPage,
            setCurrentPage,
            perPage,
            totalTasks
        }}
        >
        <Stack
        sx={{

        }}
        >
        <TopNav />

        <Stack
        sx={{
            p: sm ? '10px' : '30px',
            gap: '20px'
        }}
        >
            
        <Stack
        direction='row'
        sx={{justifyContent: 'space-between'}}
        >
        <Stack
        sx={{gap: '3px'}}
        >
        <Typography variant="h5"
        sx={{fontSize: '1.7rem'}}
        >
        {greeting + '!'}
        </Typography>
        <Typography
        sx={{color: 'neutral.600', fontSize: '.9rem'}}
        >
        {`You've got some task  to do.`}
        </Typography>
        </Stack>
        {
        !sm &&
        <Button 
        title='Create New Task'
        Icon={AiOutlinePlus}
        IconPlacement="left"
        squareCorners
        border
        onClick={() => setCurrentSideView('add-task')}
        />
        }
        </Stack>

        {
        sm &&
        <Button 
        title='Create New Task'
        Icon={AiOutlinePlus}
        IconPlacement="left"
        squareCorners
        border
        onClick={() => setCurrentSideView('add-task')}

        />
        }

        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between',
            gap: '30px',
            width: '100%'
        }}
        >
        <Stack
        sx={{
            width: md ? '100%' : lg ? '80%' : '100%',
            ...!md && {
                p: '0 20px 0 0',
                borderRight: '1px solid',
                borderColor: 'neutral.300',
            },
            gap: '20px'
        }}
        >
        <MiniCalendar />

        <Tasks 
        tasks={tasks}
        />
        </Stack>
        {
        !md &&
        <>
        {
            currentSideView==='calendar' &&
            <BigCalendar />
        }
        {
            currentSideView==='add-task' &&
            <AddTask />
        }
        {
            currentSideView==='edit-task' &&
            <EditTask />
        }
        {
            currentSideView==='view-task' &&
            <ViewTask />
        }
        </>
        }
        </Stack>
        </Stack>
        </Stack>

        {
        md &&
        <BottomSheet 
        open={openBottomSheet}
        onDismiss={handleBottomSheetDismiss}
        ref={bottomSheetRef}
        >
        {
            currentSideView==='add-task' &&
            <AddTask />
        }
        {
            currentSideView==='edit-task' &&
            <EditTask />
        }
        {
            currentSideView==='view-task' &&
            <ViewTask />
        }
        </BottomSheet>
        }
        </HomeContext.Provider>
    )
}

export default HomePage