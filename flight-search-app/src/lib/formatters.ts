// Helper function for currency formatting
export const formatCurrency = (value: number, currencyCode: string): string => {
    return new Intl.NumberFormat('nl-NL', { // Example: Netherlands locale
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}; 