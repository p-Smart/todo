import { Stack } from "@mui/material"
import { useState } from "react"
import {BsCheckLg} from 'react-icons/bs'
import { primary } from "src/theme/create-palette"


const CheckBox = ({check, setCheck, onChange}) => {

    const handleToggle = (e) => {
        e.stopPropagation()
        setCheck(!check)
        onChange && onChange(!check)
    }

    return (
        <Stack
        sx={{
            width: '18px',
            height: '18px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgb(0,0,0,.125)',
            bgcolor: check ? '#F9F5FF' : 'neutral.50',
            border: '.5px solid',
            borderColor: check ? 'primary.main' : 'neutral.300',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        }}
        onClick={handleToggle}
        >
        {
            check &&
            <BsCheckLg 
            size={15} 
            color={primary.main}
            />
        }
        </Stack>
    )
}

export default CheckBox