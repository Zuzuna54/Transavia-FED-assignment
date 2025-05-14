'use client';

import React from 'react';
import { FlightOffer, Airport } from '@/types/data';
import styles from './FlightResults.module.scss';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { format, intervalToDuration } from 'date-fns';
import LoadingIndicator from '@/components/atoms/LoadingIndicator/LoadingIndicator';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { formatCurrency } from '@/lib/formatters';

interface FlightResultsProps {
    flights: FlightOffer[];
    airportMap: Map<string, Airport>; // For displaying full names
    isLoading: boolean;
    hasSearched: boolean; // To differentiate between initial state and no results found
}

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
    // console.log("--- Rendering FlightResults ---", { isLoading, hasSearched, flightCount: flights.length }); // Removed

    if (isLoading) {
        return (
            <Box className={styles.resultsContainer} sx={{ py: 4, width: '100%', boxSizing: 'border-box' }}>
                <LoadingIndicator />
            </Box>
        );
    }

    if (!hasSearched) {
        return (
            <Box className={styles.resultsContainer} sx={{ textAlign: 'center', py: 4, width: '100%', boxSizing: 'border-box', }}>
                <Typography variant="h6">Please enter your search criteria and click &quot;Search Flights&quot;.</Typography>
            </Box>
        );
    }

    if (flights.length === 0) {
        return (
            <Box className={styles.resultsContainer} sx={{ textAlign: 'center', py: 4, width: '100%', boxSizing: 'border-box' }}>
                <Typography variant="h6">No flights found matching your criteria.</Typography>
                <Typography>Try adjusting your origin, destination, or dates.</Typography>
            </Box>
        );
    }

    // --- Flight List Rendering ---
    return (
        <Box
            className={styles.resultsContainer}
            sx={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: '#ffffff', // Added for uniform design
                borderRadius: '12px',    // Added for uniform design
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Added for uniform design
                p: 3,                     // Added for uniform design
                mt: 3,                     // Add some margin-top to separate from search form
                minHeight: '500px'
            }}
        >
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

                            const departureDateTime = new Date(flight.departureDateTime);
                            const arrivalDateTime = new Date(flight.arrivalDateTime);

                            // Format times with AM/PM
                            const departureTimeFormatted = `Dep: ${format(departureDateTime, 'h:mm a')}`;
                            const arrivalTimeFormatted = `Arr: ${format(arrivalDateTime, 'h:mm a')}`;

                            const departureDate = format(departureDateTime, 'EEE, MMM d');

                            const duration = intervalToDuration({ start: departureDateTime, end: arrivalDateTime });
                            const durationFormatted = `${duration.hours || 0}h ${duration.minutes || 0}m`;

                            const baseFare = price.baseFare;
                            const taxSurcharge = price.taxSurcharge;

                            return (
                                <Grid size={{ xs: 12 }} key={flight.id}>
                                    <motion.div variants={itemVariants}>
                                        <Card variant="outlined" className={styles.flightCard} sx={{ height: 'auto' }}>
                                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 'auto' }}> {/* Further reduced gap and padding */}
                                                <FlightTakeoffIcon color="action" sx={{ fontSize: '1.8rem', mr: 0.5 }} /> {/* Smaller icon, added margin */}
                                                <Grid container component="div" spacing={0.25} alignItems="flex-start" flexGrow={1}> {/* Reduced spacing, align items to top */}
                                                    {/* Col 1: Route Info & Date */}
                                                    <Grid size={{ xs: 12, sm: 5 }} container direction="column" sx={{ lineHeight: 1.3 }}> {/* Tighter line height */}
                                                        <Typography variant="body1" component="div" fontWeight="medium" noWrap>
                                                            {originAirport?.city || flight.departureAirport.locationCode} → {destinationAirport?.city || flight.arrivalAirport.locationCode}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" noWrap>
                                                            ({originAirport?.name} to {destinationAirport?.name})
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">{departureDate}</Typography>
                                                    </Grid>

                                                    {/* Col 2: Times & Duration */}
                                                    <Grid size={{ xs: 7, sm: 3 }} sx={{ textAlign: { xs: 'left', sm: 'center' }, lineHeight: 1.3 }}> {/* Tighter line height */}
                                                        <Typography variant="caption" component="div" noWrap fontWeight="medium">{departureTimeFormatted}</Typography>
                                                        <Typography variant="caption" component="div" noWrap fontWeight="medium">{arrivalTimeFormatted}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{durationFormatted}</Typography>
                                                    </Grid>

                                                    {/* Col 3: Price Info - Restructured */}
                                                    <Grid size={{ xs: 12, sm: 4 }} container alignItems="center" justifyContent="flex-end" sx={{ textAlign: 'right', lineHeight: 1.3 }}>
                                                        <Grid sx={{ mr: 1, textAlign: 'right' }}>
                                                            <Typography variant="caption" display="block" color="text.secondary">
                                                                Base: {formatCurrency(baseFare, price.currencyCode)}
                                                            </Typography>
                                                            <Typography variant="caption" display="block" color="text.secondary">
                                                                Tax: {formatCurrency(taxSurcharge, price.currencyCode)}
                                                            </Typography>
                                                            <Typography variant="caption" display="block" color="text.secondary">per passenger</Typography>
                                                        </Grid>
                                                        <Grid sx={{ textAlign: 'right' }}>
                                                            <Typography variant="subtitle1" color="primary" component="div" fontWeight="bold">
                                                                {formatCurrency(price.totalPriceOnePassenger, price.currencyCode)}
                                                            </Typography>
                                                            <Chip label={price.productClass} size="small" sx={{ mt: 0, mb: 0.25, height: '18px', fontSize: '0.65rem' }} />
                                                        </Grid>
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