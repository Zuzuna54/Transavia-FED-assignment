'use client';

import React, { useState, useMemo, forwardRef } from 'react';
import { Box, TextField, Button, Grid, CircularProgress, Alert, Autocomplete, FormHelperText } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { DateRange } from '@mui/x-date-pickers-pro';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { Airport, FlightOffer } from '@/types/data'; // Use path alias consistent with other components
import { SearchCriteria } from '../SearchClientWrapper/SearchClientWrapper'; // Import SearchCriteria
import styles from './FlightSearchForm.module.scss'; // Import the SCSS module
import { isValid, isAfter, format, addDays, isBefore } from 'date-fns'; // Import parseISO, validation helpers, and format

interface FlightSearchFormProps {
    airports: Airport[];
    allFlights: FlightOffer[]; // Add allFlights prop
    onSearchSubmit: (data: SearchCriteria) => void;
    isLoading: boolean; // Add isLoading prop
}

// Define state structure
interface FormState {
    dateRange: DateRange<Date>; // Use DateRange type [start, end]
    passengers?: number | string;
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
    console.log("--- Rendering FlightSearchForm ---", { isLoading });
    // State for non-autocomplete form fields
    const [formData, setFormData] = useState<FormState>({
        dateRange: [null, null], // Initialize date range state
        passengers: 1,
    });
    // State for Autocomplete fields
    const [originValue, setOriginValue] = useState<Airport | null>(null);
    const [destinationValue, setDestinationValue] = useState<Airport | null>(null);
    const [originInputValue, setOriginInputValue] = useState('');
    const [destinationInputValue, setDestinationInputValue] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({}); // State for field-specific errors

    // --- Start of Date Availability Logic ---
    const availableDepartureDates = useMemo(() => {
        const dateSet = new Set<string>();
        // Only compute if origin, destination, and flight data are available
        if (originValue && destinationValue && allFlights) {
            allFlights.forEach(offer => {
                const flight = offer.outboundFlight;
                // Check if the flight matches the selected route
                if (flight?.departureAirport?.locationCode === originValue.code &&
                    flight?.arrivalAirport?.locationCode === destinationValue.code) {
                    // Attempt to parse the date and add its YYYY-MM-DD representation to the set
                    try {
                        const departureDate = new Date(flight.departureDateTime);
                        if (!isNaN(departureDate.getTime())) { // Ensure the date is valid after parsing
                            dateSet.add(format(departureDate, 'yyyy-MM-dd'));
                        }
                    } catch (e) {
                        console.error("Error parsing flight departure date:", flight.departureDateTime, e);
                    }
                }
            });
        }
        // console.log("Available departure dates for", originValue?.code, "->", destinationValue?.code, ":", Array.from(dateSet)); // Log for debugging
        return dateSet;
    }, [originValue, destinationValue, allFlights]); // Recompute when route or flights change

    const shouldDisableDateFunc = (date: Date, position: 'start' | 'end'): boolean => {
        const [startDate] = formData.dateRange;

        // 1. Handle START date based on available flights for the route
        if (position === 'start') {
            // Don't disable if origin or destination isn't selected yet
            if (!originValue || !destinationValue) {
                return false;
            }
            // Format the calendar date to compare with our set of available dates
            const dateString = format(date, 'yyyy-MM-dd');
            // Disable the date if it's NOT in the set for the selected route
            const isDisabled = !availableDepartureDates.has(dateString);
            return isDisabled;
        }

        // 2. Handle END date based on selected start date
        if (position === 'end') {
            // If no start date is selected yet, don't disable any end dates initially
            if (!startDate || !isValid(startDate)) {
                return false;
            }
            // Disable the end date if it is before or the same day as the start date
            // Use isBefore and setHours to compare dates only (ignore time)
            const isEndDateBeforeStartDate = isBefore(date.setHours(0, 0, 0, 0), startDate.setHours(0, 0, 0, 0));
            return isEndDateBeforeStartDate;
        }

        // Default case (shouldn't be reached ideally)
        return false;
    };
    // --- End of Date Availability Logic ---

    // Create filtered lists for Autocomplete options
    const originOptions = useMemo(() => {
        return airports.filter(airport => airport.code !== destinationValue?.code);
    }, [airports, destinationValue]);

    const destinationOptions = useMemo(() => {
        if (originValue?.code === 'AMS') {
            // If origin is AMS, filter destinations based on actual routes in allFlights
            const reachableDestinationCodes = new Set(
                allFlights.map(offer => offer.outboundFlight.arrivalAirport.locationCode)
            );
            return airports.filter(airport =>
                airport.code !== originValue?.code &&
                reachableDestinationCodes.has(airport.code)
            );
        } else {
            // Default behavior: filter out only the selected origin, or show all if no origin selected
            return airports.filter(airport => airport.code !== originValue?.code);
        }
    }, [airports, originValue, allFlights]); // Add allFlights to dependency array

    // Custom Listbox component with animation
    const AnimatedListBox = forwardRef<HTMLUListElement, AnimatedListBoxProps>(
        function AnimatedListBox(props, ref) {
            const { children, ...other } = props;
            return (
                <motion.ul
                    ref={ref}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    {...other} // Spread all other props
                >
                    {children}
                </motion.ul>
            );
        }
    );

    // Validation function
    const validateForm = (): Record<string, string> => {
        const errors: Record<string, string> = {};
        const [startDate, endDate] = formData.dateRange; // Destructure date range

        if (!originValue) {
            errors.origin = "Origin airport is required.";
        }
        if (!destinationValue) {
            errors.destination = "Destination airport is required.";
        }
        if (!startDate || !isValid(startDate)) {
            errors.dateRange = "Valid departure date is required.";
        }

        if (endDate && !isValid(endDate)) {
            errors.dateRange = "Return date is invalid.";
        } else if (endDate && startDate && !isAfter(endDate, startDate)) {
            errors.dateRange = "Return date must be after departure date.";
        }

        // Check if origin and destination are the same
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
        setError(null); // Clear general submission error

        const validationErrors = validateForm();
        setFieldErrors(validationErrors); // Set field errors

        if (Object.keys(validationErrors).length > 0) {
            console.log("Validation Errors:", validationErrors);
            return; // Stop submission if validation fails
        }

        // If validation passes, ensure field errors are cleared
        setFieldErrors({}); // Clear any lingering field errors

        const [startDate, endDate] = formData.dateRange; // Destructure date range

        const searchPayload: SearchCriteria = {
            origin: originValue!.code, // Use non-null assertion as validation passed
            destination: destinationValue!.code, // Use non-null assertion as validation passed
            departureDate: format(startDate!, 'yyyy-MM-dd'), // Format start date
            returnDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined, // Format end date if exists
            passengers: Number(formData.passengers) || 1, // Ensure passengers is a number
        };

        console.log('Form submitted with:', searchPayload);

        try {
            onSearchSubmit(searchPayload); // Pass the constructed payload
        } catch (err) {
            setError('An error occurred during submission.'); // Set general error
            console.error(err);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className={styles.flightSearchForm} // Apply SCSS module class
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Spacing between elements
                    p: 3, // Padding
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    opacity: isLoading ? 0.7 : 1, // Visual cue for loading
                    pointerEvents: isLoading ? 'none' : 'auto', // Disable interaction
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    {/* Origin Field - Replaced with Autocomplete */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Autocomplete
                            options={originOptions}
                            getOptionLabel={(option) => `${option.name} (${option.code})`}
                            value={originValue}
                            onChange={(event, newValue) => {
                                setOriginValue(newValue);
                            }}
                            inputValue={originInputValue}
                            onInputChange={(event, newInputValue) => {
                                setOriginInputValue(newInputValue);
                            }}
                            slots={{ // Use slots prop
                                listbox: AnimatedListBox // Provide custom animated listbox
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Origin Airport"
                                    name="origin"
                                    variant="outlined"
                                    required
                                    error={!!fieldErrors.origin}
                                />
                            )}
                            disabled={isLoading} // Disable field when loading
                        />
                        <AnimatePresence>
                            {fieldErrors.origin && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <FormHelperText error className={styles.errorMessage}>
                                        {fieldErrors.origin}
                                    </FormHelperText>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Grid>
                    {/* Destination Field - Replaced with Autocomplete */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Autocomplete
                            options={destinationOptions}
                            getOptionLabel={(option) => `${option.name} (${option.code})`}
                            value={destinationValue}
                            onChange={(event, newValue) => {
                                setDestinationValue(newValue);
                            }}
                            inputValue={destinationInputValue}
                            onInputChange={(event, newInputValue) => {
                                setDestinationInputValue(newInputValue);
                            }}
                            slots={{ // Use slots prop
                                listbox: AnimatedListBox // Provide custom animated listbox
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Destination Airport"
                                    name="destination"
                                    variant="outlined"
                                    required
                                    error={!!fieldErrors.destination}
                                />
                            )}
                            disabled={isLoading} // Disable field when loading
                        />
                        <AnimatePresence>
                            {fieldErrors.destination && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <FormHelperText error className={styles.errorMessage}>
                                        {fieldErrors.destination}
                                    </FormHelperText>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Grid>
                    {/* Combined Date Range Picker */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <DateRangePicker
                            localeText={{ start: 'Departure Date', end: 'Return Date' }}
                            value={formData.dateRange}
                            onChange={(newValue: DateRange<Date>) => {
                                setFormData(prevData => ({ ...prevData, dateRange: newValue }));
                                if (fieldErrors.dateRange) {
                                    setFieldErrors(prev => ({ ...prev, dateRange: '' }));
                                }
                            }}
                            minDate={new Date('2022-10-12')}
                            maxDate={addDays(new Date('2022-10-12'), 90)}
                            calendars={2}
                            format="yyyy-MM-dd"
                            referenceDate={new Date('2022-10-12')}
                            shouldDisableDate={shouldDisableDateFunc}
                            slotProps={{
                                field: {
                                    clearable: true,
                                    onClear: () => setFormData(prev => ({ ...prev, dateRange: [null, null] }))
                                },
                                textField: {
                                    error: !!fieldErrors.dateRange,
                                    name: 'dateRange', // for validation key
                                    // Removed conditional required logic
                                }
                            }}
                            sx={{ width: '100%' }}
                            disabled={isLoading} // Disable field when loading
                        />
                        <AnimatePresence>
                            {fieldErrors.dateRange && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <FormHelperText error className={styles.errorMessage}>
                                        {fieldErrors.dateRange}
                                    </FormHelperText>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Grid>
                    {/* Passengers Field - Now takes up the other half */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Passengers"
                            name="passengers"
                            value={formData.passengers}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const rawValue = event.target.value;
                                let finalValue: number = 0; // Default to 0
                                // Allow only digits
                                const numericValue = rawValue.replace(/\D/g, '');
                                if (numericValue === '') {
                                    finalValue = 0;
                                    event.target.value = '0';
                                } else {
                                    const parsedValue = parseInt(numericValue, 10);
                                    // parseInt('0' ) is 0, parseInt('05') is 5
                                    finalValue = isNaN(parsedValue) ? 0 : parsedValue;
                                    // Ensure non-negative (though min:1 should handle this)
                                    finalValue = Math.max(0, finalValue);
                                    event.target.value = finalValue.toString();
                                }
                                // Update form state
                                setFormData(prevData => ({
                                    ...prevData,
                                    passengers: finalValue,
                                }));
                                // Clear passenger error on change
                                if (fieldErrors.passengers) {
                                    setFieldErrors(prev => ({ ...prev, passengers: '' }));
                                }
                            }}
                            variant="outlined"
                            type="number" // Keep type number for native controls, but manage value strictly
                            InputProps={{ inputProps: { min: 1 } }}
                            required
                            error={!!fieldErrors.passengers}
                            disabled={isLoading} // Disable field when loading
                        />
                        <AnimatePresence>
                            {fieldErrors.passengers && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <FormHelperText error className={styles.errorMessage}>
                                        {fieldErrors.passengers}
                                    </FormHelperText>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Grid>
                    {/* Empty Grid item to push button to the right on md+ screens */}
                    <Grid size={{ xs: 0, md: 6 }} />
                    {/* Submit Button - Corrected Grid */}
                    <Grid size={{ xs: 12 }} sx={{ textAlign: 'right', mt: 1 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading} // Use parent's isLoading
                            sx={{
                                minWidth: 150, // Give button some minimum width
                                transition: 'filter 0.2s ease-in-out', // Add transition
                                '&:hover': {
                                    filter: 'brightness(0.9)', // Slightly darken on hover
                                },
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Search Flights'}
                        </Button>
                    </Grid>
                </Grid>

                {/* Error Message - Moved outside the main grid for better layout */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                )}
            </Box>
        </motion.div>
    );
};

export default FlightSearchForm; 