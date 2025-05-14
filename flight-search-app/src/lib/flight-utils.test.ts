import { filterFlights } from './flight-utils';
import { FlightOffer, OutboundFlightDetails } from '@/types/data';

// Mock data for testing, corrected according to type definitions
const mockFlights: FlightOffer[] = [
    {
        // ID for test identification is now outboundFlight.id
        outboundFlight: {
            id: 'OB1',
            departureAirport: { locationCode: 'AMS' },
            arrivalAirport: { locationCode: 'LHR' },
            departureDateTime: '2022-10-12T10:00:00Z',
            arrivalDateTime: '2022-10-12T11:00:00Z',
            marketingAirline: { companyShortName: 'KL' },
            flightNumber: 1001,
        },
        pricingInfoSum: { totalPriceOnePassenger: 100, baseFare: 80, taxSurcharge: 20, currencyCode: 'EUR', productClass: 'Economy', totalPriceAllPassengers: 100 },
        deeplink: { href: '/deeplink1' }
    },
    {
        outboundFlight: {
            id: 'OB2',
            departureAirport: { locationCode: 'AMS' },
            arrivalAirport: { locationCode: 'CDG' },
            departureDateTime: '2022-10-12T14:00:00Z',
            arrivalDateTime: '2022-10-12T15:15:00Z',
            marketingAirline: { companyShortName: 'AF' },
            flightNumber: 2002,
        },
        pricingInfoSum: { totalPriceOnePassenger: 120, baseFare: 90, taxSurcharge: 30, currencyCode: 'EUR', productClass: 'Economy', totalPriceAllPassengers: 120 },
        deeplink: { href: '/deeplink2' }
    },
    {
        outboundFlight: {
            id: 'OB3',
            departureAirport: { locationCode: 'LHR' },
            arrivalAirport: { locationCode: 'AMS' },
            departureDateTime: '2022-10-13T09:00:00Z', // Different date
            arrivalDateTime: '2022-10-13T10:00:00Z',
            marketingAirline: { companyShortName: 'BA' },
            flightNumber: 3003,
        },
        pricingInfoSum: { totalPriceOnePassenger: 110, baseFare: 85, taxSurcharge: 25, currencyCode: 'EUR', productClass: 'Economy', totalPriceAllPassengers: 110 },
        deeplink: { href: '/deeplink3' }
    },
    {
        // Flight with missing outboundFlight for robustness testing - needs a deeplink for type consistency
        // For a strictly typed FlightOffer, outboundFlight must exist. How filterFlights handles this is key.
        // If filterFlights expects valid FlightOffer[], this mock might need adjustment or the test refined.
        // For now, let's assume filterFlights internally checks for outboundFlight existence.
        outboundFlight: null as unknown as OutboundFlightDetails, // More specific cast than 'as any'
        pricingInfoSum: { totalPriceOnePassenger: 0, baseFare: 0, taxSurcharge: 0, currencyCode: 'EUR', productClass: 'Economy', totalPriceAllPassengers: 0 },
        deeplink: { href: '/deeplink4' }
    }
];

describe('filterFlights', () => {
    it('should return flights matching origin, destination, and date', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-12T00:00:00Z') };
        const results = filterFlights(criteria, mockFlights);
        expect(results).toHaveLength(1);
        expect(results[0].outboundFlight.id).toBe('OB1'); // Check outboundFlight.id
    });

    it('should return an empty array if no flights match origin', () => {
        const criteria = { origin: 'JFK', destination: 'LHR', departureDate: new Date('2022-10-12T00:00:00Z') };
        const results = filterFlights(criteria, mockFlights);
        expect(results).toHaveLength(0);
    });

    it('should return an empty array if no flights match destination', () => {
        const criteria = { origin: 'AMS', destination: 'JFK', departureDate: new Date('2022-10-12T00:00:00Z') };
        const results = filterFlights(criteria, mockFlights);
        expect(results).toHaveLength(0);
    });

    it('should return an empty array if no flights match date', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-11T00:00:00Z') };
        const results = filterFlights(criteria, mockFlights);
        expect(results).toHaveLength(0);
    });

    it('should handle different timezones correctly for date matching (ensure same day UTC)', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-12T23:59:59Z') };
        const results = filterFlights(criteria, mockFlights);
        expect(results).toHaveLength(1);
        expect(results[0].outboundFlight.id).toBe('OB1');
    });

    it('should return an empty array if allFlights is empty', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-12T00:00:00Z') };
        const results = filterFlights(criteria, []);
        expect(results).toHaveLength(0);
    });

    it('should return an empty array if allFlights is null or undefined', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-12T00:00:00Z') };
        // @ts-expect-error testing invalid input for filterFlights robustness
        expect(filterFlights(criteria, null)).toEqual([]);
        // @ts-expect-error testing invalid input for filterFlights robustness
        expect(filterFlights(criteria, undefined)).toEqual([]);
    });

    it('should correctly filter out flights with null outboundFlight details', () => {
        const criteria = { origin: 'AMS', destination: 'LHR', departureDate: new Date('2022-10-12T00:00:00Z') };
        // This test relies on mockFlights containing an item with outboundFlight: null
        const results = filterFlights(criteria, mockFlights);
        // Only OB1 should match. OB4 (with null outboundFlight) should be filtered out by the function's internal checks.
        expect(results).toHaveLength(1);
        expect(results.find(f => f.outboundFlight?.id === 'OB1')).toBeDefined();
        expect(results.find(f => f.outboundFlight?.id === 'OB4')).toBeUndefined(); // or check length more precisely
    });
}); 