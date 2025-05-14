import { FlightOffer } from '@/types/data';
// Removed isSameDay as we'll use UTC date components for comparison
// import { isSameDay } from 'date-fns'; 

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
        if (!flightOffer.outboundFlight) {
            return false;
        }

        const flight = flightOffer.outboundFlight;

        const originMatch = flight.departureAirport?.locationCode === criteria.origin;
        const destinationMatch = flight.arrivalAirport?.locationCode === criteria.destination;

        // Compare year, month, and day in UTC for robust date matching
        const flightDateUTC = new Date(flight.departureDateTime);
        // criteria.departureDate is already a Date object, assumed to be set correctly for UTC comparison (e.g., midnight UTC of target day)
        const criteriaDateUTC = criteria.departureDate;

        const departureDateMatch =
            flightDateUTC.getUTCFullYear() === criteriaDateUTC.getUTCFullYear() &&
            flightDateUTC.getUTCMonth() === criteriaDateUTC.getUTCMonth() &&
            flightDateUTC.getUTCDate() === criteriaDateUTC.getUTCDate();

        return originMatch && destinationMatch && departureDateMatch;
    });
} 