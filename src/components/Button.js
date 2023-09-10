import { Button as MUIButton, CircularProgress, Stack, Typography } from "@mui/material"



const Button = ({
        title,
        children,
        Icon,
        IconColor,
        IconSize,
        IconPlacement='right',
        loading,
        loadingText, 
        sx, 
        variant='contained', 
        roundedCorners=true,
        squareCorners,
        border,
        ...props
    }) => {

    return (
        <MUIButton
        direction='row'
        disabled={loading}
        sx={{
            display: 'flex',
            ...variant!=='normal' && {
                color: variant==='outlined' ? "neutral.900" : "neutral.50",
                bgcolor: variant==='outlined' ? 'neutral.50' : 'primary.main',
                '&:hover': {
                    bgcolor: variant==='outlined' ? 'neutral.50' : 'primary.main',
                },
                gap: '10px',
                p: '7px 10px',
                borderRadius: squareCorners ? '10px' : '20px',
                alignItems: 'center',
                cursor: !loading ? 'pointer' : 'not-allowed',
                ...loading && variant !== 'outlined' && {bgcolor: 'neutral.500'},
                alignSelf: 'flex-end',
                ...variant==='outlined' && {border: '1.6px solid', borderColor: 'primary.main'},
                '&.Mui-disabled': {
                bgcolor: variant==='outlined' ? 'transparent' : 'neutral.500',
                color: 'neutral.400',
                ...border && {border: '1px solid', borderColor: 'primary.main'},
            },
            },
            ...sx,
        }}
        {...props}
        >
            {!loading && IconPlacement==='left' && Icon && <Icon size={20} />}
            {
                !loading ?
                (
                    title ?
                <Typography sx={{fontWeight: 600, fontSize: '.85rem'}}>
                {title}
                </Typography> :
                    children
                ) :
                <Stack direction='row' 
                sx={{gap: '5px'}}
                >
                <CircularProgress sx={{color: variant==='outlined' ? "neutral.900" : "neutral.50"}} size={25} />
                {
                    loadingText &&
                    <Typography>
                        {loadingText}
                    </Typography>
                }
                </Stack>
            }
            {!loading && IconPlacement==='right' && Icon && 
            <Icon 
            size={IconSize || 20} 
            color={IconColor} 
            />}
        </MUIButton>
    )

}

export default Button