import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import Login from "./pages/Login"
import { APIProvider } from "@vis.gl/react-google-maps";

const GOOGLE_MAP_LIBRARIES = ["places"];


const theme = createTheme({
  palette: {
    primary: {
      main: '#000', // Green color for primary
      brightcolor: '#FFA500', // Green color for primary
    },
    secondary: {
      main: '#f7f5f0', // Beige color for secondary
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, Arial, sans-serif',
  //  fontSize: 'clamp(0.85rem, 2vw, 1.0rem)',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <ThemeProvider theme={theme}>

        <APIProvider
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
          libraries={GOOGLE_MAP_LIBRARIES}
        >
        <CssBaseline />
          <App />
          </APIProvider>

      </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
)
