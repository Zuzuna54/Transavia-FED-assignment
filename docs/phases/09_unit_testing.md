# Phase 9: Comprehensive Unit & Integration Testing

**Goal:** Ensure application reliability and correctness by implementing thorough unit and integration tests using Jest and React Testing Library, covering components, logic, and user interactions.

**Sub-tasks:**

1.  **Task 9.1: Setup Advanced Testing Environment**

    - **Description:** Configure Jest and React Testing Library (RTL) with TypeScript support (`ts-jest`). Set up Jest to handle MUI, CSS Modules (if any), and provide necessary mocks (e.g., for `next/router` if needed, Framer Motion using `jest-framer-motion-snapshot`). Include `@testing-library/user-event` for realistic interactions.
    - **Expected Outcome:** Testing framework installed and configured (`jest.config.js`, `setupTests.ts`). Test environment correctly mocks browser APIs and external dependencies.
    - **Affected:** `package.json`, `jest.config.js`, `setupTests.ts` (new), `tsconfig.json` (test types).
    - **Development:** Follow Next.js/Jest/RTL docs. Install `@testing-library/user-event`. Configure `jest.config.js` with `testEnvironment: 'jsdom'`, module name mappers for styles/assets, `setupFilesAfterEnv`. In `setupTests.ts`, import `@testing-library/jest-dom`.
    - **References:** `assignment.md` (testing requirement), Phase 1 (libraries list).

2.  **Task 9.2: Test Core Utility Functions (Data Loading, Filtering, Formatting)**

    - **Description:** Write unit tests for pure functions in `src/lib/` and `src/utils/`. Mock dependencies like `fs` for data loading tests. Test filtering logic (Task 6.4) and formatting utilities (Task 7.5) with various inputs and edge cases.
    - **Expected Outcome:** High test coverage for critical, non-React logic. Confidence in data processing and presentation.
    - **Affected:** New test files (`*.test.ts`) alongside utility files.
    - **Development:** Use `jest.mock` for `fs`. Test `filterFlights` with different criteria (match, no match, date boundaries). Test `formatDateTime`, `formatCurrency` with valid/invalid inputs.
    - **References:** Task 2.3, Task 6.4, Task 7.5.

3.  **Task 9.3: Test Form Component Rendering & Accessibility**

    - **Description:** Write RTL tests for `FlightSearchForm`. Verify initial rendering of all MUI fields (Autocomplete, DatePicker, Button) with correct labels. Use accessibility queries (`getByRole`, `getByLabelText`) primarily. Check for basic ARIA attributes.
    - **Expected Outcome:** Tests confirm the form structure is rendered correctly and is accessible.
    - **Affected:** New test file (`src/components/organisms/FlightSearchForm/FlightSearchForm.test.tsx`).
    - **Development:** `render(<FlightSearchForm ... />)` (mocking props like `onSearchSubmit`, `airports`). Use `screen.getByLabelText`, `screen.getByRole`. Consider snapshot testing for initial structure.
    - **References:** Phase 3, Phase 4, Phase 5.

4.  **Task 9.4: Test Form Interaction & Validation (User Events)**

    - **Description:** Simulate user interactions using `@testing-library/user-event`. Test typing into Autocomplete, selecting options, opening/selecting dates in DatePicker, handling validation errors (appearance/disappearance), and successful/failed form submissions.
    - **Expected Outcome:** Tests verify the form behaves correctly during user interaction, including validation logic and callback invocation.
    - **Affected:** `FlightSearchForm.test.tsx`.
    - **Development:** Use `await userEvent.type(...)`, `await userEvent.click(...)`. Mock `onSearchSubmit` with `jest.fn()` and assert it's called (or not called) with correct arguments. Assert on error messages appearing/disappearing using `findByText`/`queryByText`.
    - **References:** Phase 3, Phase 4, Phase 5, Task 6.1 (criteria type).

5.  **Task 9.5: Test Results Component Rendering States**

    - **Description:** Write RTL tests for `FlightResults`. Verify correct rendering for different states: loading (`CircularProgress`), initial/no search message, "no results" message, and the list of flight cards when data is provided.
    - **Expected Outcome:** Tests confirm the component accurately reflects the application state.
    - **Affected:** New test file (`src/components/organisms/FlightResults/FlightResults.test.tsx`).
    - **Development:** `render(<FlightResults ... />)` with different prop combinations (`isLoading`, `hasSearched`, `flights` array). Assert on the presence/absence of relevant text or components (`getByRole('progressbar')`, `getByText(/No flights found/i)`).
    - **References:** Phase 7.

6.  **Task 9.6: Test Results Data Display & Formatting**

    - **Description:** When testing `FlightResults` with flight data, assert that key information (airport names, formatted dates/times, formatted price) is displayed correctly within the rendered cards.
    - **Expected Outcome:** Tests verify data presentation logic is correct.
    - **Affected:** `FlightResults.test.tsx`.
    - **Development:** Pass mock `flights` and `airportMap`. Use `within` helper from RTL to query inside specific cards. Assert text content matches expected formatted values (e.g., `expect(screen.getByText('Amsterdam (AMS)')).toBeInTheDocument()`).
    - **References:** Phase 7, Task 7.5.

7.  **Task 9.7: Test Page-Level Integration (Optional but Recommended)**

    - **Description:** Write integration-style tests for the main page (`src/pages/index.tsx`) that render the page with mocked `getStaticProps` data, simulate form interaction, and verify that the results component updates correctly based on the filtering.
    - **Expected Outcome:** Tests confirm the connection between form submission, filtering logic (mocked or real), and results display works as expected.
    - **Affected:** New test file (`src/pages/index.test.tsx`).
    - **Development:** Mock data loading (`getStaticProps`). Render the page component. Use `userEvent` to fill and submit the form. Assert on changes in the results area.
    - **References:** Phase 2, Phase 3-7.

8.  **Task 9.8: Monitor Test Coverage**
    - **Description:** Configure and run Jest with the `--coverage` flag. Analyze the report and add tests for critical, uncovered logic to achieve a high level of confidence (aim for >80-90% for key logic/components).
    - **Expected Outcome:** Clear visibility into test coverage and targeted improvements.
    - **Affected:** `package.json` (test script), Jest config.
    - **Development:** Run `npm test -- --coverage`. Review HTML report. Add tests as needed.
    - **References:** All previous testing tasks.
