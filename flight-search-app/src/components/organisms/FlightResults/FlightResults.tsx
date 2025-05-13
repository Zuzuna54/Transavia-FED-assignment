'use client';

import React from 'react';
import { FlightOffer, Airport } from '@/types/data';
import styles from './FlightResults.module.scss';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import LoadingIndicator from '@/components/atoms/LoadingIndicator/LoadingIndicator';

interface FlightResultsProps {
    flights: FlightOffer[];
    airportMap: Map<string, Airport>; // For displaying full names
    isLoading: boolean;
    hasSearched: boolean; // To differentiate between initial state and no results found
}

// Helper function for currency formatting
const formatCurrency = (value: number, currencyCode: string): string => {
    return new Intl.NumberFormat('nl-NL', { // Example: Netherlands locale
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08 // Slightly faster stagger
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120, // Slightly stiffer spring
            damping: 15 // Adjust damping
        }
    }
};

const FlightResults: React.FC<FlightResultsProps> = ({
    flights,
    airportMap,
    isLoading,
    hasSearched,
}) => {
    console.log("--- Rendering FlightResults ---", { isLoading, hasSearched, flightCount: flights.length });

    if (isLoading) {
        return (
            <Box className={styles.resultsContainer} sx={{ py: 4 }}>
                <LoadingIndicator />
            </Box>
        );
    }

    if (!hasSearched) {
        return (
            <Box className={styles.resultsContainer} sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6">Please enter your search criteria and click &quot;Search Flights&quot;.</Typography>
            </Box>
        );
    }

    if (flights.length === 0) {
        return (
            <Box className={styles.resultsContainer} sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6">No flights found matching your criteria.</Typography>
                <Typography>Try adjusting your origin, destination, or dates.</Typography>
            </Box>
        );
    }

    // --- Flight List Rendering ---
    return (
        <Box className={styles.resultsContainer}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Available Flights ({flights.length})
            </Typography>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={'results'}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <Grid container spacing={2}>
                        {flights.map((offer) => {
                            const flight = offer.outboundFlight;
                            const price = offer.pricingInfoSum;
                            const originAirport = airportMap.get(flight.departureAirport.locationCode);
                            const destinationAirport = airportMap.get(flight.arrivalAirport.locationCode);

                            // Format dates and times
                            const departureTime = format(new Date(flight.departureDateTime), 'HH:mm');
                            const arrivalTime = format(new Date(flight.arrivalDateTime), 'HH:mm');
                            const departureDate = format(new Date(flight.departureDateTime), 'EEE, MMM d'); // e.g., Thu, Nov 10

                            return (
                                <Grid size={{ xs: 12, md: 6 }} key={flight.id}>
                                    <motion.div
                                        variants={itemVariants}
                                    >
                                        <Card variant="outlined" className={styles.flightCard}>
                                            <CardContent>
                                                <Grid container component="div" spacing={2} alignItems="center">
                                                    {/* Route Info */}
                                                    <Grid size={{ xs: 12, sm: 5 }}>
                                                        <Typography variant="h6">
                                                            {originAirport?.city || flight.departureAirport.locationCode} → {destinationAirport?.city || flight.arrivalAirport.locationCode}
                                                        </Typography>
                                                        <Typography variant="caption" display="block" gutterBottom>
                                                            {originAirport?.name} ({flight.departureAirport.locationCode}) to {destinationAirport?.name} ({flight.arrivalAirport.locationCode})
                                                        </Typography>
                                                    </Grid>
                                                    {/* Time Info */}
                                                    <Grid size={{ xs: 6, sm: 3 }} sx={{ textAlign: { sm: 'center' } }}>
                                                        <Typography variant="h6">{departureTime} - {arrivalTime}</Typography>
                                                        <Typography variant="body2">{departureDate}</Typography>
                                                    </Grid>
                                                    {/* Price Info */}
                                                    <Grid size={{ xs: 6, sm: 4 }} sx={{ textAlign: 'right' }}>
                                                        <Typography variant="h5" color="primary">
                                                            {formatCurrency(price.totalPriceOnePassenger, price.currencyCode)}
                                                        </Typography>
                                                        <Typography variant="caption" display="block">per passenger</Typography>
                                                        <Chip label={price.productClass} size="small" sx={{ mt: 0.5 }} />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default FlightResults; 