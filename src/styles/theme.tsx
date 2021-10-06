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
  }
}))

export const marketTheme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#FFFCED',
      contrastText: '#308D7B',
    },
    secondary: {
      main: '#30C5A8',
      contrastText: '#FFFCED',
    },
  },
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
      'Droid Sans',
      'Helvetica Neue'
    ].join(','),
    fontSize: 11,
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

export default theme