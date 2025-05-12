# Phase 6: Flight Filtering Logic & State Management

**Goal:** Implement efficient flight filtering based on validated form criteria, manage application state for search results and loading indicators, and ensure a clean separation of concerns.

**Sub-tasks:**

1.  **Task 6.1: Define Search Criteria Type**

    - **Description:** Define a clear TypeScript type for the search criteria object that the form passes to the filtering logic.
    - **Expected Outcome:** A type like `interface FlightSearchCriteria { originCode: string; destinationCode: string; departureDate: Date; }` in `src/types/data.ts` (or form component file).
    - **Affected:** `src/types/data.ts`, `src/components/organisms/FlightSearchForm/FlightSearchForm.tsx`, `src/pages/index.tsx`.
    - **Development:** Create the interface. Ensure `FlightSearchForm` passes an object of this type (Task 5.5).
    - **References:** Task 2.1, Task 5.5.

2.  **Task 6.2: Page-Level State for Filtered Flights & Loading**

    - **Description:** In the main page component (`src/pages/index.tsx`), use `useState` to manage the list of filtered flights, a loading state for search operation, and potentially an initial search/no search yet state.
    - **Expected Outcome:** State variables: `filteredFlights: Flight[]`, `isLoading: boolean`, `hasSearched: boolean`.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** `const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]); const [isLoading, setIsLoading] = useState(false); const [hasSearched, setHasSearched] = useState(false);`.
    - **References:** Task 2.1 (Flight type).

3.  **Task 6.3: Implement `onSearchSubmit` Handler on Page**

    - **Description:** Create the actual search submission handler on `pages/index.tsx` that receives `FlightSearchCriteria` from the form. This handler will set `isLoading` to true, call the filtering logic, update `filteredFlights`, set `isLoading` to false, and `hasSearched` to true.
    - **Expected Outcome:** A function `handleFlightSearch(criteria: FlightSearchCriteria)` that orchestrates the search process.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** `const handleFlightSearch = async (criteria: FlightSearchCriteria) => { setIsLoading(true); setHasSearched(true); // Simulate async for loading state if filtering is very fast // await new Promise(resolve => setTimeout(resolve, 500)); const results = filterFlights(criteria, props.allFlights); // props.allFlights from getStaticProps setFilteredFlights(results); setIsLoading(false); };`. Pass this to `FlightSearchForm`.
    - **References:** Task 6.1, Task 6.2, Task 6.4 (filterFlights function), Phase 3 (form prop).

4.  **Task 6.4: Implement Core Flight Filtering Utility**

    - **Description:** Create a pure utility function (e.g., in `src/lib/flight-utils.ts`) `filterFlights(criteria: FlightSearchCriteria, allFlights: Flight[]): Flight[]`. This function must accurately filter flights based on origin code, destination code, and the exact departure date. Remember `flights-from-AMS.json` only has AMS origin, so filtering by other origins will yield no results unless data is expanded.
    - **Expected Outcome:** A testable, efficient function that returns an array of matching `Flight` objects.
    - **Affected:** New file (`src/lib/flight-utils.ts` or similar).
    - **Development:** Import `FlightSearchCriteria`, `Flight` types, and `isSameDay` from `date-fns`. `return allFlights.filter(flight => flight.departureAirport.code === criteria.originCode && flight.arrivalAirport.code === criteria.destinationCode && isSameDay(new Date(flight.departureDateTime), criteria.departureDate));`.
    - **References:** Task 6.1, Task 2.1 (Flight type), Phase 1 (date-fns).

5.  **Task 6.5: Handle No Results Gracefully**

    - **Description:** The `filterFlights` function will naturally return an empty array if no matches. The page state (`filteredFlights`) will reflect this. The results display component (Phase 7) will be responsible for showing a "No results" message.
    - **Expected Outcome:** `filteredFlights` state correctly becomes `[]` when no flights match. No special logic needed here beyond what `filter()` provides.
    - **Affected:** `src/lib/flight-utils.ts` (by its nature), `src/pages/index.tsx` (state update).
    - **Development:** Ensure the filtering logic in Task 6.4 correctly returns empty array on no match.
    - **References:** Task 6.4, Phase 7.

6.  **Task 6.6: Consider State Management for Scalability (Context API or Zustand)**
    - **Description:** For this assignment, `useState` in the page component is likely sufficient. However, for a senior-level approach, briefly consider if React Context API or Zustand would be beneficial if the app were to grow (e.g., multiple components needing search state/results, more complex global state). Document this consideration.
    - **Expected Outcome:** A decision to stick with `useState` for now, but with an understanding of when to escalate state management.
    - **Affected:** Design decision, potentially comments in code.
    - **Development:** Stick to `useState` on `pages/index.tsx`. Add a comment: `// For more complex state sharing, consider Context API or Zustand.` [Reference: Pedals Up - Medium](https://medium.com/@PedalsUp/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-626257980e60)
    - **References:** Task 6.2.
