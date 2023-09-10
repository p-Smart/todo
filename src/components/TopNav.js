import { Avatar, Box, Divider, Stack, Typography } from "@mui/material"
import {CiSettings} from 'react-icons/ci'
import {IoIosNotificationsOutline, IoMdNotificationsOutline} from 'react-icons/io'



const TopNav = () => {


    return (
        <Box>
        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between',
            p: '10px 30px',
            alignItems: 'center'
        }}
        >
            <Typography
            variant="h5"
            sx={{fontFamily: 'Inter'}}
            >
                ToDo
            </Typography>
            <Stack
            direction='row'
            sx={{
                gap: '10px',
                alignItems: 'center'
            }}
            >
                <CiSettings size={25} />
                <IoIosNotificationsOutline size={25} />
                <Avatar src="/assets/avatars/avatar-jane-rotanson.png" />
            </Stack>
        </Stack>
        <Divider sx={{borderColor: 'neutral.300'}} />
        </Box>
    )
}

export default TopNav