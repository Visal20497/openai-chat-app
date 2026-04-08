import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary:    { main: "#6366f1" },
    secondary:  { main: "#8b5cf6" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 12 },
});

export default theme;
