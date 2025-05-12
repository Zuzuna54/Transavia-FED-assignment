# Phase 7: Flight Results Display Component

**Goal:** Create a component to display the filtered flight results on the page.

**Sub-tasks:**

1.  **Task 7.1: Create Results Component File**

    - **Description:** Create a new React component file (e.g., `components/FlightResults.tsx`).
    - **Expected Outcome:** An empty functional component skeleton.
    - **Affected:** New file (`components/FlightResults.tsx`).
    - **Development:** Create the file with a basic React functional component export.
    - **References:** Phase 1 (project structure).

2.  **Task 7.2: Define Component Props**

    - **Description:** Define the props for the `FlightResults` component. It should accept the list of filtered flights and potentially the airport map for displaying names.
    - **Expected Outcome:** Props interface defined (e.g., `interface FlightResultsProps { flights: Flight[]; airportMap: Map<string, Airport>; }`).
    - **Affected:** `components/FlightResults.tsx`.
    - **Development:** Define the interface using the types from Task 2.1.
    - **References:** Task 2.1, Task 6.4 (filtered flights state), Task 2.4 (airport map).

3.  **Task 7.3: Integrate Results Component into Main Page**

    - **Description:** Import and render the `FlightResults` component on the main application page (`pages/index.tsx`), passing the filtered flights state (Task 6.4) and airport map (Task 2.4/4.1) as props.
    - **Expected Outcome:** The `FlightResults` component is rendered on the page, initially showing nothing or a placeholder.
    - **Affected:** `pages/index.tsx`.
    - **Development:** Import the component, render it conditionally (e.g., only after a search has been performed) or always, and pass the required props.
    - **References:** Task 7.1, Task 6.4, Task 4.1.

4.  **Task 7.4: Implement Results Display Logic**

    - **Description:** Inside `FlightResults.tsx`, map over the `flights` prop and render the details for each flight (e.g., origin/destination names, times, price).
    - **Expected Outcome:** A list or table displaying the relevant information for each found flight.
    - **Affected:** `components/FlightResults.tsx`.
    - **Development:** Use `flights.map(...)` to iterate. For each flight, display `flight.departureAirport.code` (or lookup name using `airportMap`), `flight.arrivalAirport.code` (or lookup name), `flight.departureDateTime`, `flight.arrivalDateTime`, and `flight.price.totalPriceAllPassengers`.
    - **References:** Task 7.2, Task 2.1 (Flight type), `assignment.md` (price field).

5.  **Task 7.5: Display Airport Names (User Friendly)**

    - **Description:** Use the `airportMap` prop to display full airport names instead of just codes in the results.
    - **Expected Outcome:** Results show "Amsterdam (AMS)" instead of just "AMS".
    - **Affected:** `components/FlightResults.tsx`.
    - **Development:** Modify the rendering logic (Task 7.4) to look up airport names using `airportMap.get(flight.departureAirport.code)?.name` (handle potential undefined).
    - **References:** Task 7.4, Task 2.4.

6.  **Task 7.6: Handle "No Results" Message**

    - **Description:** Display a clear message within the `FlightResults` component if the `flights` prop is an empty array after a search.
    - **Expected Outcome:** A message like "No flights found matching your criteria." is shown when applicable.
    - **Affected:** `components/FlightResults.tsx`.
    - **Development:** Add a conditional check at the beginning of the component: `if (flights.length === 0) { return <p>No flights found...</p>; }`. Consider also distinguishing between initial state and no results found after search.
    - **References:** Task 7.4, Task 6.5.

7.  **Task 7.7: Format Date/Time and Price**
    - **Description:** Format the display of dates, times, and currency values for better readability.
    - **Expected Outcome:** Dates/times shown in a user-friendly format (e.g., "Nov 15, 2022 10:30"), price shown with currency symbol (e.g., "€123.45").
    - **Affected:** `components/FlightResults.tsx`, potentially new utility functions.
    - **Development:** Use libraries like `date-fns` or `Intl.DateTimeFormat`/`Intl.NumberFormat` for formatting. Create utility functions if needed.
    - **References:** Task 7.4.
