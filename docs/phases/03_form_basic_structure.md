# Phase 3: Form Component - Structure & Basic Inputs

**Goal:** Create the main form component with basic uncontrolled inputs for Origin, Destination, and Departure Date.

**Sub-tasks:**

1.  **Task 3.1: Create Form Component File**

    - **Description:** Create a new React component file (e.g., `components/FlightSearchForm.tsx`).
    - **Expected Outcome:** An empty functional component skeleton.
    - **Affected:** New file (`components/FlightSearchForm.tsx`).
    - **Development:** Create the file with a basic React functional component export.
    - **References:** Phase 1 (project structure).

2.  **Task 3.2: Add Basic HTML Form Structure**

    - **Description:** Implement the basic HTML `<form>` structure within the component, including labels and standard `<input type="text">` for Origin and Destination, and `<input type="date">` for Departure Date (or text initially).
    - **Expected Outcome:** A rendered form with three input fields and labels.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Use standard HTML form elements. Add basic accessibility attributes (e.g., `htmlFor` on labels).
    - **References:** Task 3.1.

3.  **Task 3.3: Add Submit Button**

    - **Description:** Add a submit button to the form.
    - **Expected Outcome:** A button within the form element.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Add `<button type="submit">Search Flights</button>`.
    - **References:** Task 3.2.

4.  **Task 3.4: Integrate Form into Main Page**

    - **Description:** Import and render the `FlightSearchForm` component on the main application page (e.g., `pages/index.tsx`).
    - **Expected Outcome:** The form is visible when visiting the main page of the application.
    - **Affected:** `pages/index.tsx`.
    - **Development:** Import the component and place it within the JSX of the main page.
    - **References:** Task 3.1, Phase 1.

5.  **Task 3.5: Setup Basic Form State (Controlled Components)**

    - **Description:** Convert the basic inputs to controlled components using React's `useState` hook to manage the value of each input field.
    - **Expected Outcome:** Input field values are stored in the component's state and update on change.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Use `useState` for each input (origin, destination, date). Add `value` and `onChange` props to each input element.
    - **References:** Task 3.2.

6.  **Task 3.6: Implement Basic `onSubmit` Handler**
    - **Description:** Add an `onSubmit` handler to the form element that prevents the default form submission and logs the current state values (origin, destination, date) to the console.
    - **Expected Outcome:** Form submission triggers the handler, logs state, and doesn't cause a page reload.
    - **Affected:** `components/FlightSearchForm.tsx`.
    - **Development:** Create a function `handleSubmit(event)`, call `event.preventDefault()`, and log the state variables. Attach it to the form's `onSubmit` prop.
    - **References:** Task 3.5.
