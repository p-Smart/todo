import { Stack, Typography } from "@mui/material"
import { neutral, primary } from "src/theme/create-palette"
import {FcSearch} from 'react-icons/fc'
import{ TbBulbFilled} from 'react-icons/tb'
import {FaLaptopCode, FaSearch} from 'react-icons/fa'
import {BiSolidBookContent, BiSolidLike} from 'react-icons/bi'
import {MdDesignServices} from 'react-icons/md'
import Phase from "src/components/WDLC/Phase"
import { v4 as uuid } from 'uuid'
import { BsFillRocketTakeoffFill } from "react-icons/bs"



const WDLCPage = () => {

    const phases = [
        {
            title: 'Research and Analysis',
            duration: 7,
            Icon: FaSearch,
            IconColor: '#7DF9FF'
        },
        {
            title: 'Planning and Strategy',
            duration: 10,
            Icon: TbBulbFilled,
            IconColor: '#FFD700'
        },
        {
            title: 'Designing \n UI/UX (Figma)',
            duration: 20,
            Icon: MdDesignServices,
            IconColor: '#00A86B'
        },
        {
            title: 'Content Creation',
            duration: 30,
            Icon: BiSolidBookContent,
            IconColor: '#FF5733'
        },
        {
            title: 'Development (WordPress CMS)',
            duration: 60,
            Icon: FaLaptopCode,
            IconColor: '#008080'
        },
        {
            title: 'Testing and Quality Assurance',
            duration: 14,
            Icon: BiSolidLike,
            IconColor: '#006400'
        },
        {
            title: 'Deployment',
            duration: '141 Days (4Months 21Days)',
            Icon: BsFillRocketTakeoffFill,
            IconColor: '#FFA500'
        },
    ]




    return (
        <Stack
        sx={{
            width: '100%',
            height: '100vh',
            pt: '50px',
            alignItems: 'center',
            gap: '200px',
            bgcolor: 'neutral.900',
        }}
        >
            <Typography 
            variant="h4"
            sx={{
                textAlign: 'center'
            }}
            >
                <span
                style={{color: neutral[50]}}
                >
                A Comprehensive
                </span>
                <span 
                style={{display: 'block', color: primary.main}}
                >
                ARSC Web Development Phases
                </span>
            </Typography>

            <Stack
            direction='row'
            >
            {
            phases.map( ({title, Icon, IconColor, duration}, k) => (
                <Phase
                key={uuid()}
                startPhase={k===0}
                endPhase={k===phases.length-1}
                topTitle={!(k%2)}
                bottomTitle={k%2 !== 0}
                title={title}
                duration={duration}
                Icon={Icon}
                IconColor={IconColor}
                />
            ) )
            }
            </Stack>
        </Stack>
    )
}


export default WDLCPage