export interface Airport {
    code: string; // Mapped from ItemName
    name: string; // Mapped from AirportName
    description: string; // Mapped from Description
    // Consider adding city and country if you parse them from Description
    city?: string;
    country?: string;
}

export interface AirportRaw {
    ItemName: string;
    AirportName: string;
    Description: string;
}

export interface AirportDataset {
    Airports: AirportRaw[];
}

export interface AirportLocation {
    locationCode: string;
}

export interface MarketingAirline {
    companyShortName: string;
}

export interface OutboundFlightDetails {
    id: string;
    departureDateTime: string; // ISO Date string, can be converted to Date object
    arrivalDateTime: string;   // ISO Date string, can be converted to Date object
    marketingAirline: MarketingAirline;
    flightNumber: number;
    departureAirport: AirportLocation;
    arrivalAirport: AirportLocation;
}

export interface PricingInfo {
    totalPriceAllPassengers: number;
    totalPriceOnePassenger: number;
    baseFare: number;
    taxSurcharge: number;
    currencyCode: string;
    productClass: string;
}

export interface Deeplink {
    href: string;
}

export interface FlightOffer {
    outboundFlight: OutboundFlightDetails;
    pricingInfoSum: PricingInfo;
    deeplink: Deeplink;
}

export interface ResultSet {
    count: number;
}

export interface FlightData {
    resultSet: ResultSet;
    flightOffer: FlightOffer[];
} 