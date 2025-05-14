import { formatCurrency } from './formatters';

describe('formatCurrency', () => {
    it('should format a number into NL currency string with EUR symbol', () => {
        expect(formatCurrency(1234.56, 'EUR')).toBe('€ 1.234,56');
    });

    it('should format a number into NL currency string with USD symbol', () => {
        // Note: The 'nl-NL' locale will still use . for thousands and , for decimal for USD if specified.
        // The symbol will be US$.
        expect(formatCurrency(1234.56, 'USD')).toBe('US$ 1.234,56');
    });

    it('should handle zero correctly', () => {
        expect(formatCurrency(0, 'EUR')).toBe('€ 0,00');
    });

    it('should handle numbers with no decimal part', () => {
        expect(formatCurrency(1000, 'EUR')).toBe('€ 1.000,00');
    });

    it('should handle numbers with one decimal digit', () => {
        expect(formatCurrency(123.4, 'EUR')).toBe('€ 123,40');
    });
}); 