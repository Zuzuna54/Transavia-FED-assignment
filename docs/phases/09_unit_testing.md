# Phase 9: Unit Testing

**Goal:** Implement unit tests for key components and logic, covering rendering and functionality as per requirements.

**Sub-tasks:**

1.  **Task 9.1: Setup Testing Environment**

    - **Description:** Configure Jest and React Testing Library (or chosen alternatives) within the Next.js project.
    - **Expected Outcome:** Testing framework is installed, configured (e.g., `jest.config.js`, `setupTests.ts`), and basic example tests run successfully.
    - **Affected:** `package.json`, new configuration files, potentially `tsconfig.json` for test-specific paths.
    - **Development:** Follow Next.js documentation for setting up Jest and React Testing Library. Install necessary dependencies (`jest`, `@testing-library/react`, `@testing-library/jest-dom`, `ts-jest`, etc.).
    - **References:** `assignment.md` (testing requirement), Phase 1 (project setup).

2.  **Task 9.2: Test Data Loading and Processing Utilities**

    - **Description:** Write unit tests for data loading functions (Task 2.3) and any data processing/transformation logic (Task 2.4).
    - **Expected Outcome:** Tests verifying that data is loaded correctly (mocking file system or fetch) and transformed as expected.
    - **Affected:** New test files (e.g., `lib/data-loader.test.ts`).
    - **Development:** Use Jest to mock dependencies (like `fs` or `fetch`). Test various scenarios, including error handling or empty data.
    - **References:** Task 2.3, Task 2.4.

3.  **Task 9.3: Test Form Component Rendering**

    - **Description:** Write tests for the `FlightSearchForm` component to ensure it renders correctly with all its input fields, labels, and button.
    - **Expected Outcome:** Tests confirm the presence of form elements and their initial states.
    - **Affected:** New test file (e.g., `components/FlightSearchForm.test.tsx`).
    - **Development:** Use React Testing Library's `render` and query functions (`getByLabelText`, `getByRole`, etc.) to check for element existence.
    - **References:** Phase 3, Phase 4, Phase 5.

4.  **Task 9.4: Test Form Component Interaction and Validation Logic**

    - **Description:** Write tests for `FlightSearchForm` interactions: typing into inputs, selecting autocomplete suggestions, date selection, form submission, and validation logic.
    - **Expected Outcome:** Tests verify state updates, validation messages appear/disappear correctly, and the `onSearchSubmit` callback (Task 6.2) is called with correct data on valid submission / not called on invalid.
    - **Affected:** `components/FlightSearchForm.test.tsx`.
    - **Development:** Use `fireEvent` to simulate user interactions. Mock callback props and check if they are called. Assert on displayed error messages.
    - **References:** Phase 3, Phase 4, Phase 5, Task 6.2.

5.  **Task 9.5: Test Flight Filtering Logic**

    - **Description:** Write unit tests for the `filterFlights` function (Task 6.3).
    - **Expected Outcome:** Tests verify that flights are correctly filtered based on various criteria (origin, destination, date, combinations) and that it handles edge cases (no matches, all match).
    - **Affected:** New test file (e.g., `utils/flight-filter.test.ts` or within `pages/index.test.tsx` if defined there).
    - **Development:** Create mock flight data and search criteria for different scenarios. Assert that the output of the filter function is as expected.
    - **References:** Task 6.3.

6.  **Task 9.6: Test Results Display Component Rendering**

    - **Description:** Write tests for the `FlightResults` component to ensure it renders correctly with flight data and handles the "no results" case.
    - **Expected Outcome:** Tests confirm flights are displayed (or "no results" message) based on props.
    - **Affected:** New test file (e.g., `components/FlightResults.test.tsx`).
    - **Development:** Pass mock flight data (including empty arrays) and airport map to the component. Use `render` and query functions to check for rendered flight details or the "no results" message.
    - **References:** Phase 7.

7.  **Task 9.7: Achieve Code Coverage Goals (Optional)**
    - **Description:** Run tests with coverage reporting and aim for a reasonable coverage percentage for critical logic.
    - **Expected Outcome:** Confidence in the robustness of the tested code.
    - **Affected:** Test scripts in `package.json`.
    - **Development:** Add coverage flags to test commands (e.g., `jest --coverage`). Review reports and add tests for uncovered lines/branches where valuable.
    - **References:** Task 9.1-9.6.
