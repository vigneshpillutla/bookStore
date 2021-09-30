import { createTheme } from '@material-ui/core';

const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#FFD7B5',
      light: '#FFE5CA',
      dark: '#FFC6AA',
      contrastText: '#333'
    },
    secondary: {
      main: '#7B35F4',
      light: '#A75CFF',
      dark: '#4C00CB',
      contrastText: '#fff'
    },
    text: {
      primary: '#333',
      secondary: '#fff'
    }
  },
  typography: {
    fontFamily: '"Poppins","Roboto", "Helvetica", "Arial", sans-serif'
  }
});

export default LightTheme;
