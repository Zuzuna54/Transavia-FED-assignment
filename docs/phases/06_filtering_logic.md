# Phase 6: Form Submission & Flight Filtering Logic

**Goal:** Implement the logic to filter flights based on form input upon valid submission.

**Sub-tasks:**

1.  **Task 6.1: Pass Flight Data to Page/Component**

    - **Description:** Load the `flights-from-AMS.json` data (using methods from Phase 2) on the main page and make it available for filtering.
    - **Expected Outcome:** Flight data (e.g., `Flight[]`) is accessible within the page component (`pages/index.tsx`).
    - **Affected:** `pages/index.tsx`.
    - **Development:** Use `getStaticProps` or `getServerSideProps` alongside airport data loading (Task 4.1). Load flights using the utility from Task 2.3.
    - **References:** Phase 2 (Data Loading), Task 4.1.

2.  **Task 6.2: Lift State Up / Callback Mechanism**

    - **Description:** Modify the `FlightSearchForm` to communicate the submitted (and validated) form data (origin code, destination code, date) back to the parent page component (`pages/index.tsx`).
    - **Expected Outcome:** The main page receives the search criteria upon successful form submission.
    - **Affected:** `pages/index.tsx`, `components/FlightSearchForm.tsx`.
    - **Development:** Pass a callback function (e.g., `onSearchSubmit`) as a prop from the page to the form. Call this function in `handleSubmit` (Task 3.6/5.5) with the validated state data (Task 4.5, Task 3.5 date).
    - **References:** Task 3.6, Task 4.5, Task 5.5.

3.  **Task 6.3: Implement Flight Filtering Logic**

    - **Description:** Create a function (likely in `pages/index.tsx` or a utility file) that takes the search criteria (origin code, destination code, date) and the list of all flights, returning only the matching flights.
    - **Expected Outcome:** A function `filterFlights(criteria, allFlights): Flight[]`.
    - **Affected:** `pages/index.tsx` or new `utils/flight-filter.ts`.
    - **Development:** Implement the filtering logic: match `flight.departureAirport.code` with `criteria.originCode`, `flight.arrivalAirport.code` with `criteria.destinationCode`, and compare the `flight.departureDateTime` (or just the date part) with `criteria.date`. Remember the data only contains AMS origin flights.
    - **References:** Task 6.1, Task 6.2, Task 2.1 (Flight type), `assignment.md` (data specifics).

4.  **Task 6.4: Manage Filtered Flights State**

    - **Description:** In the main page component (`pages/index.tsx`), use `useState` to store the list of filtered flights found after a search.
    - **Expected Outcome:** A state variable (e.g., `filteredFlights: Flight[]`) holding the search results.
    - **Affected:** `pages/index.tsx`.
    - **Development:** Initialize state `useState<Flight[]>([])`. In the `onSearchSubmit` callback (Task 6.2), call the filtering function (Task 6.3) and update this state with the results.
    - **References:** Task 6.2, Task 6.3.

5.  **Task 6.5: Handle No Results Found**
    - **Description:** Ensure the state and subsequent display logic correctly handle cases where no matching flights are found by the filter.
    - **Expected Outcome:** The `filteredFlights` state might be an empty array, and the UI should reflect this appropriately (covered in Phase 7).
    - **Affected:** `pages/index.tsx` (state update logic).
    - **Development:** The filtering function (Task 6.3) should naturally return `[]` if no matches. Ensure the state update (Task 6.4) handles this.
    - **References:** Task 6.3, Task 6.4.
