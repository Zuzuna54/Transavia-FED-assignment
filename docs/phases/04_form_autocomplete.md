# Phase 4: Form Component - MUI Autocomplete & Logic

**Goal:** Implement efficient and user-friendly autocomplete functionality for Origin and Destination fields using MUI's `Autocomplete` component, airport data, and performance optimizations.

**Sub-tasks:**

1.  **Task 4.1: Pass Airport Data to Form Component**

    - **Description:** Ensure the `FlightSearchForm` component receives the necessary airport data (full list and/or the pre-computed map) loaded via `getStaticProps` in the parent page.
    - **Expected Outcome:** `FlightSearchFormProps` updated to include `airports: Airport[]` and `airportMap: Map<string, Airport>`. Data is correctly passed down from `pages/index.tsx`.
    - **Affected:** `src/pages/index.tsx`, `src/components/organisms/FlightSearchForm/FlightSearchForm.tsx`.
    - **Development:** Update `FlightSearchFormProps`. Pass props from `HomePageProps` (Task 2.5) down to `<FlightSearchForm ... airports={props.airports} airportMap={props.airportMap} />`.
    - **References:** Phase 2 (Data Loading, Page Props), Phase 3 (Form Integration).

2.  **Task 4.2: Replace TextFields with MUI Autocomplete**

    - **Description:** Replace the `TextField` components used for Origin and Destination with MUI's `Autocomplete` component.
    - **Expected Outcome:** Form uses `Autocomplete` components for airport selection.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Replace `<TextField>` with `<Autocomplete options={airports} getOptionLabel={(option) => `${option.name} (${option.code})`} renderInput={(params) => <TextField {...params} label="Origin" />} ... />`. Use the `airports` prop for options.
    - **References:** Task 4.1, Phase 3 (Form Structure), [MUI Autocomplete Docs](https://mui.com/material-ui/react-autocomplete/).

3.  **Task 4.3: Manage Autocomplete State (Value vs. InputValue)**

    - **Description:** Refine state management (`useState`) to handle both the selected `Airport` object (`value` state for the actual selection) and the text typed by the user (`inputValue` state for filtering/display).
    - **Expected Outcome:** Separate state variables track the selected airport object and the user's current text input for each Autocomplete.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Use `useState<Airport | null>(null)` for selected value (`value` prop of Autocomplete). Use `useState('')` for input value (`inputValue` and `onInputChange` props). When an option is selected (`onChange` prop), update the `value` state (with the selected `Airport` object) and clear/reset the `inputValue` state appropriately.
    - **References:** Task 4.2, Phase 3 (State Management).

4.  **Task 4.4: Implement Autocomplete Filtering & Display**

    - **Description:** Configure the `Autocomplete` component to filter options based on user input (`inputValue`). Customize option rendering if needed (e.g., show city/country).
    - **Expected Outcome:** Autocomplete suggestions filter dynamically as the user types. Suggestions are clearly displayed.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** MUI Autocomplete handles basic filtering. Use `getOptionLabel` to define how options are displayed in the input when selected. Consider `renderOption` for custom dropdown display. Ensure filtering is performant (MUI handles this well internally).
    - **References:** Task 4.2, Task 4.3.

5.  **Task 4.5: Store Selected Airport Code for Submission**

    - **Description:** Ensure that when the form is submitted, the _code_ of the selected Airport (from the `value` state, Task 4.3) is used, not the displayed text or the raw input value.
    - **Expected Outcome:** The `onSearchSubmit` callback (Task 3.6) receives the correct airport codes (e.g., `originCode: originValue?.code || ''`).
    - **Affected:** `FlightSearchForm.tsx` (`handleSubmit` function).
    - **Development:** In `handleSubmit`, access the `.code` property of the selected airport objects stored in the `value` state. Handle the `null` case if no airport is selected.
    - **References:** Task 3.6, Task 4.3, Task 2.1 (Airport type).

6.  **Task 4.6: Add Autocomplete Animations (Framer Motion)**

    - **Description:** Apply subtle animations to the Autocomplete dropdown list using Framer Motion for a smoother user experience.
    - **Expected Outcome:** Suggestion list animates in/out gracefully.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Wrap the listbox part of the Autocomplete (potentially using `componentsProps` or by customizing `renderOption`/`renderGroup`) with `motion.ul` and `AnimatePresence` if feasible with MUI's structure. Alternatively, animate the container holding the Autocomplete dropdown.
    - **References:** Task 4.2, Phase 1 (Framer Motion setup).

7.  **Task 4.7: Performance Considerations (Debounce - Optional)**
    - **Description:** While MUI's Autocomplete is generally performant, consider adding debounce logic to the `onInputChange` handler if filtering logic becomes complex or involves API calls (not applicable here, but good practice).
    - **Expected Outcome:** Input changes trigger filtering logic only after a short delay, improving performance in complex scenarios.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Use a custom hook (`useDebounce`) or library function to wrap the state update or filtering logic tied to `onInputChange`.
    - **References:** Task 4.3.
