import {
  createTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

export const greenTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#30C5A8',
      contrastText: '#FFFEFB'
    }
  },
  overrides: {
    MuiButton: {
      outlined: {
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        // '&:hover': {
        //   backgroundColor: 'rgba(0,0,0,0.1) !important'
        // }
      }
    }
  }
}))

export const marketTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#308D7B',
      contrastText: '#FFFCED',
    },
    secondary: {
      main: '#30C5A8',
      contrastText: '#FFFCED',
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        // '&:hover': {
        //   backgroundColor: 'rgba(0,0,0,0.1) !important'
        // }
      }
    }
  }
}))

export const homeTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#F5F1DD',
      contrastText: '#717171',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Montserrat',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue'
    ].join(','),
    fontSize: 11,
    body1: {
      fontSize: 11,
    },
    subtitle1: {
      fontSize: 14
    },
    h1: {
      fontSize: 56
    },
    h4: {
      fontSize: 28
    }
  }
}))

export const dialogTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#1571FF',
      contrastText: '#FFFEFB',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Montserrat',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue'
    ].join(','),
    fontSize: 11,
    body1: {
      fontSize: 11,
    },
    subtitle1: {
      fontSize: 14
    },
    h1: {
      fontSize: 56
    },
    h4: {
      fontSize: 28
    }
  }
}))

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#FCBF4A',
      contrastText: '#7E5504'
    },
    secondary: {
      main: '#FF6C50',
      contrastText: '#FFFDF4',
    },
    success: {
      main: '#30C5A8',
      contrastText: '#FFFEFB'
    },
    background: {
      default: '#FFFCED'
    },
    text: {
      primary: '#22303D',
      secondary: '#FFFEFB'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Montserrat',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Tovari Sans Bold',
      'Droid Sans',
      'Helvetica Neue'
    ].join(','),
    fontSize: 11,
    body1: {
      fontSize: 11,
    },
    subtitle1: {
      fontSize: 14
    },
    h1: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 56
    },
    h2: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 48
    },
    h3: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 32
    },
    h4: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 28
    },
    h5: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 24
    },
    h6: {
      fontFamily: 'Tovari Sans Bold',
      fontSize: 16
    }
  }
}))

export default theme