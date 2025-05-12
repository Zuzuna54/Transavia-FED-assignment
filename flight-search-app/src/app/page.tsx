import React, { Suspense } from 'react';
import { loadAirports, loadFlights } from '@/lib/data-loader';
import { Airport } from '@/types/data';
import styles from "./page.module.css"; // Keep styles if needed for layout later
import SearchClientWrapper from '@/components/organisms/SearchClientWrapper/SearchClientWrapper'; // Import the client wrapper
import Box from '@mui/material/Box';

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
        <main className={styles.main}>
            <h1>Flight Search App</h1>
            <Box sx={{ my: 4 }}>
                <Suspense fallback={<div>Loading form...</div>}>
                    <SearchClientWrapper
                        airports={airports}
                    // airportMap={airportMap}
                    // allFlights={allFlights}
                    />
                </Suspense>
            </Box>
        </main>
    );
}
