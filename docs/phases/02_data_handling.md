# Phase 2: Data Loading & Type Definition

**Goal:** Efficiently load, parse, and type-define the provided JSON data using Next.js SSG capabilities and strict TypeScript types.

**Sub-tasks:**

1.  **Task 2.1: Define Strict Data Types/Interfaces**

    - **Description:** Create precise TypeScript interfaces for Airport and Flight objects based on `airports.json` and `flights-from-AMS.json`. Avoid using `any`. Use specific types (e.g., `string`, `number`, union types if applicable).
    - **Expected Outcome:** Well-defined, strict TypeScript types in `src/types/data.ts`. Example: `interface Airport { code: string; name: string; city: string; country: string; ... }`, `interface Flight { id: string; departureAirport: { code: string }; arrivalAirport: { code: string }; departureDateTime: string; arrivalDateTime: string; price: { totalPriceAllPassengers: number; currency: string }; ... }`.
    - **Affected:** New file (`src/types/data.ts`).
    - **Development:** Analyze JSON structure carefully. Define all relevant fields with correct types. Consider creating separate types for nested objects (like `AirportIdentifier`, `PriceInfo`). [Reference: Iqbal Pahlevi A - Medium](https://iqbalpa.medium.com/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-2ee5693e73a9)
    - **References:** `assignment.md` (data sources), Phase 1 (project structure, TS config).

2.  **Task 2.2: Place JSON Files for Build-Time Access**

    - **Description:** Place `airports.json` and `flights-from-AMS.json` in a location accessible during the build process (e.g., a `data/` directory at the project root, _not_ in `public/` if using `getStaticProps` with `fs`).
    - **Expected Outcome:** JSON files are correctly located for reading via Node.js `fs` module at build time.
    - **Affected:** New directory (`data/`).
    - **Development:** Create `data/` directory, copy JSON files into it.
    - **References:** `assignment.md`.

3.  **Task 2.3: Implement Data Loading with SSG (`getStaticProps`)**

    - **Description:** Create utility functions within `src/lib/data-loader.ts` (or similar) to read and parse JSON files using Node.js `fs` and `path` modules. Implement data fetching within `getStaticProps` on the main page (`src/pages/index.tsx`) to load data at build time.
    - **Expected Outcome:** Functions like `loadAirports(): Airport[]` and `loadFlights(): Flight[]`. `getStaticProps` in `index.tsx` successfully loads and returns this data as props.
    - **Affected:** New file (`src/lib/data-loader.ts`), `src/pages/index.tsx`.
    - **Development:** Use `fs.readFileSync` and `JSON.parse`. Handle potential file reading/parsing errors gracefully. In `getStaticProps`, call these functions and return data in the `props` object. Ensure data types are correctly applied.
    - **References:** Task 2.1 (types), Task 2.2 (file location), `assignment.md`, [Next.js Data Fetching Docs](https://nextjs.org/docs/basic-features/data-fetching/get-static-props).

4.  **Task 2.4: Pre-compute Airport Lookup Map**

    - **Description:** Process the loaded airport list into a `Map<string, Airport>` for efficient O(1) lookups by airport code later (e.g., in autocomplete and results display).
    - **Expected Outcome:** An `airportMap: Map<string, Airport>` is generated from the loaded `Airport[]`, likely within `getStaticProps` or passed through props.
    - **Affected:** `src/lib/data-loader.ts` (optional helper), `src/pages/index.tsx` (`getStaticProps`).
    - **Development:** After loading airports in `getStaticProps`, create a `new Map()` and populate it by iterating over the `airports` array. Pass both the raw list (if needed) and the map as props.
    - **References:** Task 2.3.

5.  **Task 2.5: Type Page Props**

    - **Description:** Define a type for the props of the main page component (`src/pages/index.tsx`) including the loaded airports (list and/or map) and flights, using `InferGetStaticPropsType` for type safety.
    - **Expected Outcome:** The page component receives strongly-typed props from `getStaticProps`.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** `import { InferGetStaticPropsType } from 'next'; export const getStaticProps = ...; type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>; const HomePage: NextPage<HomePageProps> = (props) => { ... };`
    - **References:** Task 2.3, Task 2.4, [Next.js TypeScript Docs](https://nextjs.org/docs/basic-features/typescript#pages).

6.  **Task 2.6: Initial Data Validation (Optional)**
    - **Description:** Add basic checks during data loading or processing to ensure data conforms to expected formats (e.g., airport codes exist, prices are numbers). Log warnings/errors if inconsistencies found.
    - **Expected Outcome:** Increased confidence in data integrity during development.
    - **Affected:** `src/lib/data-loader.ts`, `getStaticProps`.
    - **Development:** Add checks within loading functions or after parsing in `getStaticProps`. Use `console.warn` or throw build errors for critical issues.
    - **References:** Task 2.3, Task 2.4.
