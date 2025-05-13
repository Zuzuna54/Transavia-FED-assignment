import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Define Transavia-like colors (replace with official hex codes)
const transaviaGreen = '#00A87B'; // Example Transavia Green
const transaviaBlue = '#0033A0';  // Example Transavia Blue
const lightGray = '#f4f4f4';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: transaviaGreen,
        },
        secondary: {
            main: transaviaBlue,
        },
        error: {
            main: red.A400,
        },
        background: {
            default: lightGray, // Light gray for general background
            paper: '#ffffff',    // White for paper elements like Cards
        }
    },
    typography: {
        fontFamily: [
            'Open Sans', // Example: A common, clean sans-serif font
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
        // Example: Define some headline styles if needed
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        // ... other typography settings ...
    },
    components: {
        // Example: Default MuiButton style adjustments
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Slightly more rounded buttons
                    textTransform: 'none', // Keep button text case as defined
                },
                containedPrimary: {
                    color: '#ffffff', // Ensure white text on primary green button
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // More rounded cards
                }
            }
        }
        // Add other component overrides later
    }
});

export default theme; 