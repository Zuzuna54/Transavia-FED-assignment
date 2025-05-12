# Phase 5: Form Component - Date Input & Validation

**Goal:** Implement a robust date input and add basic form validation.

**Sub-tasks:**

1.  **Task 5.1: Select and Implement Date Picker Component (Optional but Recommended)**

    - **Description:** Replace the basic `<input type="date">` with a more user-friendly date picker library (e.g., `react-datepicker`).
    - **Expected Outcome:** A functional date picker integrated into the form.
    - **Affected:** `components/FlightSearchForm.tsx`, `package.json` (if library added).
    - **Development:** Install library, import its component, and integrate it, binding its value to the date state (Task 3.5).
    - **References:** Task 3.5, `assignment.md` (data range implies date importance).

2.  **Task 5.2: Configure Date Picker Options**

    - **Description:** Configure the date picker, e.g., set date format (YYYY-MM-DD recommended for consistency), potentially restrict date range based on available flight data (Nov 10-30, 2022, although making it flexible is better).
    - **Expected Outcome:** Date picker behaves as needed (correct format, potentially restricted range).
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Pass configuration props to the date picker component (e.g., `dateFormat`, `minDate`, `maxDate`). Note: Hardcoding the range might be less flexible than allowing any date and filtering later.
    - **References:** Task 5.1, `assignment.md` (data specifics).

3.  **Task 5.3: Implement Basic Form Validation Logic**

    - **Description:** Add validation rules: Origin, Destination, and Date fields should not be empty. Origin and Destination must correspond to valid selected airport codes (Task 4.5).
    - **Expected Outcome:** Logic that checks form validity before submission.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Create a validation function or check conditions within the `handleSubmit` handler (Task 3.6). Check if state variables (origin code, destination code, date) are set.
    - **References:** Task 3.5, Task 3.6, Task 4.5.

4.  **Task 5.4: Display Validation Errors**

    - **Description:** Show user-friendly error messages near the respective fields if validation fails.
    - **Expected Outcome:** Users see clear messages indicating required fields or invalid inputs.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Use state variables to track validation errors for each field. Conditionally render error messages (e.g., `<p style={{color: 'red'}}>...</p>`) near the inputs.
    - **References:** Task 5.3.

5.  **Task 5.5: Prevent Submission on Invalid Form**
    - **Description:** Modify the `handleSubmit` handler to prevent the flight search logic from running if the form is invalid.
    - **Expected Outcome:** Clicking "Search Flights" on an invalid form only displays error messages, without proceeding to flight filtering.
    - **Affected:** `components/FlightSearchForm.tsx` (`handleSubmit` function).
    - **Development:** Add a check at the beginning of `handleSubmit` using the validation logic (Task 5.3). If invalid, set error states (Task 5.4) and return early.
    - **References:** Task 3.6, Task 5.3, Task 5.4.
