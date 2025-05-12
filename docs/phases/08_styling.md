# Phase 8: SCSS Implementation & Visual Polish

**Goal:** Implement the visual design using the defined SCSS structure, refine MUI component appearance, ensure responsiveness, add polish with animations, and apply branding.

**Sub-tasks:**

1.  **Task 8.1: Establish SCSS Structure & Variables**

    - **Description:** Populate the SCSS partials defined in Phase 1 (`abstracts/`, `base/`, etc.). Define SCSS variables (colors, fonts, spacing, breakpoints) potentially derived from or matching the MUI `theme.ts` for consistency. Set up base styles (reset, typography).
    - **Expected Outcome:** Well-structured SCSS foundation with variables and base styles applied via `globals.scss`.
    - **Affected:** `src/styles/` directory (all `.scss` files).
    - **Development:** Define variables in `_variables.scss`. Add reset/normalize rules in `base/_reset.scss`. Define base typography in `base/_typography.scss`. Import all into `globals.scss`.
    - **References:** Task 1.4, Task 1.6.

2.  **Task 8.2: Implement Layout Styles (SCSS)**

    - **Description:** Define layout styles (container, header, footer if any) using SCSS, potentially within `layout/` partials or global styles.
    - **Expected Outcome:** Consistent page structure styled with SCSS.
    - **Affected:** `src/styles/layout/`, `src/pages/index.tsx` (applying layout classes), `src/components/layout/` (if using layout components).
    - **Development:** Create SCSS rules for layout elements. Use classes defined in SCSS within the main page or layout components.
    - **References:** Task 8.1.

3.  **Task 8.3: Style Form Component (SCSS Module)**

    - **Description:** Implement detailed styling for `FlightSearchForm` within its `.module.scss` file. Target MUI component inner classes if necessary (use browser dev tools to inspect) or apply styles via wrapper elements and custom classes. Utilize SCSS variables and mixins.
    - **Expected Outcome:** Form component styled according to design requirements using SCSS.
    - **Affected:** `src/components/.../FlightSearchForm.module.scss`.
    - **Development:** Write SCSS rules targeting elements/classes within the form. Use nesting, variables, mixins. E.g., `.formContainer { ... } .submitButton { @include button-variant(...); }`
    - **References:** Phase 3, Task 8.1.

4.  **Task 8.4: Style Results Component (SCSS Module)**

    - **Description:** Implement detailed styling for `FlightResults` and individual flight cards within its `.module.scss` file, targeting MUI components or custom classes.
    - **Expected Outcome:** Results component styled according to design using SCSS.
    - **Affected:** `src/components/.../FlightResults.module.scss`.
    - **Development:** Write SCSS rules for the results list and cards. E.g., `.flightCard { ... } .flightPrice { ... }`
    - **References:** Phase 7, Task 8.1.

5.  **Task 8.5: Implement Responsive Design (SCSS & MUI)**

    - **Description:** Use SCSS media queries (leveraging breakpoint variables defined in Task 8.1) within `.module.scss` files to adjust component styles. Combine with MUI's responsive props (`xs`, `sm`, etc.) for grid layout adjustments.
    - **Expected Outcome:** Application layout and components adapt gracefully across devices.
    - **Affected:** All `.scss` modules, layout components, `FlightSearchForm.tsx`, `FlightResults.tsx`.
    - **Development:** Define media query mixins or use breakpoint variables directly in SCSS: `@media (min-width: $breakpoint-md) { ... }`. Test thoroughly.
    - **References:** Task 8.1, [MUI Responsive Docs].

6.  **Task 8.6: Refine Animations (Framer Motion)**

    - **Description:** Polish animations added in previous phases (e.g., form, results list, error messages) **using Framer Motion**. Ensure animations are smooth, meaningful, and contribute positively to the user experience.
    - **Expected Outcome:** Smooth, meaningful animations enhancing UX, implemented consistently with Framer Motion.
    - **Affected:** Components using Framer Motion (`FlightSearchForm.tsx`, `FlightResults.tsx`, etc.).
    - **Development:** Review and adjust Framer Motion props (`initial`, `animate`, `exit`, `transition`, `variants`) in existing `motion` components. Ensure `AnimatePresence` is used correctly where needed.
    - **References:** Phase 3 (Task 3.7), Phase 4 (Task 4.6), Phase 5 (Task 5.4), Phase 7 (Task 7.6), Phase 1 (Framer Motion setup).

7.  **Task 8.7: Apply Transavia Branding (SCSS Variables)**
    - **Description:** If desired, update SCSS color variables in `_variables.scss` with Transavia brand colors. Ensure these variables are used throughout SCSS rules.
    - **Expected Outcome:** Application styling reflects Transavia branding via SCSS variables.
    - **Affected:** `src/styles/abstracts/_variables.scss`, potentially other `.scss` files.
    - **Development:** Update color variable definitions. Verify changes propagate.
    - **References:** Task 8.1, `assignment.md`.
