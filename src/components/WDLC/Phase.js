import { Stack, Typography } from "@mui/material"
import DottedLine from "./DottedLine"



const Phase = ({title, Icon, IconColor, topTitle, bottomTitle, startPhase, endPhase}) => {

    return (
        <Stack
        direction='row'
        sx={{
            alignItems: 'center'
        }}
        >
            <HozBar start={startPhase} />
            <Stack
            sx={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: '4px solid',
                borderColor: 'primary.main',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
            >
            <DottedLine
            topStart={topTitle} 
            bottomStart={bottomTitle}
            title={title}
            />
            <Icon 
            size={40} 
            color={IconColor}
            />
            </Stack>
            <HozBar end={endPhase} />
        </Stack>
    )
}


export default Phase


const HozBar = ({start, end}) => {


    return (
        <Stack 
        sx={{
            width: '50px',
            height: '12px',
            bgcolor: 'primary.main',
            ...start && {borderRadius: '10px 0 0 10px'},
            ...end && {borderRadius: '0 10px 10px 0'}
        }}
        />
    )
}