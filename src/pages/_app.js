import Head from 'next/head';
import './../styles/global.css'
import './../styles/media.css'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from 'src/theme';
import GlobalContext from 'src/contexts/globalContext';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';


const App = ({ Component, pageProps }) => {

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] =  useState('Success Message')
  const [snackbarType, setSnackbarType] = useState('success')
  const initialSnackbarOptions = {
    autohide: 3000,
    position: {
      horizontal: 'right',
      vertical: 'top'
    }
  }
  const [snackbarOptions, setSnackbarOptions] = useState(initialSnackbarOptions)

  const toast = {
    success: (message, options=initialSnackbarOptions) => {
      setSnackbarType('success')
      setSnackbarMessage(message)
      setSnackbarOptions( (prevVal) => ({...prevVal, ...options}) )
      setOpenSnackbar(true)
    },
    error: (message, options=initialSnackbarOptions) => {
      setSnackbarType('error')
      setSnackbarMessage(message)
      setSnackbarOptions( (prevVal) => ({...prevVal, ...options}) )
      setOpenSnackbar(true)
    },
    warning: (message, options=initialSnackbarOptions) => {
      setSnackbarType('warning')
      setSnackbarMessage(message)
      setSnackbarOptions( (prevVal) => ({...prevVal, ...options}) )
      setOpenSnackbar(true)
    }
  }

  const theme = createTheme();
  const [date, setDate] = useState(new Date())

  return (
    <>
    <Head>
    <title>ToDo</title>
    </Head>
    <ThemeProvider theme={theme}>
    <GlobalContext.Provider 
    value={{
      date,
      setDate,
      toast
    }}
    >
      <Component {...pageProps} />

      <Snackbar 
      open={openSnackbar}
      onClose={() => setOpenSnackbar(false)}
      autoHideDuration={snackbarOptions.autohide}
      anchorOrigin={{vertical: snackbarOptions.position.vertical, horizontal: snackbarOptions.position.horizontal}}
      >
        <Alert
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarType}
        sx={{ width: '100%', fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </GlobalContext.Provider>
    </ThemeProvider>
    </>
  );
};

export default App;
