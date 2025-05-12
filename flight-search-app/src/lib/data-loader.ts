import fs from 'fs';
import path from 'path';
import { Airport, AirportRaw, AirportDataset, FlightData, FlightOffer } from '@/types/data';

const dataDirectory = path.join(process.cwd(), 'data');

// Function to parse city/country from description (simple example)
function parseDescription(description: string): { city: string | undefined, country: string | undefined } {
    const parts = description.split(',');
    if (parts.length >= 2) {
        const city = parts[0].trim();
        const country = parts[parts.length - 1].trim();
        return { city, country };
    }
    return { city: undefined, country: undefined };
}

export function loadAirports(): Airport[] {
    const filePath = path.join(dataDirectory, 'airports.json');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data: AirportDataset = JSON.parse(fileContents);

        // Map raw data to the cleaner Airport interface
        const airports = data.Airports.map((raw: AirportRaw): Airport => {
            const { city, country } = parseDescription(raw.Description);
            return {
                code: raw.ItemName,
                name: raw.AirportName,
                description: raw.Description,
                city: city,
                country: country,
            };
        });

        // Optional: Basic validation (example)
        if (airports.length === 0) {
            console.warn('Warning: No airports loaded from airports.json');
        }
        const invalidAirport = airports.find(a => !a.code || !a.name);
        if (invalidAirport) {
            console.error('Error: Found airport with missing code or name:', invalidAirport);
            // Depending on severity, you might throw an error here during build
            // throw new Error('Invalid airport data found');
        }

        return airports;
    } catch (error) {
        console.error(`Error loading or parsing airports.json: ${error}`);
        return []; // Return empty array or rethrow error as needed
    }
}

export function loadFlights(): FlightOffer[] {
    const filePath = path.join(dataDirectory, 'flights-from-AMS.json');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data: FlightData = JSON.parse(fileContents);

        // Optional: Basic validation (example)
        if (!data.flightOffer || data.flightOffer.length === 0) {
            console.warn('Warning: No flight offers loaded from flights-from-AMS.json');
            return [];
        }
        const invalidFlight = data.flightOffer.find(f => !f.outboundFlight?.id);
        if (invalidFlight) {
            console.error('Error: Found flight offer with missing outbound flight ID:', invalidFlight);
            // throw new Error('Invalid flight data found');
        }

        return data.flightOffer;
    } catch (error) {
        console.error(`Error loading or parsing flights-from-AMS.json: ${error}`);
        return []; // Return empty array or rethrow error as needed
    }
} 