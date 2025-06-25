import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
    primary: {
      main: "#535bf2",
      dark: "#3c47e9",
      light: "#7f88b9",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#161212", // Dark is a default color for the background
      paper: "#1c1c1c", // Slightly lighter for paper elements
    },
  },
  spacing: 4, // Default spacing unit
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      marginBottom: "1rem",
    },
  },
});
