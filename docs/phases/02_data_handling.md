# Phase 2: Data Loading & Handling

**Goal:** Load and process the provided JSON data (`airports.json`, `flights-from-AMS.json`) into the application.

**Sub-tasks:**

1.  **Task 2.1: Define Data Types/Interfaces**

    - **Description:** Create TypeScript interfaces for Airport and Flight objects based on the structure of `airports.json` and `flights-from-AMS.json`.
    - **Expected Outcome:** Well-defined TypeScript types in `types/data.ts` (or similar) for clear data contracts.
    - **Affected:** New file (e.g., `types/data.ts`).
    - **Development:** Analyze JSON structures and define corresponding `interface Airport { ... }` and `interface Flight { ... }`.
    - **References:** `assignment.md` (data sources), Phase 1 (project structure).

2.  **Task 2.2: Place JSON Files in Project**

    - **Description:** Copy `airports.json` and `flights-from-AMS.json` into an appropriate location within the project (e.g., `public/data/` or a `data/` directory at the root).
    - **Expected Outcome:** JSON files are accessible by the Next.js application.
    - **Affected:** Project directory (e.g., `public/data/`).
    - **Development:** Copy files. Decide if they should be publicly accessible or bundled.
    - **References:** `assignment.md`.

3.  **Task 2.3: Implement Data Loading Utilities**

    - **Description:** Create utility functions to load and parse the JSON data. This could involve using `fetch` for files in `public` or Node.js `fs` module if loading server-side at build time (e.g., in `getStaticProps`).
    - **Expected Outcome:** Functions like `loadAirports(): Promise<Airport[]>` and `loadFlights(): Promise<Flight[]>` in `lib/data-loader.ts` (or similar).
    - **Affected:** New file (e.g., `lib/data-loader.ts`).
    - **Development:** Implement functions using appropriate data fetching methods. Consider error handling.
    - **References:** Task 2.1 (types), Task 2.2 (file location), `assignment.md`.

4.  **Task 2.4: Initial Data Processing/Pre-computation (Optional but Recommended)**

    - **Description:** Process loaded data for easier use. For airports, create a map of airport codes to airport names/details. For flights, ensure dates are easily comparable.
    - **Expected Outcome:** Processed data structures (e.g., `Map<string, Airport>`) that are optimized for lookups and filtering.
    - **Affected:** `lib/data-loader.ts` or a new utility module.
    - **Development:** Transform raw loaded data into more usable formats. For example, convert date strings to `Date` objects if not done during loading.
    - **References:** Task 2.3.

5.  **Task 2.5: Test Data Loading**
    - **Description:** Write a simple test or log data to the console on a temporary page to verify data is loaded and processed correctly.
    - **Expected Outcome:** Confirmation that data loading utilities work and data is in the expected format.
    - **Affected:** Temporary test page or console output.
    - **Development:** Call loading functions in a `useEffect` or `getServerSideProps`/`getStaticProps` and log the results.
    - **References:** Task 2.3, Task 2.4.
