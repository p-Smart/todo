import { Stack, Typography } from "@mui/material"


const formatTitleWithNewlines = (text) => text.split('\n').map((line, index) => <span key={index}>{line}{index < text.split('\n').length - 1 && <br />}</span>)


const DottedLine = ({topStart, bottomStart, title}) => {


    return (
        <Stack
        sx={{
            alignItems: 'center',
            position: 'absolute',
            left: '45%',
            ...topStart && {bottom: '100%'},
            ...bottomStart && {top: '100%'}
        }}
        >
        {
        topStart &&
        <Circle 
        title={title} 
        textLeft={bottomStart}
        textRight={topStart}
        />
        }
        <Stack
        sx={{
            height: '100px',
            borderLeft: '2px dashed',
            borderColor: 'primary.main'
        }}
        />
        {
        bottomStart &&
        <Circle 
        title={title}
        textLeft={bottomStart}
        textRight={topStart}
        />
        }
        </Stack>
    )
}

export default DottedLine


const Circle = ({title, textLeft, textRight}) => {
    

    return (
        <Stack 
        sx={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            bgcolor: 'primary.main',
            position: 'relative'
        }}
        >
        <Typography
        variant="h6"
        sx={{
            position: 'absolute',
            width: '150px',
            color: 'neutral.50',
            ...textRight && {left: '20px'},
            ...textLeft && {right: '20px', textAlign: 'right'},
            whiteSpace: 'nowrap'
        }}
        >
            {formatTitleWithNewlines(title)}
        </Typography>
        </Stack>
    )
}