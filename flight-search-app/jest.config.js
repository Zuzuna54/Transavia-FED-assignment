// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle CSS Modules
        '^.+\.module\.(css|sass|scss)$': 'identity-obj-proxy',
        // Handle global CSS (if any that are not modules and need mocking)
        // For this project, it seems SCSS modules are primary, so this might be less critical
        // but good to have a placeholder if global styles are imported directly into components.
        // If no global styles are imported this way, it can be removed or kept for future.
        '^.+\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
        // Handle static assets
        '^.+\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        // Handle module aliases (important for @/ path)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,
    // Coverage configuration
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.{js,jsx,ts,tsx}',
        '!src/pages/_app.tsx',
        '!src/pages/_document.tsx',
        '!src/app/layout.tsx',
        '!src/app/api/**',
        '!src/components/ThemeRegistry/**',
        '!src/styles/**',
        '!src/types/**',
        '!**/node_modules/**',
        '!<rootDir>/src/app/page.tsx', // Specific exclusion if it's just a wrapper
        '!<rootDir>/src/app/favicon.ico/route.ts', // Exclusion for favicon route
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel', // Next.js uses Babel
    coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],
};

module.exports = createJestConfig(customJestConfig); 