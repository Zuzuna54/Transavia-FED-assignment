'use client';

import React, { useState, useMemo } from 'react';
import FlightSearchForm from '@/components/organisms/FlightSearchForm/FlightSearchForm';
import FlightResults from '../FlightResults/FlightResults'; // Import the new component
import { Airport, FlightOffer } from '@/types/data'; // Added FlightOffer
import { filterFlights } from '@/lib/flight-utils'; // Import the filtering utility (to be created)
import { Box } from '@mui/material';
import { parseISO } from 'date-fns'; // Import parseISO to convert string date
import { motion } from 'framer-motion'; // Import motion

// Define the structure for the search criteria received from the form
// Export this type so FlightSearchForm can use it
export interface SearchCriteria {
    // Define based on FormState in FlightSearchForm
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers?: number | string;
    tripType?: string; // Added for Trip Type
    travelClass?: string; // Added for Travel Class
}

interface SearchClientWrapperProps {
    airports: Airport[];
    allFlights: FlightOffer[]; // Accept all flights
}

export default function SearchClientWrapper({
    airports,
    allFlights,
}: SearchClientWrapperProps) {
    // State for search results, loading, and search status
    const [filteredFlights, setFilteredFlights] = useState<FlightOffer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    // For more complex state sharing across many components, consider Context API or Zustand.

    // Recreate the map on the client side using the airports array

    const airportMap = useMemo(() => {
        const map = new Map<string, Airport>();
        airports.forEach(airport => {
            map.set(airport.code, airport);
        });
        return map;
    }, [airports]); // Dependency array ensures it only recomputes if airports changes

    // Handler for when the form submits search criteria
    const handleSearch = async (criteria: SearchCriteria) => {
        setIsLoading(true);
        setHasSearched(true);
        setFilteredFlights([]); // Clear previous results

        // Simulate async operation if needed, or remove if filtering is fast
        // Removing the simulation for now as loading state is handled
        // await new Promise(resolve => setTimeout(resolve, 300));

        // Prepare criteria for filtering function (convert date string to Date object)
        const filterCriteria = {
            ...criteria,
            departureDate: parseISO(criteria.departureDate), // Convert departure date string to Date
            // Note: filterFlights utility will likely ignore returnDate and passengers for now
        };

        // Simulate API call or heavy computation
        await new Promise(resolve => setTimeout(resolve, 500)); // Re-add a short delay to simulate work

        try {
            const results = filterFlights(filterCriteria, allFlights);
            // console.log(`Filtering complete, found ${results.length} flights.`); // Removed
            setFilteredFlights(results);
        } catch (_error: unknown) { // Prefixed error with underscore
            console.error("Error during flight filtering:", _error); // Removed
            // Optionally set an error state here to display to the user
            setFilteredFlights([]); // Clear results on error
        }

        setIsLoading(false); // Ensure loading is set to false after operation
    };

    return (
        <Box sx={{ width: '100%' }}> {/* Ensure this root Box takes full width */}
            <FlightSearchForm
                airports={airports}
                allFlights={allFlights}
                onSearchSubmit={handleSearch}
                isLoading={isLoading} // Pass isLoading state down
            />

            {/* Render the FlightResults component, passing state */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ width: '100%' }}>
                <FlightResults
                    flights={filteredFlights}
                    airportMap={airportMap}
                    isLoading={isLoading}
                    hasSearched={hasSearched}
                />
            </motion.div>
        </Box>
    );
} 