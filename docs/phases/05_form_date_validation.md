# Phase 5: Form Component - MUI Date Picker & Validation

**Goal:** Integrate an accessible and user-friendly date picker using MUI X components, implement robust form validation, and provide clear user feedback with animations.

**Sub-tasks:**

1.  **Task 5.1: Integrate MUI Date Picker**

    - **Description:** Use the `DatePicker` component from `@mui/x-date-pickers` for the Departure Date input, ensuring it's correctly linked to the state management established in Phase 3.
    - **Expected Outcome:** A functional MUI Date Picker replaces the placeholder/basic input for the date field.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Import `DatePicker` from `@mui/x-date-pickers`. Render `<DatePicker label="Departure Date" value={departureDate} onChange={(newValue) => setDepartureDate(newValue)} renderInput={(params) => <TextField {...params} error={!!errors.departureDate} helperText={errors.departureDate} />} />`. Ensure `LocalizationProvider` is set up (Task 1.6).
    - **References:** Phase 3 (State Management), Task 1.6 (Provider Setup), [MUI X DatePicker Docs](https://mui.com/x/react-date-pickers/date-picker/).

2.  **Task 5.2: Configure Date Picker Options**

    - **Description:** Configure the `DatePicker` properties: set input format (e.g., `inputFormat="yyyy-MM-dd"`), potentially disable past dates, and consider setting `minDate` and `maxDate` based _loosely_ on the provided data range (e.g., allow selection within Nov 2022) for better UX, but avoid hardcoding exact data limits.
    - **Expected Outcome:** Date picker is user-friendly, guides selection, and uses a consistent format.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Pass props like `inputFormat`, `disablePast`, `minDate={new Date('2022-11-01')}`, `maxDate={new Date('2022-11-30')}` to the `DatePicker` component. Use `date-fns` to create Date objects if needed.
    - **References:** Task 5.1, `assignment.md` (data specifics), Phase 1 (date-fns).

3.  **Task 5.3: Implement Robust Form Validation**

    - **Description:** Implement validation logic. Rules: Origin required (must be a selected Airport object), Destination required (must be a selected Airport object), Departure Date required (must be a valid Date object). Consider using a schema validation library like `zod` for clarity and maintainability, or implement manually.
    - **Expected Outcome:** A validation function or schema that checks the form state against defined rules and returns error messages.
    - **Affected:** `FlightSearchForm.tsx`, potentially new file (`src/types/schemas.ts` if using zod).
    - **Development:** (If zod) Define schema: `zod.object({ origin: AirportTypeZod, destination: AirportTypeZod, departureDate: zod.date() })`. (If manual) Create `validateForm(formState): ErrorsObject`. Check `formState.origin !== null`, `formState.destination !== null`, `formState.departureDate !== null && isValid(formState.departureDate)`. Return an object mapping field names to error messages.
    - **References:** Phase 3 (State), Phase 4 (State), Task 5.1 (State), Phase 1 (zod optional install).

4.  **Task 5.4: Display Validation Errors with MUI & Animation**

    - **Description:** Display validation errors using MUI `TextField`'s `error` and `helperText` props. Animate the appearance/disappearance of error messages using Framer Motion.
    - **Expected Outcome:** Clear, field-specific error messages appear below invalid fields upon attempted submission. Error messages are animated.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Maintain an error state: `useState<Record<string, string>>({})`. In `handleSubmit`, run validation (Task 5.3). If errors, update error state. Pass `error={!!errors.origin}` and `helperText={errors.origin || ' '}` to relevant `TextField`/`DatePicker` renderInput. Wrap the `helperText` display area (or the `FormHelperText` component if used separately) in `<AnimatePresence>` and `<motion.div>` for animation.
    - **References:** Task 5.1, Task 5.3, Phase 1 (MUI/Framer Motion setup).

5.  **Task 5.5: Prevent Submission & Update Handler**
    - **Description:** Modify the `handleSubmit` function to run validation first. If invalid, update the error state (triggering messages) and prevent calling the `onSearchSubmit` prop. Clear errors on successful submission or potentially on input change.
    - **Expected Outcome:** Form submission is blocked if validation fails. `onSearchSubmit` is only called with valid, structured data (including airport codes and Date object).
    - **Affected:** `FlightSearchForm.tsx` (`handleSubmit` function).
    - **Development:** In `handleSubmit`: call validation -> if errors, `setErrors(errors); return;` -> if valid, `setErrors({}); const criteria = { originCode: formState.origin!.code, ... }; onSearchSubmit(criteria);`. Consider clearing specific field errors in `onChange` handlers for better UX.
    - **References:** Task 3.6, Task 5.3, Task 5.4, Task 4.5.
