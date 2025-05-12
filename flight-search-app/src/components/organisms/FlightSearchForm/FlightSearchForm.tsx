'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Airport } from '@/types/data'; // Use path alias consistent with other components
import styles from './FlightSearchForm.module.scss'; // Import the SCSS module

interface FlightSearchFormProps {
    airports: Airport[]; // Pass the airport data as a prop
    onSearchSubmit: (data: FormState) => void; // Callback on submit
}

// Define state structure
interface FormState {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string; // Optional
    passengers?: number | string; // Allow string for input, convert later if needed
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    airports, // Keep airports prop, suppress unused warning for now
    onSearchSubmit,
}) => {
    console.log("--- Rendering FlightSearchForm ---"); // Added log
    // State for form fields - controlled components
    const [formData, setFormData] = useState<FormState>({
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        passengers: 1, // Default to 1 passenger
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) || 0 : value,
        }));
    };

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading indicator
        setError(null); // Clear previous errors
        console.log('Form submitted with:', formData); // Log current state
        // TODO: Add validation (Phase 5)
        // Simulate API call / processing time
        setTimeout(() => {
            try {
                // Call the prop function passed from parent
                onSearchSubmit(formData); // Pass current state up
                setLoading(false); // Stop loading indicator on success
            } catch (err) {
                setError('An error occurred during submission.'); // Set error message
                setLoading(false); // Stop loading indicator on error
                console.error(err);
            }
        }, 1000); // Simulate 1 second delay
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
                }}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                    {/* Origin Field */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Origin Airport"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            variant="outlined"
                            required // Example: Mark as required
                        />
                    </Grid>
                    {/* Destination Field */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Destination Airport"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    {/* Departure Date Field */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Departure Date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            required
                        />
                    </Grid>
                    {/* Return Date Field */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Return Date (Optional)"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleInputChange}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {/* Passengers Field */}
                    <Grid size={{ xs: 12, md: 6 }}> {/* Changed md size */}
                        <TextField
                            fullWidth
                            label="Passengers"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            InputProps={{ inputProps: { min: 1 } }} // Ensure min 1 passenger
                            required
                        />
                    </Grid>
                    {/* Empty Grid item to push button to the right on md+ screens */}
                    <Grid size={{ xs: 0, md: 6 }} />
                    {/* Submit Button - Corrected Grid */}
                    <Grid size={{ xs: 12 }} sx={{ textAlign: 'right', mt: 1 }}> {/* Removed item, added margin top */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading} // Disable button when loading
                            sx={{ minWidth: 150 }} // Give button some minimum width
                        >
                            {loading ? <CircularProgress size={24} /> : 'Search Flights'}
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