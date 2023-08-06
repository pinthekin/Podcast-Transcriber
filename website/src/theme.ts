import createTheme from '@mui/material/styles/createTheme'

export default createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '14px',
          backgroundColor: 'rgba(30,30,30,0.8)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    // background: {
    //   default: '#fff',
    //   // paper: '#ffd600',
    //   // dark: '',
    // },
    // primary: {
    //   main: '#000',
    // },
  },
})
