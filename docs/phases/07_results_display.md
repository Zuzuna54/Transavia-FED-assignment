# Phase 7: Animated Flight Results Display with MUI

**Goal:** Create a well-structured, accessible, and animated component to display flight search results using MUI components and Framer Motion.

**Sub-tasks:**

1.  **Task 7.1: Create Results Component File (`FlightResults.tsx`)**

    - **Description:** Create the component file (e.g., `src/components/organisms/FlightResults/FlightResults.tsx`). Define its props interface to accept flights, airport map, loading state, and initial search state.
    - **Expected Outcome:** A typed, functional React component skeleton.
    - **Affected:** New file (`src/components/organisms/FlightResults/FlightResults.tsx`), potentially index file.
    - **Development:** `interface FlightResultsProps { flights: Flight[]; airportMap: Map<string, Airport>; isLoading: boolean; hasSearched: boolean; }`. Create the component structure.
    - **References:** Phase 1 (structure), Task 2.1, Task 2.4, Task 6.2.

2.  **Task 7.2: Integrate Results Component into Main Page**

    - **Description:** Import and render `FlightResults` on `pages/index.tsx`, passing the required state variables (filtered flights, airport map, loading state, hasSearched state) as props.
    - **Expected Outcome:** The `FlightResults` component is rendered below the form, ready to display content based on props.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** Import component. Render `<FlightResults flights={filteredFlights} airportMap={props.airportMap} isLoading={isLoading} hasSearched={hasSearched} />`.
    - **References:** Task 7.1, Task 6.2, Phase 2 (props).

3.  **Task 7.3: Implement Conditional Rendering Logic**

    - **Description:** Based on `isLoading` and `hasSearched` props, render different states: a loading indicator (e.g., MUI `CircularProgress`), an initial message (e.g., "Please enter your search criteria"), a "No results found" message, or the list of flights.
    - **Expected Outcome:** Component correctly displays the current search status to the user.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Use conditional logic: `if (isLoading) { return <CircularProgress />; } if (!hasSearched) { return <Typography>Enter criteria...</Typography>; } if (flights.length === 0) { return <Typography>No flights found...</Typography>; } return ( /* Flight list */ );`.
    - **References:** Task 7.1, Task 6.5.

4.  **Task 7.4: Display Flight Data with MUI Components**

    - **Description:** When flights are available, map over the `flights` array and render each flight's details using appropriate MUI components (e.g., `Card`, `CardContent`, `Typography`, `Grid`, `Stack`) for a clear and structured layout.
    - **Expected Outcome:** A list of visually distinct flight cards displaying key information (origin, destination, times, price).
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Use `flights.map(flight => <Card key={flight.id} sx={{ mb: 2 }}> <CardContent> <Grid container spacing={2}>...</Grid> </CardContent> </Card>)`. Use `Typography` variants for structure.
    - **References:** Task 7.1, Task 2.1 (Flight type), Phase 1 (MUI setup).

5.  **Task 7.5: Format Data for Readability (Date, Price, Names)**

    - **Description:** Use `date-fns` (e.g., `format`) to display dates/times clearly. Use `Intl.NumberFormat` for currency formatting. Use the `airportMap` prop to display full airport names alongside codes.
    - **Expected Outcome:** Data presented in a user-friendly, localized format. E.g., "Amsterdam (AMS)", "Nov 15, 2022 10:30", "€123.45".
    - **Affected:** `FlightResults.tsx`, potentially new file `src/utils/formatters.ts`.
    - **Development:** Create helper functions in `formatters.ts` (e.g., `formatDateTime(dateString)`, `formatCurrency(amount, currency)`) or use inline formatting. Look up airport names using `airportMap.get(code)?.name ?? code`. Ensure locale is considered for formatting.
    - **References:** Task 7.4, Task 2.4, Phase 1 (date-fns).

6.  **Task 7.6: Implement List Animations (Framer Motion)**

    - **Description:** Animate the appearance of the flight results list and individual flight cards using Framer Motion's `AnimatePresence` and `motion` components for a polished UX.
    - **Expected Outcome:** Flight results list animates in smoothly. Individual items can have stagger effects.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Wrap the container mapping the flights with `<AnimatePresence>`. Wrap each `<Card>` (or list item) with `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>`. Consider `staggerChildren` on a parent `motion.div`.
    - **References:** Task 7.4, Phase 1 (Framer Motion setup).

7.  **Task 7.7: Ensure Accessibility**
    - **Description:** Review rendered output for accessibility. Ensure sufficient color contrast, proper heading structure within results, and ARIA attributes if necessary for dynamic updates or complex structures.
    - **Expected Outcome:** Results display is perceivable and understandable for users with disabilities.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Use semantic HTML or appropriate MUI component roles. Test with accessibility tools (browser devtools, axe).
    - **References:** Task 7.4.
