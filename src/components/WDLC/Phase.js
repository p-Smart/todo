import { Stack, Typography } from "@mui/material"
import DottedLine from "./DottedLine"



const Phase = ({title, Icon, IconColor, topTitle, bottomTitle, startPhase, endPhase, duration}) => {

    return (
        <Stack
        direction='row'
        sx={{
            alignItems: 'center'
        }}
        >
            <HozBar 
            start={startPhase} 
            duration={duration}
            />
            <Stack
            sx={{
                width: '70px',
                height: '70px',
                border: '4px solid',
                borderRadius: '50%',
                borderColor: 'primary.main',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
            >
            <Icon 
            size={40} 
            color={IconColor}
            />
            <DottedLine
            topStart={topTitle} 
            bottomStart={bottomTitle}
            title={title}
            />
            </Stack>
            <HozBar 
            end={endPhase} 
            duration={duration}
            rightBar 
            />
        </Stack>
    )
}


export default Phase


const HozBar = ({start, end, rightBar, duration}) => {


    return (
        <Stack 
        sx={{
            width: '40px',
            height: '12px',
            bgcolor: 'primary.main',
            ...start && {borderRadius: '10px 0 0 10px'},
            ...end && {borderRadius: '0 10px 10px 0'},
            position: 'relative'
        }}
        >
            {
            rightBar &&
            <Typography
            variant="h6"
            sx={{
                position: 'absolute',
                color: 'neutral.200',
                fontStyle: 'italic',
                fontSize: '.9rem',
                bottom: '18px',
                whiteSpace: 'nowrap',
                left: '50%'
            }}
            >
                {!end ? `${duration} Days` : duration}
            </Typography>
            }
        </Stack>
    )
}