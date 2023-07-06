
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',  
    },
    secondary: {
      main: '#e91e63',  
    },
    background: {
      default: '#979797', 
      paper: '#9a8ab7',  
    },
    text: {
      primary: '#00000', 
      secondary: '#00000',  
    },
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active  {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: #212121 !important;
        }
      `
    }
  }
});

export default theme;
