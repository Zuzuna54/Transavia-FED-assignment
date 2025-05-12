# Phase 4: Form Component - Input Logic (Origin/Destination Autocomplete)

**Goal:** Enhance the Origin and Destination inputs with autocomplete suggestions based on the loaded airport data.

**Sub-tasks:**

1.  **Task 4.1: Pass Airport Data to Form**

    - **Description:** Load airport data on the main page (using techniques from Phase 2) and pass the relevant data (e.g., list of airports or the airport map) as a prop to the `FlightSearchForm` component.
    - **Expected Outcome:** `FlightSearchForm` receives airport data (e.g., `airports: Airport[]` or `airportMap: Map<string, Airport>`).
    - **Affected:** `pages/index.tsx`, `components/FlightSearchForm.tsx` (props definition).
    - **Development:** Use `getStaticProps` or `getServerSideProps` in `pages/index.tsx` to load data (Task 2.3/2.4) and pass it down.
    - **References:** Phase 2 (Data Loading), Phase 3 (Form Component).

2.  **Task 4.2: Implement Autocomplete Logic**

    - **Description:** Create logic within `FlightSearchForm` (or a custom hook) that filters the airport list based on the user's input in the Origin/Destination fields.
    - **Expected Outcome:** A function that takes the input value and returns a filtered list of matching airports (e.g., by name or code).
    - **Affected:** `components/FlightSearchForm.tsx` or new hook file.
    - **Development:** Filter the `airports` prop based on the current input state (Task 3.5). Consider case-insensitivity and partial matching.
    - **References:** Task 4.1, Task 3.5.

3.  **Task 4.3: Display Autocomplete Suggestions**

    - **Description:** Render a list of suggestions below the Origin/Destination input fields when the user types and matches are found.
    - **Expected Outcome:** A dynamic list appears below the input, showing potential airport matches.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Conditionally render a `<ul>` or `<div>` containing suggestion items based on the filtered results from Task 4.2. Style minimally for now.
    - **References:** Task 4.2.

4.  **Task 4.4: Handle Suggestion Selection**

    - **Description:** Implement functionality so that clicking on a suggestion updates the corresponding input field's state and potentially hides the suggestion list.
    - **Expected Outcome:** Clicking a suggestion fills the input with the selected airport name (or code) and updates the component state.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Add `onClick` handlers to suggestion items that call the state setter (from Task 3.5) with the appropriate airport value and clear the suggestions.
    - **References:** Task 4.3, Task 3.5.

5.  **Task 4.5: Store Airport Code**

    - **Description:** Modify the state and selection logic to store the selected airport _code_ (e.g., 'AMS') needed for filtering flights, even if the input displays the airport _name_ for user-friendliness.
    - **Expected Outcome:** Component state holds selected origin/destination airport codes (e.g., `originCode`, `destinationCode`) alongside potentially displayed names.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Add separate state variables for codes. Update the `onChange` handler and suggestion selection logic (Task 4.4) to manage both display value and underlying code.
    - **References:** Task 4.4, Task 2.1 (Airport type).

6.  **Task 4.6: Refine Autocomplete Behavior (Optional)**
    - **Description:** Improve UX, e.g., add debounce to filtering, keyboard navigation for suggestions, hide suggestions on input blur or Escape key.
    - **Expected Outcome:** Smoother, more intuitive autocomplete interaction.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Implement debouncing using `setTimeout`/`clearTimeout` or a library. Add keyboard event listeners.
    - **References:** Task 4.3, Task 4.4.
