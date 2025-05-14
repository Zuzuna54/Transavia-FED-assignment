import { loadAirports, loadFlights } from './data-loader';
import fs from 'fs';
// Import path for type annotation, but it will be mocked.
import path from 'path';
import { Airport, FlightOffer } from '@/types/data';

// Mock the 'fs' module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock the 'path' module
jest.mock('path', () => {
    // These constants are now defined inside the factory, so they are initialized when the mock is created.
    const originalPath = jest.requireActual('path');
    const MOCK_BASE_DATA_PATH_IDENTIFIER = originalPath.join(process.cwd(), 'data');
    const MOCK_AIRPORTS_FILE_PATH_IDENTIFIER = originalPath.join(MOCK_BASE_DATA_PATH_IDENTIFIER, 'airports.json');
    const MOCK_FLIGHTS_FILE_PATH_IDENTIFIER = originalPath.join(MOCK_BASE_DATA_PATH_IDENTIFIER, 'flights-from-AMS.json');

    return {
        ...originalPath,
        join: jest.fn((...args: string[]) => {
            const joinedPath = originalPath.join(...args);
            if (joinedPath === MOCK_AIRPORTS_FILE_PATH_IDENTIFIER) {
                return MOCK_AIRPORTS_FILE_PATH_IDENTIFIER;
            }
            if (joinedPath === MOCK_FLIGHTS_FILE_PATH_IDENTIFIER) {
                return MOCK_FLIGHTS_FILE_PATH_IDENTIFIER;
            }
            // If it's just asking for the data directory, also return that specific identifier
            // This might not be strictly necessary if the code always joins to the full file path directly.
            if (joinedPath === MOCK_BASE_DATA_PATH_IDENTIFIER) {
                return MOCK_BASE_DATA_PATH_IDENTIFIER;
            }
            // For any other calls, return the normally joined path to avoid breaking other path operations
            return joinedPath;
        }),
        // Mock `sep` explicitly if it's used directly by the tested code and needs to be consistent,
        // though spreading originalPath should cover it.
        sep: originalPath.sep,
    };
});

// For assertions, use the same identifiers. These need to be accessible to the describe block.
// Re-declare them here using originalPath again for clarity and direct use in tests.
const actualPathForTestAssertions = jest.requireActual('path');
const MOCK_AIRPORTS_PATH_FOR_ASSERTION = actualPathForTestAssertions.join(process.cwd(), 'data', 'airports.json');
const MOCK_FLIGHTS_PATH_FOR_ASSERTION = actualPathForTestAssertions.join(process.cwd(), 'data', 'flights-from-AMS.json');

describe('Data Loading Utilities', () => {
    beforeEach(() => {
        mockedFs.readFileSync.mockReset();
        (path.join as jest.Mock).mockClear();
    });

    describe('loadAirports', () => {
        it('should load and parse airports correctly from airports.json', () => {
            const mockAirportData = {
                Airports: [
                    { ItemName: 'AMS', AirportName: 'Amsterdam Airport Schiphol', Description: 'Amsterdam, Netherlands' },
                    { ItemName: 'LHR', AirportName: 'London Heathrow Airport', Description: 'London, United Kingdom' },
                ],
            };
            mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockAirportData));
            const airports = loadAirports();
            expect(mockedFs.readFileSync).toHaveBeenCalledWith(MOCK_AIRPORTS_PATH_FOR_ASSERTION, 'utf8');
            expect(airports).toHaveLength(2);
            expect(airports[0]).toEqual<Airport>({
                code: 'AMS',
                name: 'Amsterdam Airport Schiphol',
                description: 'Amsterdam, Netherlands',
                city: 'Amsterdam',
                country: 'Netherlands',
            });
        });

        it('should return an empty array and log error if airports.json is not found or unreadable', () => {
            mockedFs.readFileSync.mockImplementation(() => { throw new Error('File not found'); });
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const airports = loadAirports();
            expect(airports).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading or parsing airports.json'));
            consoleErrorSpy.mockRestore();
        });

        it('should return an empty array and log error if airports.json content is invalid JSON', () => {
            mockedFs.readFileSync.mockReturnValue('invalid json');
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const airports = loadAirports();
            expect(airports).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading or parsing airports.json'));
            consoleErrorSpy.mockRestore();
        });

        it('should handle empty airport data gracefully with a warning', () => {
            const mockAirportData = { Airports: [] };
            mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockAirportData));
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
            const airports = loadAirports();
            expect(airports).toEqual([]);
            expect(consoleWarnSpy).toHaveBeenCalledWith('Warning: No airports loaded from airports.json');
            consoleWarnSpy.mockRestore();
        });
    });

    describe('loadFlights', () => {
        const mockFlightOfferData: FlightOffer = {
            outboundFlight: {
                id: 'FL001', departureDateTime: '2023-01-01T10:00:00Z', arrivalDateTime: '2023-01-01T12:00:00Z',
                marketingAirline: { companyShortName: 'XY' }, flightNumber: 123,
                departureAirport: { locationCode: 'AAA' }, arrivalAirport: { locationCode: 'BBB' }
            },
            pricingInfoSum: { totalPriceOnePassenger: 100, baseFare: 80, taxSurcharge: 20, currencyCode: 'EUR', productClass: 'Y', totalPriceAllPassengers: 100 },
            deeplink: { href: '/some/link' }
        };
        it('should load and parse flights correctly from flights-from-AMS.json', () => {
            const mockFlightDataFileContent = { resultSet: { count: 1 }, flightOffer: [mockFlightOfferData] };
            mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockFlightDataFileContent));
            const flights = loadFlights();
            expect(mockedFs.readFileSync).toHaveBeenCalledWith(MOCK_FLIGHTS_PATH_FOR_ASSERTION, 'utf8');
            expect(flights).toHaveLength(1);
            expect(flights[0].outboundFlight.id).toBe('FL001');
        });

        it('should return an empty array and log error if flights-from-AMS.json is not found or unreadable', () => {
            mockedFs.readFileSync.mockImplementation(() => { throw new Error('File not found'); });
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const flights = loadFlights();
            expect(flights).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading or parsing flights-from-AMS.json'));
            consoleErrorSpy.mockRestore();
        });

        it('should return an empty array and log error if flights-from-AMS.json content is invalid JSON', () => {
            mockedFs.readFileSync.mockReturnValue('invalid json');
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            const flights = loadFlights();
            expect(flights).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error loading or parsing flights-from-AMS.json'));
            consoleErrorSpy.mockRestore();
        });

        it('should handle empty flight data gracefully with a warning', () => {
            const mockFlightDataFileContent = { resultSet: { count: 0 }, flightOffer: [] };
            mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockFlightDataFileContent));
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });
            const flights = loadFlights();
            expect(flights).toEqual([]);
            expect(consoleWarnSpy).toHaveBeenCalledWith('Warning: No flight offers loaded from flights-from-AMS.json');
            consoleWarnSpy.mockRestore();
        });
    });
}); 