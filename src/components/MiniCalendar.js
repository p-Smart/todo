import { Stack, Typography } from "@mui/material"
import Button from "./Button";
import { useGlobalContext } from "src/contexts/globalContext";
import { longMonthYear } from "src/utils/dateFormats";
import { useBreakpoints } from "src/theme/mediaQuery";



const MiniCalendar = () => {
    const {date} = useGlobalContext()
    const {lg, md, sm, xs} = useBreakpoints()

    const generateMiniCalendar = (length) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const days = []
      
        const previousDay = new Date(date)
        previousDay.setDate(previousDay.getDate() - 1)
      
        for (let i = 0; i < length; i++) {
          const day = new Date(previousDay)
          day.setDate(previousDay.getDate() + i)
      
          const dayText = daysOfWeek[day.getDay()]
          const dayNumber = day.getDate()
      
          days.push({ dayText, dayNumber, date: day })
        }
      
        return days;
    }
    const miniCalendarDays = generateMiniCalendar(sm ? 5 : md ? 8 : lg ? 8 : 14)


    return (
        <Stack
        sx={{
            gap: '10px'
        }}
        >
            <Typography
            variant="h6"
            >
                {longMonthYear(date)}
            </Typography>

            <Stack
            direction='row'
            sx={{
                gap: '10px'
            }}
            >
            {
                miniCalendarDays.map( ({dayText, dayNumber, date}, k) => (
                    <DayCard 
                    key={k}
                    dayText={dayText}
                    dayNumber={dayNumber}
                    date={date}
                    current={k===1}
                    />
                ) )
            }
            </Stack>
        </Stack>
    )
}

const DayCard = ({dayText, dayNumber, date, current}) => {
    const {setDate} = useGlobalContext()

    return (
        <Button
        sx={{
            gap: '10px',
            bgcolor: current ? 'primary.main' : 'neutral.50',
            p: '5px 15px',
            boxShadow: '0 0 10px rgb(0,0,0,.125)',
            border: '1px solid',
            borderColor: '#D0D5DD',
            borderRadius: '8px',
            alignSelf: 'flex-start',
            textTransform: 'unset',
            '&:hover p': {
                color: 'neutral.50'
            }
        }}
        onClick={() => setDate(date)}
        >
        <Typography
        sx={{
            fontWeight: 600,
            color: !current ? 'neutral.800' : 'neutral.50',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            <span>{dayText}</span>
            <span>{dayNumber}</span>
        </Typography>
        </Button>
    )
}

export default MiniCalendar