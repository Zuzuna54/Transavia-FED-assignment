import React, { Suspense } from 'react';
import { loadAirports, loadFlights } from '@/lib/data-loader';
import { Airport } from '@/types/data';
import pageStyles from "./page.module.scss"; // Renamed import
import SearchClientWrapper from '@/components/organisms/SearchClientWrapper/SearchClientWrapper'; // Import the client wrapper
import Box from '@mui/material/Box';
import LoadingIndicator from '@/components/atoms/LoadingIndicator/LoadingIndicator'; // Import LoadingIndicator

// Removed HomePageProps interface as props are passed directly

// This page is a Server Component by default in App Router
export default async function Home() {
    console.log("--- Rendering HomePage (Server Component) ---");
    // Load data directly on the server
    const airports = loadAirports();
    const allFlights = loadFlights(); // Renamed for clarity

    // Task 2.4: Pre-compute Airport Lookup Map
    const airportMap = new Map<string, Airport>();
    airports.forEach(airport => {
        airportMap.set(airport.code, airport);
    });

    // Log data on the server console during build/render
    console.log(`Loaded ${airports.length} airports.`);
    console.log(`Loaded ${allFlights.length} flights.`);
    console.log(`Created airport map with ${airportMap.size} entries.`);

    // Render the Client Wrapper, passing data as props
    return (
        // Apply styles from page.module.css if needed, otherwise remove if unused
        <main className={pageStyles.main}>
            {/* Apply layout container class */}
            <div className={pageStyles.container}>
                <h1>Flight Search App</h1>
                <Box sx={{ my: 4 }}>
                    <Suspense fallback={<LoadingIndicator />}>
                        <SearchClientWrapper
                            airports={airports}
                            // airportMap={airportMap} // DO NOT pass Map from server to client
                            allFlights={allFlights} // Pass allFlights data
                        />
                    </Suspense>
                </Box>
            </div>
        </main>
    );
}
