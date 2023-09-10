export const textFieldStyle = {
    width: 'fit-content',
    '& input': {
        p: '10px 15px',
        fontWeight: 600
    }
}

export const buttonStyle = {
    bgcolor: 'neutral.50',
    color: 'neutral.900',
    width: '35px',
    height: '35px',
    minWidth: 'unset',
    alignItems: 'center',
    borderRadius: '50%',
    '&:hover': {
        bgcolor: 'primary.main',
        boxShadow: '0 0 10px rgb(0,0,0,.125)',
        border: '1px solid',
        borderColor: '#D0D5DD',
        color: 'neutral.50',
    },
}