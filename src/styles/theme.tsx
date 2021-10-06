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
}))

export default theme