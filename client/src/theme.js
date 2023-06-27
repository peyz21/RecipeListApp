// theme.js
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
        default: '#424242',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  spacing: 4,
});

export default theme;
