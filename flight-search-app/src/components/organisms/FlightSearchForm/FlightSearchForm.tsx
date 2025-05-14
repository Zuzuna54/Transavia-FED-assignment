'use client';

import React, { useState, useMemo, forwardRef } from 'react';
import { Box, TextField, Button, Grid, CircularProgress, Alert, Autocomplete, FormHelperText, Stack, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { Airport, FlightOffer } from '@/types/data'; // Use path alias consistent with other components
import { SearchCriteria } from '../SearchClientWrapper/SearchClientWrapper'; // Import SearchCriteria
import { isValid, isAfter, format, addDays, isBefore, parseISO } from 'date-fns'; // Added parseISO
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Icon for swapping origin/destination

interface FlightSearchFormProps {
    airports: Airport[];
    allFlights: FlightOffer[]; // Add allFlights prop
    onSearchSubmit: (data: SearchCriteria) => void;
    isLoading: boolean; // Add isLoading prop
}

// Define state structure
interface FormState {
    startDate: Date | null;
    endDate: Date | null;
    passengers?: number | string;
    tripType?: string; // Added for Trip Type
    travelClass?: string; // Added for Travel Class
}

// Custom Listbox component with animation
// Define props more broadly to accept potential event handlers etc. from Autocomplete
interface AnimatedListBoxProps extends React.HTMLAttributes<HTMLUListElement> {
    // Add any other props you expect Autocomplete might pass, or keep it general
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow any other props
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    airports,
    allFlights, // Add allFlights prop
    onSearchSubmit,
    isLoading, // Destructure isLoading prop
}) => {
    // State for non-autocomplete form fields
    const [formData, setFormData] = useState<FormState>({
        startDate: null,
        endDate: null,
        passengers: 1,
        tripType: 'round-trip', // Default trip type
        travelClass: 'economy', // Default travel class
    });
    // State for Autocomplete fields
    const [originValue, setOriginValue] = useState<Airport | null>(null);
    const [destinationValue, setDestinationValue] = useState<Airport | null>(null);
    const [originInputValue, setOriginInputValue] = useState('');
    const [destinationInputValue, setDestinationInputValue] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({}); // State for field-specific errors

    // --- Start of Date Availability Logic (adapted for single DatePicker) ---
    const availableDepartureDates = useMemo(() => {
        const dateSet = new Set<string>();
        if (originValue && destinationValue && allFlights) {
            allFlights.forEach(offer => {
                const flight = offer.outboundFlight;
                if (flight?.departureAirport?.locationCode === originValue.code &&
                    flight?.arrivalAirport?.locationCode === destinationValue.code) {
                    try {
                        // Ensure departureDateTime is a string before parsing
                        const departureDateTimeStr = String(flight.departureDateTime);
                        const departureDate = parseISO(departureDateTimeStr); // Use parseISO for robustness
                        if (isValid(departureDate)) {
                            dateSet.add(format(departureDate, 'yyyy-MM-dd'));
                        }
                    } catch (_error: unknown) {
                        // Error while parsing a specific flight date, allow process to continue for other dates
                        console.error("Error parsing flight departure date:", flight.departureDateTime, _error);
                    }
                }
            });
        }
        return dateSet;
    }, [originValue, destinationValue, allFlights]);

    const shouldDisableStartDate = (date: Date): boolean => {
        if (!originValue || !destinationValue) return false;
        const dateString = format(date, 'yyyy-MM-dd');
        return !availableDepartureDates.has(dateString);
    };

    const shouldDisableEndDate = (date: Date): boolean => {
        if (!formData.startDate || !isValid(formData.startDate)) return false;
        // Disable end date if it is before or the same day as the start date
        return isBefore(date, formData.startDate) || format(date, 'yyyy-MM-dd') === format(formData.startDate, 'yyyy-MM-dd');
    };
    // --- End of Date Availability Logic ---

    // Create filtered lists for Autocomplete options
    const originOptions = useMemo(() => {
        // Exclude destination from origin options if destination is selected
        return airports.filter(airport => !destinationValue || airport.code !== destinationValue.code);
    }, [airports, destinationValue]);

    const destinationOptions = useMemo(() => {
        // Exclude origin from destination options if origin is selected
        const baseOptions = airports.filter(airport => !originValue || airport.code !== originValue.code);

        if (originValue?.code === 'AMS') {
            // If origin is AMS, further filter destinations based on actual routes in allFlights
            const reachableDestinationCodes = new Set(
                allFlights
                    .filter(offer => offer.outboundFlight.departureAirport.locationCode === originValue.code)
                    .map(offer => offer.outboundFlight.arrivalAirport.locationCode)
            );
            return baseOptions.filter(airport => reachableDestinationCodes.has(airport.code));
        }
        return baseOptions;
    }, [airports, originValue, allFlights]);

    // Custom Listbox component with animation
    const AnimatedListBox = forwardRef<HTMLUListElement, AnimatedListBoxProps>(
        function AnimatedListBox(props, ref) {
            const { children, ...other } = props;
            return (
                <motion.ul
                    ref={ref}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        maxHeight: '280px',
                        overflowY: 'auto',
                        padding: '4px',
                        backgroundColor: 'var(--mui-palette-background-paper, #fff)',
                        borderRadius: '8px',
                        listStyle: 'none'
                        // zIndex: 1301, // Popper usually handles zIndex, but can be set if needed
                    }}
                    {...other} // Spread all other props, including className from Autocomplete
                >
                    {children}
                </motion.ul>
            );
        }
    );

    // Validation function
    const validateForm = (): Record<string, string> => {
        const errors: Record<string, string> = {};
        const { startDate, endDate, tripType } = formData;

        if (!originValue) {
            errors.origin = "Origin airport is required.";
        }
        if (!destinationValue) {
            errors.destination = "Destination airport is required.";
        }
        if (!startDate || !isValid(startDate)) {
            errors.startDate = "Valid departure date is required.";
        }

        if (tripType === 'round-trip') {
            if (!endDate || !isValid(endDate)) {
                errors.endDate = "Valid return date is required for round trip.";
            } else if (startDate && endDate && !isAfter(endDate, startDate)) {
                errors.endDate = "Return date must be after departure date.";
            }
        }

        if (originValue && destinationValue && originValue.code === destinationValue.code) {
            errors.destination = "Destination cannot be the same as origin.";
        }

        if (!formData.passengers || Number(formData.passengers) < 1) {
            errors.passengers = "At least one passenger is required.";
        }

        return errors;
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const validationErrors = validateForm();
        setFieldErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            // console.log("Validation Errors:", validationErrors); // Removed
            return;
        }

        setFieldErrors({});

        const { startDate, endDate, tripType } = formData;

        const searchPayload: SearchCriteria = {
            origin: originValue!.code,
            destination: destinationValue!.code,
            departureDate: format(startDate!, 'yyyy-MM-dd'),
            returnDate: tripType === 'round-trip' && endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
            passengers: Number(formData.passengers) || 1,
            tripType: formData.tripType,
            travelClass: formData.travelClass,
        };

        // console.log('Form submitted with:', searchPayload); // Removed

        try {
            onSearchSubmit(searchPayload); // Pass the constructed payload
        } catch (_error: unknown) {
            console.error('Error during form submission:', _error);
            setError('An error occurred during submission.'); // Set general error
        }
    };

    // Common styles for TextFields
    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'var(--mui-palette-background-paper, #fff)', // Or a very light grey for inputs
            // For a flatter look, can make default border less prominent
            // borderColor: 'transparent', 
            '& .MuiOutlinedInput-notchedOutline': {
                transition: 'all 0.4s ease-in-out',
                borderColor: 'var(--mui-palette-divider, rgba(0, 0, 0, 0.08))', // Lighter default border
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--mui-palette-primary-light,rgb(100, 246, 129))',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-color)', // Use the CSS var for Transavia green
                borderWidth: '1.5px', // Slightly thicker focus border
            },
        },
        '& .MuiInputLabel-outlined': {
            transition: 'all 0.4s ease-in-out',
            color: 'var(--mui-palette-text-secondary, rgba(0, 0, 0, 0.6))',
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
            color: 'var(--primary-color)', // Use the CSS var for Transavia green
        }
    };

    const handleSwapAirports = () => {
        const currentOriginValue = originValue;
        const currentOriginInput = originInputValue;

        setOriginValue(destinationValue);
        setOriginInputValue(destinationInputValue);

        setDestinationValue(currentOriginValue);
        setDestinationInputValue(currentOriginInput);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                // className={styles.flightSearchForm} // Consider removing if styles conflict or are fully managed by sx
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5, // Reduced gap
                    p: { xs: 1.5, sm: 2 }, // Reduced padding
                    backgroundColor: '#ffffff', // Explicit white background for the form card
                    borderRadius: '12px', // Softer, larger border radius for the card
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer shadow for a modern feel
                    opacity: isLoading ? 0.7 : 1,
                    pointerEvents: isLoading ? 'none' : 'auto',
                    width: '80%',
                    boxSizing: 'border-box',
                }}
                noValidate
                autoComplete="off"
            >
                <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'center', flexWrap: 'wrap' }}> {/* Reduced margin bottom */}
                    <FormControl size="small" sx={{ minWidth: 110, ...textFieldSx }}> {/* Slightly reduced minWidth */}
                        <InputLabel id="trip-type-label">Trip</InputLabel>
                        <Select
                            labelId="trip-type-label"
                            id="trip-type-select"
                            value={formData.tripType}
                            label="Trip"
                            onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value }))}
                            disabled={isLoading}
                        >
                            <MenuItem value="round-trip">Round trip</MenuItem>
                            <MenuItem value="one-way">One-way</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 100, ...textFieldSx }}> {/* Slightly reduced minWidth */}
                        <InputLabel id="passengers-label">Passengers</InputLabel>
                        <Select
                            labelId="passengers-label"
                            id="passengers-select"
                            value={String(formData.passengers)}
                            label="Passengers"
                            onChange={(e) => setFormData(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                            disabled={isLoading}
                        >
                            {[...Array(9)].map((_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 110, ...textFieldSx }}> {/* Slightly reduced minWidth */}
                        <InputLabel id="class-label">Class</InputLabel>
                        <Select
                            labelId="class-label"
                            id="class-select"
                            value={formData.travelClass}
                            label="Class"
                            onChange={(e) => setFormData(prev => ({ ...prev, travelClass: e.target.value }))}
                            disabled={isLoading}
                        >
                            <MenuItem value="economy">Economy</MenuItem>
                            <MenuItem value="premium-economy">Premium Economy</MenuItem>
                            <MenuItem value="business">Business</MenuItem>
                            <MenuItem value="first">First</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {/* Main inputs row */}
                <Grid container spacing={{ xs: 1, sm: 1 }} alignItems="flex-start" sx={{ px: { xs: 0, sm: 0.5 } }}> {/* Changed alignItems to flex-start */}
                    <Grid size={{ xs: 1, sm: 2.9 }} sx={{ flexGrow: 1.5 }}>
                        <Autocomplete
                            fullWidth
                            options={originOptions}
                            getOptionLabel={(option) => `${option.name} (${option.code})`}
                            value={originValue}
                            onChange={(event, newValue) => setOriginValue(newValue)}
                            inputValue={originInputValue}
                            onInputChange={(event, newInputValue) => setOriginInputValue(newInputValue)}
                            slots={{ listbox: AnimatedListBox }}
                            renderInput={(params) => (
                                <TextField {...params} label="Origin" name="origin" variant="outlined" required error={!!fieldErrors.origin} sx={textFieldSx} />
                            )}
                            disabled={isLoading}
                            size="small" // Added for compactness
                        />
                        <Box sx={{ minHeight: '1rem' }}>
                            <AnimatePresence>
                                {fieldErrors.origin && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                                        <FormHelperText error sx={{ ml: '14px', fontSize: '0.7rem' }}>{fieldErrors.origin}</FormHelperText>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: "auto" }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: '0 !important', sm: '0 2px !important' } }}> {/* No md prop here, xs="auto" is fine */}
                        <IconButton
                            onClick={handleSwapAirports}
                            disabled={isLoading}
                            aria-label="Swap origin and destination"
                            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%', padding: '8px', backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'action.hover' } }}
                        >
                            <SwapHorizIcon fontSize="small" />
                        </IconButton>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 2.9 }} sx={{ flexGrow: 1.5 }}>
                        <Autocomplete
                            fullWidth
                            options={destinationOptions}
                            getOptionLabel={(option) => `${option.name} (${option.code})`}
                            value={destinationValue}
                            onChange={(event, newValue) => setDestinationValue(newValue)}
                            inputValue={destinationInputValue}
                            onInputChange={(event, newInputValue) => setDestinationInputValue(newInputValue)}
                            slots={{ listbox: AnimatedListBox }}
                            renderInput={(params) => (
                                <TextField {...params} label="Destination" name="destination" variant="outlined" required error={!!fieldErrors.destination} sx={textFieldSx} />
                            )}
                            disabled={isLoading}
                            size="small" // Added for compactness
                        />
                        <Box sx={{ minHeight: '1rem' }}>
                            <AnimatePresence>
                                {fieldErrors.destination && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                                        <FormHelperText error sx={{ ml: '14px', fontSize: '0.7rem' }}>{fieldErrors.destination}</FormHelperText>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 2.7 }} sx={{ flexGrow: 0.75, display: 'flex', flexDirection: 'column' }}>
                        <DatePicker
                            label="Departure"
                            value={formData.startDate}
                            onChange={(newValue) => {
                                setFormData(prev => ({ ...prev, startDate: newValue, endDate: (newValue && prev.endDate && isBefore(prev.endDate, newValue)) ? null : prev.endDate }));
                                if (fieldErrors.startDate) setFieldErrors(prev => ({ ...prev, startDate: '' }));
                                if (fieldErrors.endDate && newValue && formData.endDate && isBefore(formData.endDate, newValue)) setFieldErrors(prev => ({ ...prev, endDate: 'Return date must be after departure date.' }));
                            }}
                            shouldDisableDate={shouldDisableStartDate}
                            minDate={new Date('2022-10-11')}
                            maxDate={addDays(new Date('2022-10-10'), 60)}
                            format="EEE, MMM d"
                            disabled={isLoading}
                            slotProps={{
                                textField: {
                                    fullWidth: true, variant: 'outlined', required: true, error: !!fieldErrors.startDate,
                                    sx: { ...textFieldSx, '& .MuiInputBase-input': { fontSize: '0.875rem' } }, name: 'startDate',
                                    size: "small" // Added for compactness
                                },
                                day: { sx: { '&.Mui-selected': { backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' } } }
                            }}
                        />
                        <Box sx={{ minHeight: '1rem' }}>
                            <AnimatePresence>
                                {fieldErrors.startDate && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                                        <FormHelperText error sx={{ ml: '14px', fontSize: '0.7rem' }}>{fieldErrors.startDate}</FormHelperText>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 4, sm: 2.7 }} sx={{ flexGrow: 0.75, display: 'flex', flexDirection: 'column', visibility: formData.tripType === 'one-way' ? 'hidden' : 'visible' }}>
                        <DatePicker
                            label="Return"
                            value={formData.endDate}
                            onChange={(newValue) => {
                                setFormData(prev => ({ ...prev, endDate: newValue }));
                                if (fieldErrors.endDate) setFieldErrors(prev => ({ ...prev, endDate: '' }));
                            }}
                            shouldDisableDate={shouldDisableEndDate}
                            minDate={formData.startDate ? addDays(formData.startDate, 1) : undefined}
                            maxDate={addDays(new Date('2022-10-12'), 90)}
                            format="EEE, MMM d"
                            disabled={isLoading || formData.tripType === 'one-way' || !formData.startDate}
                            slotProps={{
                                textField: {
                                    fullWidth: true, variant: 'outlined', required: formData.tripType === 'round-trip', error: !!fieldErrors.endDate,
                                    sx: { ...textFieldSx, '& .MuiInputBase-input': { fontSize: '0.875rem' } }, name: 'endDate',
                                    size: "small" // Added for compactness
                                },
                                day: { sx: { '&.Mui-selected': { backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' } } }
                            }}
                        />
                        <Box sx={{ minHeight: '1rem' }}>
                            <AnimatePresence>
                                {fieldErrors.endDate && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}>
                                        <FormHelperText error sx={{ ml: '14px', fontSize: '0.7rem' }}>{fieldErrors.endDate}</FormHelperText>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0.5 }}> {/* Adjusted margins for button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                        sx={{
                            minWidth: { xs: '80%', sm: 180 }, // Adjusted minWidth for button
                            height: 44, // Slightly reduced height
                            fontSize: '0.95rem', // Slightly reduced font size
                            fontWeight: 'medium',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                            textTransform: 'none', // Keeping text as is, not uppercase
                            backgroundColor: 'var(--primary-color)', // Explicitly Transavia green
                            color: 'var(--text-on-primary)',
                            transition: 'all 0.4s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'var(--button-primary-hover)', // From globals.scss
                                boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0px)',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                            },
                            '&.Mui-disabled': { // Styles for disabled state
                                backgroundColor: 'rgba(0,0,0,0.12)',
                                color: 'rgba(0,0,0,0.26)',
                                boxShadow: 'none',
                            }
                        }}
                    >
                        {isLoading ? 'Searching...' : 'Search Flights'}
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>{error}</Alert>
                )}
            </Box>
        </motion.div>
    );
};

export default FlightSearchForm; 