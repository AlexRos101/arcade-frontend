import {
  createTheme,
  responsiveFontSizes
} from '@material-ui/core/styles'

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