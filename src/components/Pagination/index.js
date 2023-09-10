import { Stack } from "@mui/material"
import Button from "../Button"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'
import { useBreakpoints } from "src/theme/mediaQuery"



const Pagination = ({totalItems, page, setPage, perPage}) => {
    const {sm, md} = useBreakpoints()

    const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / perPage))

    useEffect(() => {
        setTotalPages(Math.ceil(totalItems / perPage))
    }, [totalItems])

    const handlePageChange = (page) => {
        setPage(page)
    }

    return (
        <Stack
        direction='row'
        sx={{
            justifyContent: 'space-between',
            borderTop: '1px solid',
            borderColor: 'neutral.300',
            py: '10px',
            mt: '20px',
            alignItems: 'center'
        }}
        >
            <Button 
            title='Previous'
            Icon={BsArrowLeft}
            IconPlacement="left"
            variant="outlined"
            sx={{textTransform: 'unset', border: 'none', p: 0}}
            disabled={page===1}
            onClick={() => setPage( (prevVal) => prevVal-1 )}
            />


            <Stack
            direction='row'
            sx={{
                gap: sm ? '20px' : '30px',
                alignItems: 'center'
            }}
            >
            {
            Array.from({length: totalPages}).map( (_, k) => (
                <Button
                key={uuid()}
                title={k+1}
                variant="outlined"
                sx={{
                    border: 'none',
                    bgcolor: 'transparent',
                    minWidth: 'unset',
                    p: 0,
                    '& p': {
                        fontWeight: page===k+1 ? 600 : 400,
                        fontSize: !sm ?  '1.1rem' : 'unset'
                    }
                }}
                onClick={() => handlePageChange(k+1)}
                />  
            ) )
            }
            </Stack>


            <Button 
            title='Next'
            Icon={BsArrowRight}
            IconPlacement="right"
            variant="outlined"
            sx={{textTransform: 'unset', border: 'none', p: 0}}
            disabled={page===totalPages}
            onClick={() => setPage( (prevVal) => prevVal+1 )}
            />
        </Stack>
    )
}

export default Pagination