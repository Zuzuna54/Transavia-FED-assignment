# Flight Search Application - Transavia FED Assignment

## Project Overview

This application is a flight search interface built as part of the Transavia Front-End Developer assignment. It allows users to search for flights based on origin, destination, departure dates, and other criteria. The application fetches flight and airport data, provides filtering capabilities, and displays results in a user-friendly format. It is built using Next.js, React, TypeScript, and Material-UI.

## Features

- **Airport Autocomplete:** Search for origin and destination airports with suggestions.
- **Dynamic Date Availability:** Departure date picker shows only dates for which flights are available between the selected origin and destination.
- **Flexible Search Criteria:**
  - One-way and Round-trip searches.
  - Passenger count selection.
  - Travel class selection.
- **Client-Side Filtering:** Flight results are filtered dynamically on the client side based on search criteria.
- **Responsive Design:** UI adapts to different screen sizes.
- **Flight Results Display:** Shows a list of available flights with details including:
  - Origin and destination airports (city and name).
  - Departure and arrival times.
  - Flight duration.
  - Price breakdown (base fare, taxes, total per passenger).
  - Travel class.
- **Loading and Empty States:** Clear indicators for loading data, initial search prompt, and no results found.
- **Modern UI/UX:** Utilizes Material-UI for components and Framer Motion for subtle animations.
- **Comprehensive Unit Tests:** Core logic, utility functions, and UI components are tested using Jest and React Testing Library.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **Styling:** SCSS Modules, MUI `sx` prop, Emotion
- **State Management:** React Hooks (`useState`, `useMemo`)
- **Date Management:** `date-fns`
- **Animations:** Framer Motion
- **Testing:** Jest, React Testing Library (`@testing-library/react`), `@testing-library/user-event`, `ts-jest`
- **Linting/Formatting:** ESLint, Prettier (implicitly via Next.js defaults)

## Setup Instructions

### Prerequisites

- Node.js (v18.x or later recommended)
- npm (or yarn/pnpm)

### Installation

1.  **Clone the repository (if applicable):**

    ```bash
    git clone <repository-url>
    cd <project-directory>/flight-search-app
    ```

2.  **Install dependencies:**
    Navigate to the `flight-search-app` directory and run:
    ```bash
    npm install
    ```
    (or `yarn install` or `pnpm install`)

## Running the Development Server

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit files.

## Running Tests

This project uses Jest and React Testing Library for unit and integration tests.

- **Run all tests:**

  ```bash
  npm test
  ```

  or

  ```bash
  npm run test
  ```

- **Run tests in watch mode:**

  ```bash
  npm run test:watch
  ```

- **Run tests with coverage report:**
  ```bash
  npm run test:cov
  ```
  This will generate a `coverage` folder in `flight-search-app` with an HTML report that can be viewed in the browser (`flight-search-app/coverage/lcov-report/index.html`).

## Project Structure Overview

```
flight-search-app/
├── .next/              # Next.js build output
├── .swc/               # SWC compiler cache
├── coverage/           # Test coverage reports
├── data/               # Static JSON data (airports.json, flights.json)
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages (layout.tsx, page.tsx)
│   ├── components/     # React components
│   │   ├── atoms/      # Small, reusable UI elements (e.g., LoadingIndicator)
│   │   ├── molecules/  # (Not used in this project, but a common pattern)
│   │   ├── organisms/  # Larger UI sections (e.g., FlightSearchForm, FlightResults)
│   │   └── ThemeRegistry/ # MUI theme and SSR setup
│   ├── contexts/       # (Not used in this project, but for React Context)
│   ├── hooks/          # Custom React hooks (if any)
│   ├── lib/            # Core logic, utilities (data-loader, flight-utils, formatters)
│   ├── styles/         # Global styles, theme, SCSS variables
│   ├── types/          # TypeScript type definitions (e.g., data.ts)
│   └── utils/          # General utility functions (if any, distinct from lib)
├── jest.config.js      # Jest configuration
├── jest.setup.ts       # Jest setup file (after env)
├── next-env.d.ts       # Next.js TypeScript environment types
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── README.md           # This file
└── tsconfig.json       # TypeScript configuration
```

## Key Design Decisions

- **Next.js App Router:** Chosen for its modern features, server components, and optimized builds.
- **Server-Side Data Loading:** Initial airport and flight data (`airports.json`, `flights.json`) are loaded on the server within the main page component (`src/app/page.tsx`) using `getStaticProps`-like behavior inherent to Server Components in the App Router. This ensures data is available on initial page load.
- **Client-Side Filtering:** Flight searching and filtering logic is performed on the client-side in `SearchClientWrapper.tsx` for a responsive user experience without needing to make new API calls for each filter change. All flight data is passed to the client.
- **Material-UI (MUI):** Selected for its comprehensive set of pre-built React components, theming capabilities, and accessibility features, accelerating UI development.
- **TypeScript:** Used for static typing to improve code quality, maintainability, and reduce runtime errors.
- **State Management:** Primarily uses React's built-in hooks (`useState`, `useMemo`) for local component state. For the main search interaction, props are passed down from `SearchClientWrapper` to `FlightSearchForm` and `FlightResults`.
- **Atomic Design Principles (loosely followed):** Components are organized into `atoms` and `organisms` to promote reusability and maintainability.
- **Date Handling with `date-fns`:** A lightweight and robust library for date parsing, formatting, and manipulation.
- **Accessibility:** Efforts were made to use semantic HTML and appropriate ARIA attributes, leveraging MUI's built-in accessibility features. Testing includes checks for labels and roles.
- **Styling:** A combination of global SCSS (`globals.scss`), SCSS Modules for component-specific styles (e.g., `FlightResults.module.scss`), and MUI's `sx` prop for dynamic/inline styling. A custom MUI theme is defined in `src/styles/theme.ts`.

## Known Limitations or Future Improvements

- **No Real Backend/API:** Flight data is static (JSON files). A real application would connect to a flight booking API.
- **Limited Scalability of Client-Side Filtering:** With very large datasets, client-side filtering might become slow. Pagination or server-side filtering would be needed.
- **Basic Error Handling:** While some error states are handled (e.g., form validation, no results), comprehensive error boundaries and user feedback could be improved.
- **Advanced Search Features:** Could be extended with features like multi-city search, flexible dates (+/- 3 days), or more complex passenger type selections (adults, children, infants).
- **Return Flight Logic:** The current filtering focuses on outbound flights. A full implementation would need to handle return flight selection and pairing.
- **Performance Optimization:** While generally performant for the given dataset, further optimization (e.g., memoization, `React.lazy` for larger components, bundle analysis) could be explored for larger applications.
- **End-to-End (E2E) Tests:** While unit and integration tests are present, E2E tests (e.g., using Cypress or Playwright) would provide an additional layer of confidence.
