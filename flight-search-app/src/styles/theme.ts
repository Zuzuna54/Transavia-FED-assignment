import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6', // Example primary color
        },
        secondary: {
            main: '#19857b', // Example secondary color
        },
        error: {
            main: red.A400,
        },
        // Add Transavia colors later if desired
    },
    typography: {
        // Configure typography later
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    // Add component overrides later
});

export default theme; 