import { ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#007BFF"  // Bright Blue
    },
    secondary: {
      main: "#FFFFFF"  // White
    }
  },
  shape: {
    borderRadius: 12
  },
  spacing: 8
  // typography: {
  //   fontFamily: [
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Roboto",
  //     '"Helvetica Neue"',
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"'
  //   ].join(",")
  // }
};
