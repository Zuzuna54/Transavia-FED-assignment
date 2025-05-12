import React from 'react';
import { loadAirports, loadFlights } from '@/lib/data-loader';
import { Airport, FlightOffer } from '@/types/data';
import styles from "./page.module.css"; // Keep styles if needed for layout later

// Define props for potential client components (though not used directly in this server component)
interface HomePageProps {
    airports: Airport[];
    flights: FlightOffer[];
    airportMap: Map<string, Airport>;
}

// This page is a Server Component by default in App Router
export default async function Home() {
    // Load data directly on the server
    const airports = loadAirports();
    const flights = loadFlights(); // We load all flights here, filtering will happen later

    // Task 2.4: Pre-compute Airport Lookup Map
    const airportMap = new Map<string, Airport>();
    airports.forEach(airport => {
        airportMap.set(airport.code, airport);
    });

    // We would pass these props down to client components later
    const pageProps: HomePageProps = {
        airports,
        flights,
        airportMap
    };

    // Log data on the server console during build/render
    console.log(`Loaded ${pageProps.airports.length} airports.`);
    console.log(`Loaded ${pageProps.flights.length} flights.`);
    console.log(`Created airport map with ${pageProps.airportMap.size} entries.`);

    // Simplified initial JSX structure
    return (
        <main className={styles.main}> {/* Reuse main style if desired */}
            <h1>Flight Search App</h1>
            <p>Data loaded server-side.</p>

            {/* 
              Placeholder for where FlightSearchForm and FlightResults would go.
              These would likely be Client Components receiving props from this Server Component.
              e.g., <SearchClientWrapper {...pageProps} /> 
            */}

            {/* Temporary display of loaded data count */}
            <div>
                <p>Airports loaded: {pageProps.airports.length}</p>
                <p>Flights loaded: {pageProps.flights.length}</p>
            </div>
        </main>
    );
}
