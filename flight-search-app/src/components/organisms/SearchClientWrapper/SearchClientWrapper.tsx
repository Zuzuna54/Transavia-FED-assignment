'use client';

import React from 'react';
import FlightSearchForm from '@/components/organisms/FlightSearchForm/FlightSearchForm';
// import FlightResults from '../FlightResults/FlightResults'; // Reverted: Assuming FlightResults component exists
import { Airport } from '@/types/data'; // Import types - Keep only used types
// import { searchFlights } from '@/lib/flight-search'; // Reverted: Import the search logic
import { Box } from '@mui/material'; // Added Box for layout

// Define the structure for the search criteria received from the form
interface SearchCriteria {
    // Define based on FormState in FlightSearchForm
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers?: number | string;
}

interface SearchClientWrapperProps {
    airports: Airport[];
    // Reverted: airportMap: AirportMap;
    // Reverted: allFlights: Flight[]; // Pass all flights initially
}

export default function SearchClientWrapper({
    airports,
    // Reverted: airportMap,
    // Reverted: allFlights,
}: SearchClientWrapperProps) {
    console.log("--- Rendering SearchClientWrapper ---"); // Added log
    // Reverted: State for search results, loading, and errors
    // const [results, setResults] = useState<Flight[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    // Handler for when the form submits search criteria
    const handleSearch = (criteria: SearchCriteria) => {
        console.log('Search submitted in wrapper:', criteria);
        // TODO: Implement actual search logic (Phase 6)
        // setIsLoading(true);
        // setError(null);
        // setResults([]);
        // const foundFlights = searchFlights(criteria, allFlights, airportMap);
        // setResults(foundFlights);
        // setIsLoading(false);
    };

    return (
        <Box> {/* Use Box for basic layout container */}
            {/* Pass airports data down to the form */}
            <FlightSearchForm airports={airports} onSearchSubmit={handleSearch} />

            {/* Placeholder for results - To be implemented in Phase 7 */}
            {/* <FlightResults results={results} isLoading={isLoading} error={error} airportMap={airportMap} /> */}
            <Box mt={4}> {/* Add some space before potential results */}
                {/* Results will go here */}
                <p>Search results will appear here.</p>
            </Box>
        </Box>
    );
} 