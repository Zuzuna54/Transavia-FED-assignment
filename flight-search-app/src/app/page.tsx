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
    // Load data directly on the server
    const airports = loadAirports();
    const allFlights = loadFlights(); // Renamed for clarity

    // Task 2.4: Pre-compute Airport Lookup Map
    const airportMap = new Map<string, Airport>();
    airports.forEach(airport => {
        airportMap.set(airport.code, airport);
    });

    // Render the Client Wrapper, passing data as props
    return (
        <main className={pageStyles.main}> {/* Keep pageStyles.main if it has specific styles for main tag */}
            <div className={pageStyles.container}> {/* Use layoutStyles.container for width constraint */}
                <h1 className={pageStyles.appTitle}>Flight Search</h1>
                <Box sx={{ my: 4, width: '100%' }}> {/* Ensure this Box takes full width of its parent */}
                    <Suspense fallback={<LoadingIndicator />}>
                        <SearchClientWrapper
                            airports={airports}
                            allFlights={allFlights}
                        />
                    </Suspense>
                </Box>
            </div>
        </main>
    );
}
