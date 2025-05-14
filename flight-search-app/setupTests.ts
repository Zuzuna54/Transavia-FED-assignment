import '@testing-library/jest-dom';
import { MotionGlobalConfig } from 'framer-motion';

// Mock next/navigation for App Router
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
        }),
        useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
        usePathname: jest.fn().mockReturnValue('/'),
    };
});

// Solution for Framer Motion: Disable animations globally for tests
if (MotionGlobalConfig) {
    MotionGlobalConfig.skipAnimations = true;
    console.log('Framer Motion animations disabled for tests.');
} else {
    console.warn('MotionGlobalConfig not found in framer-motion after import. Animations will not be disabled by default.');
} 