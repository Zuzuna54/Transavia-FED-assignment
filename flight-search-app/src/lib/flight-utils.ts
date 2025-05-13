import { FlightOffer } from '@/types/data';
import { isSameDay } from 'date-fns';

// Define a stricter criteria type for the filter function itself
// Accepts Date object for departureDate, as prepared in SearchClientWrapper
interface FilterCriteria {
    origin: string;
    destination: string;
    departureDate: Date; // Expecting a Date object here
    // returnDate and passengers are ignored by this specific filter
}

/**
 * Filters a list of flight offers based on origin, destination, and exact departure date.
 * @param criteria The filtering criteria with origin/destination codes and a Departure Date object.
 * @param allFlights The complete list of flight offers to filter.
 * @returns An array of matching FlightOffer objects.
 */
export function filterFlights(criteria: FilterCriteria, allFlights: FlightOffer[]): FlightOffer[] {
    if (!allFlights) {
        console.warn("filterFlights called with undefined or null allFlights");
        return [];
    }

    return allFlights.filter(flightOffer => {
        // Basic check for existence of outbound flight details
        if (!flightOffer.outboundFlight) {
            return false;
        }

        const flight = flightOffer.outboundFlight;

        // Check origin and destination match
        const originMatch = flight.departureAirport?.locationCode === criteria.origin;
        const destinationMatch = flight.arrivalAirport?.locationCode === criteria.destination;

        // Check if departure date is the same day
        // Convert the flight's departureDateTime string to a Date object for comparison
        const departureDateMatch = isSameDay(new Date(flight.departureDateTime), criteria.departureDate);

        return originMatch && destinationMatch && departureDateMatch;
    });
} 