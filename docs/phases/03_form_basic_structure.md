# Phase 3: Form Component - Structure & MUI/SCSS Integration

**Goal:** Create the core `FlightSearchForm` component using Material UI (MUI) components for structure, inputs, and adhering to accessibility best practices, with custom styling handled via SCSS Modules.

**Sub-tasks:**

1.  **Task 3.1: Create Form Component File & SCSS Module**

    - **Description:** Create the component file (`src/components/.../FlightSearchForm.tsx`) and a corresponding SCSS module (`FlightSearchForm.module.scss`). Define props interface.
    - **Expected Outcome:** Typed component skeleton and empty SCSS module file.
    - **Affected:** New files (`FlightSearchForm.tsx`, `FlightSearchForm.module.scss`).
    - **Development:** Create files. Define `FlightSearchFormProps`. Import styles: `import styles from './FlightSearchForm.module.scss';`
    - **References:** Phase 1 (structure).

2.  **Task 3.2: Implement Form Structure with MUI Components & SCSS Classes**

    - **Description:** Build the form layout using MUI components (`Box`, `Grid`, `Stack`). Apply custom layout styles or structure via classNames defined in the SCSS module.
    - **Expected Outcome:** Structured form using MUI, with layout controlled/customized by SCSS module classes.
    - **Affected:** `FlightSearchForm.tsx`, `FlightSearchForm.module.scss`.
    - **Development:** Use `<Box component="form" className={styles.formContainer} ...>` Add relevant classes from `styles` to MUI components or wrapping divs. Define basic layout rules in the `.scss` file.
    - **References:** Task 3.1, Phase 1 (MUI setup).

3.  **Task 3.3: Add MUI Submit Button with SCSS Styling**

    - **Description:** Add MUI `Button`. Apply any custom styling via the SCSS module (e.g., overriding specific theme styles if needed, or adding margin/padding).
    - **Expected Outcome:** Styled submit button integrated into the form layout, customizable via SCSS.
    - **Affected:** `FlightSearchForm.tsx`, `FlightSearchForm.module.scss`.
    - **Development:** Add `<Button type="submit" variant="contained" className={styles.submitButton} ...>`. Define `.submitButton` rules in SCSS.
    - **References:** Task 3.2, Phase 1 (MUI setup).

4.  **Task 3.4: Integrate Form into Main Page**

    - **Description:** Import and render `FlightSearchForm` on `pages/index.tsx`. Pass props.
    - **Expected Outcome:** MUI/SCSS-styled form visible on the main page.
    - **Affected:** `src/pages/index.tsx`.
    - **Development:** Standard import and render. Ensure data props passed.
    - **References:** Task 3.1, Phase 1, Phase 2.

5.  **Task 3.5: Implement Controlled State with Hooks**

    - **Description:** Manage state for inputs using `useState`. Ensure MUI inputs are controlled.
    - **Expected Outcome:** Input values controlled by React state.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Standard controlled component implementation.
    - **References:** Task 3.2.

6.  **Task 3.6: Implement Basic `onSubmit` Handler**

    - **Description:** Implement `handleSubmit` function to prevent default, call `onSearchSubmit` prop.
    - **Expected Outcome:** Form submission triggers handler, prevents reload, passes data up.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Standard submit handler.
    - **References:** Task 3.1, Task 3.5.

7.  **Task 3.7: Introduce Basic Form Animation (Framer Motion)**

    - **Description:** Wrap form or key elements with `motion` components for subtle initial animations.
    - **Expected Outcome:** Form appears with simple animation.
    - **Affected:** `FlightSearchForm.tsx`.
    - **Development:** Standard Framer Motion setup.
    - **References:** Task 3.2, Phase 1 (Framer Motion).
