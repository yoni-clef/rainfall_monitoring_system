import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#006064', // Deep teal
      light: '#428e92',
      dark: '#00363a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0277bd', // Ocean blue
      light: '#58a5f0',
      dark: '#004c8c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#e0f7fa', // Light cyan
      paper: '#ffffff',
    },
    water: {
      light: '#b2ebf2', // Light cyan
      medium: '#4dd0e1', // Medium cyan
      dark: '#0097a7', // Dark cyan
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#006064',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#006064',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#006064',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme; 