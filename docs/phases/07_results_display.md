# Phase 7: Animated Flight Results Display with MUI & SCSS

**Goal:** Create a well-structured, accessible, and animated component to display flight search results using MUI components, Framer Motion, and styled with SCSS Modules.

**Sub-tasks:**

1.  **Task 7.1: Create Results Component File & SCSS Module**

    - **Description:** Create component file (`src/components/.../FlightResults.tsx`) and SCSS module (`FlightResults.module.scss`). Define props interface.
    - **Expected Outcome:** Typed component skeleton and empty SCSS module.
    - **Affected:** New files (`FlightResults.tsx`, `FlightResults.module.scss`).
    - **Development:** Create files. Define `FlightResultsProps`. Import styles.
    - **References:** Phase 1, Task 2.1, Task 2.4, Task 6.2.

2.  **Task 7.2: Integrate Results Component into Main Page**

    - **Description:** Import and render `FlightResults` on `pages/index.tsx`, passing state props.
    - **Expected Outcome:** Component rendered below form.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** Import and render, passing props.
    - **References:** Task 7.1, Task 6.2, Phase 2.

3.  **Task 7.3: Implement Conditional Rendering Logic**

    - **Description:** Render loading indicator (`CircularProgress`), initial message, "No results" message, or flight list based on props.
    - **Expected Outcome:** Component correctly displays search status.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Use conditional logic (if/else if/else).
    - **References:** Task 7.1, Task 6.5.

4.  **Task 7.4: Display Flight Data with MUI Components & SCSS**

    - **Description:** Map over `flights` array. Render details using MUI components (`Card`, `CardContent`, `Typography`, etc.). Apply custom styles via SCSS module classes.
    - **Expected Outcome:** List of visually distinct flight cards styled with SCSS.
    - **Affected:** `FlightResults.tsx`, `FlightResults.module.scss`.
    - **Development:** Use `flights.map(flight => <Card key={flight.id} className={styles.flightCard} ...>)`. Define `.flightCard` and inner element styles in SCSS.
    - **References:** Task 7.1, Task 2.1, Phase 1.

5.  **Task 7.5: Format Data for Readability (Date, Price, Names)**

    - **Description:** Use `date-fns`, `Intl.NumberFormat`, and `airportMap` for user-friendly data display.
    - **Expected Outcome:** Formatted, localized data.
    - **Affected:** `FlightResults.tsx`, potentially `src/utils/formatters.ts`.
    - **Development:** Implement formatting functions or inline formatting.
    - **References:** Task 7.4, Task 2.4, Phase 1.

6.  **Task 7.6: Implement List Animations (Framer Motion)**

    - **Description:** Animate results list and cards using `AnimatePresence` and `motion`.
    - **Expected Outcome:** Smooth list animation with potential stagger effect.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Wrap list mapping with `<AnimatePresence>`. Wrap each card with `<motion.div>`.
    - **References:** Task 7.4, Phase 1.

7.  **Task 7.7: Ensure Accessibility**

    - **Description:** Review output for color contrast, heading structure, ARIA attributes.
    - **Expected Outcome:** Accessible results display.
    - **Affected:** `FlightResults.tsx`.
    - **Development:** Use semantic elements/roles. Test with accessibility tools.
    - **References:** Task 7.4.
