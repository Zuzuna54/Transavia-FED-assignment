import '@testing-library/jest-dom';
import { MotionGlobalConfig } from 'framer-motion';
import React from 'react'; // Import React for JSX
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock Framer Motion
// import { MotionGlobalConfig } from 'framer-motion';
// MotionGlobalConfig.skipAnimations = true;

// If you were using the manual mock from __mocks__/framer-motion.ts:
// jest.mock('framer-motion');

// Mock next/router (if needed for older Next.js versions or specific use cases)
// jest.mock('next/router', () => require('next-router-mock'));

// Mock next/navigation for App Router (if Link or useRouter from next/navigation is used)
// See https://github.com/scottrippey/next-router-mock#app-router
jest.mock('next/navigation', () => {
    const actual = jest.requireActual('next/navigation');
    return {
        ...actual,
        useRouter: jest.fn().mockReturnValue({
            push: jest.fn(),
            replace: jest.fn(),
            refresh: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            prefetch: jest.fn(),
            // Add other router methods if your tests use them
        }),
        useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
        usePathname: jest.fn().mockReturnValue('/'),
        // Add other hooks like useSelectedLayoutSegment if needed
    };
});

// Solution for Framer Motion: Disable animations globally for tests
if (MotionGlobalConfig) {
    MotionGlobalConfig.skipAnimations = true;
    console.log('Framer Motion animations disabled for tests.');
} else {
    // This case should ideally not be hit if framer-motion is installed correctly
    // and MotionGlobalConfig is exported as expected.
    console.warn('MotionGlobalConfig not found in framer-motion after import. Animations will not be disabled by default.');
}

// Example of mocking a global API if needed
// global.matchMedia = global.matchMedia || function () {
//   return {
//     matches: false,
//     addListener: jest.fn(),
//     removeListener: jest.fn(),
//   };
// };

/**
 * A wrapper component that provides the MUI LocalizationProvider context for tests.
 * This is useful for components that use MUI DatePickers.
 * 
 * Usage in tests:
 * import { render } from '@testing-library/react';
 * import { AllTheProviders } from '../setupTests'; // Adjust path as needed
 * 
 * render(<MyComponentWithDatePicker />,
 *   { wrapper: AllTheProviders }
 * );
 */
export const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LocalizationProvider dateAdapter= { AdapterDateFns } >
        { children }
        </LocalizationProvider>
    );
};

// Re-export render from RTL with the global wrapper, or use a custom render utility
// For simplicity here, we won't override global render but advise using it in tests:
// Example: render(<MyComponent />, { wrapper: AllTheProviders });
// Or, more commonly, create a custom render function:
/*
import { render as rtlRender, RenderOptions } from '@testing-library/react';

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
    return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
*/

// For now, individual tests will wrap with <LocalizationProvider> or use a test-specific setup.
// The setupTests.ts is more for global mocks and polyfills.
// However, if EVERY component test needs LocalizationProvider, a custom render function is best.
// Let's assume for now we will wrap specific tests if needed or handle it in a dedicated test util file. 