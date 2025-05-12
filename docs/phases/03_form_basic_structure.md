# Phase 3: Form Component - Structure & MUI Integration

**Goal:** Create the core `FlightSearchForm` component using Material UI (MUI) components for structure, inputs, and adhering to accessibility best practices.

**Sub-tasks:**

1.  **Task 3.1: Create Form Component File (`FlightSearchForm.tsx`)**

    - **Description:** Create the component file within the structure defined in Phase 1 (e.g., `src/components/organisms/FlightSearchForm/FlightSearchForm.tsx`). Define props interface, initially accepting `onSubmit` callback and potentially airport data later.
    - **Expected Outcome:** A typed, functional React component skeleton.
    - **Affected:** New file (`src/components/organisms/FlightSearchForm/FlightSearchForm.tsx`), potentially `src/components/organisms/FlightSearchForm/index.ts` for exports.
    - **Development:** Create file, define `interface FlightSearchFormProps { onSearchSubmit: (criteria: SearchCriteria) => void; /* other props later */ }`. Use named export.
    - **References:** Phase 1 (structure), Phase 6 (callback definition needs foresight).

2.  **Task 3.2: Implement Form Structure with MUI Components**

    - **Description:** Build the form layout using MUI components like `Box`, `Grid`, or `Stack` for structure. Use `TextField` for Origin/Destination (initially) and a placeholder for the DatePicker. Use `FormControl`, `InputLabel` for accessibility.
    - **Expected Outcome:** A structured form using MUI layout and input components, ready for state and interaction.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Use `<Box component="form" onSubmit={...}>` wrapping MUI layout components (`Grid container`, `Grid item`) or `Stack`. Use `<TextField id="origin" label="Origin" variant="outlined" />` etc. Ensure labels are correctly associated.
    - **References:** Task 3.1, Phase 1 (MUI setup).

3.  **Task 3.3: Add MUI Submit Button**

    - **Description:** Add an MUI `Button` component for form submission, with appropriate type and variant.
    - **Expected Outcome:** A styled submit button integrated into the form layout.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Add `<Button type="submit" variant="contained" startIcon={<SearchIcon />}>Search Flights</Button>`. Import `SearchIcon` from `@mui/icons-material`.
    - **References:** Task 3.2, Phase 1 (MUI setup).

4.  **Task 3.4: Integrate Form into Main Page**

    - **Description:** Import and render the `FlightSearchForm` component on the main page (`src/pages/index.tsx`). Pass down necessary props (initially the placeholder `onSubmit` handler).
    - **Expected Outcome:** The MUI-based form is visible on the main application page.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** Import `FlightSearchForm`. Define a dummy `handleSubmit` function on the page for now. Render `<FlightSearchForm onSearchSubmit={handleSubmit} />`. Pass data props loaded in Phase 2 (`getStaticProps`).
    - **References:** Task 3.1, Phase 1, Phase 2 (Page props).

5.  **Task 3.5: Implement Controlled State with Hooks**

    - **Description:** Manage the state of Origin, Destination, and Date inputs using `useState`. Ensure MUI `TextField` components are controlled (`value` and `onChange` props).
    - **Expected Outcome:** Input values are controlled by React state, updating correctly on user input.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** `const [origin, setOrigin] = useState(''); ...`. Bind state to `<TextField value={origin} onChange={(e) => setOrigin(e.target.value)} ... />`. Define initial state type `interface FormState { origin: string; destination: string; departureDate: Date | null; }`.
    - **References:** Task 3.2.

6.  **Task 3.6: Implement Basic `onSubmit` Handler**

    - **Description:** Implement the `handleSubmit` function within the form component. It should prevent default submission, potentially perform initial validation (just check if fields are empty for now), and call the `onSearchSubmit` prop with the current state.
    - **Expected Outcome:** Form submission triggers the handler, prevents page reload, and passes state data up to the parent page (logged to console initially in parent).
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** `const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); // Basic validation stub // const criteria = { originCode: ..., destinationCode: ..., date: ... }; onSearchSubmit(criteria); };`. Attach to `<Box component="form" onSubmit={handleSubmit}>`.
    - **References:** Task 3.1, Task 3.5.

7.  **Task 3.7: Introduce Basic Form Animation (Framer Motion)**
    - **Description:** Wrap the form or key elements (like the button) with `motion` components from Framer Motion to add subtle initial animations (e.g., fade-in).
    - **Expected Outcome:** Form appears with a simple animation on load.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** `import { motion } from 'framer-motion'; <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}> <Box component="form" ...> ... </Box> </motion.div>`.
    - **References:** Task 3.2, Phase 1 (Framer Motion setup).
