import { Stack, Typography } from "@mui/material"
import { neutral, primary } from "src/theme/create-palette"
import {FcSearch} from 'react-icons/fc'
import{ TbBulbFilled} from 'react-icons/tb'
import {FaLaptopCode, FaSearch} from 'react-icons/fa'
import {BiSolidBookContent, BiSolidLike} from 'react-icons/bi'
import {MdDesignServices} from 'react-icons/md'
import Phase from "src/components/WDLC/Phase"
import { v4 as uuid } from 'uuid'



const WDLCPage = () => {

    const phases = [
        {
            title: 'Research and Analysis',
            Icon: FaSearch,
            IconColor: '#7DF9FF'
        },
        {
            title: 'Planning and Strategy',
            Icon: TbBulbFilled,
            IconColor: '#FFD700'
        },
        {
            title: 'Designing',
            Icon: MdDesignServices,
            IconColor: '#00A86B'
        },
        {
            title: 'Content Creation',
            Icon: BiSolidBookContent,
            IconColor: '#FF5733'
        },
        {
            title: 'Development',
            Icon: FaLaptopCode,
            IconColor: '#008080'
        },
        {
            title: 'Testing and Quality Assurance',
            Icon: BiSolidLike,
            IconColor: '#006400'
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
                A Comprehensive Guide To The 7 Phases of 
                </span>
                <span 
                style={{display: 'block', color: primary.main}}
                >
                Web Development Life Cycle
                </span>
            </Typography>

            <Stack
            direction='row'
            >
            {
            phases.map( ({title, Icon, IconColor}, k) => (
                <Phase
                key={uuid()}
                startPhase={k===0}
                endPhase={k===phases.length-1}
                topTitle={!(k%2)}
                bottomTitle={k%2 !== 0}
                title={title}
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