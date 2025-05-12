# Phase 8: Styling & UI Polish

**Goal:** Apply styling to the application for a clean and professional look, potentially using a library and adding optional Transavia branding.

**Sub-tasks:**

1.  **Task 8.1: Choose and Install Styling Library (Optional)**

    - **Description:** Select a CSS framework or UI component library (e.g., Tailwind CSS, Material UI, Chakra UI, Bootstrap) if not already chosen.
    - **Expected Outcome:** Library installed and configured according to its documentation.
    - **Affected:** `package.json`, configuration files (e.g., `tailwind.config.js`, `postcss.config.js`), potentially `_app.tsx`.
    - **Development:** Follow library installation guides. `npm install ...`.
    - **References:** `assignment.md` (mentions using a library), Phase 1.

2.  **Task 8.2: Apply Basic Layout and Global Styles**

    - **Description:** Set up a basic page layout (e.g., centering content, setting max width) and define global styles (fonts, colors, resets).
    - **Expected Outcome:** Consistent basic layout and typography across the application.
    - **Affected:** `styles/globals.css` (or equivalent), `_app.tsx` or main page layout component.
    - **Development:** Use CSS modules, global CSS, or library-specific methods to apply base styles.
    - **References:** Task 8.1.

3.  **Task 8.3: Style the Form Component**

    - **Description:** Apply styling to the `FlightSearchForm` component, including inputs, labels, button, autocomplete suggestions, and validation errors.
    - **Expected Outcome:** A visually appealing and user-friendly form.
    - **Affected:** `components/FlightSearchForm.tsx` and associated style files (e.g., CSS Modules).
    - **Development:** Use chosen styling approach (library components, utility classes, custom CSS) to style form elements.
    - **References:** Task 8.1, Phase 3, Phase 4, Phase 5.

4.  **Task 8.4: Style the Results Component**

    - **Description:** Apply styling to the `FlightResults` component, formatting the list/table of flights for clarity and readability.
    - **Expected Outcome:** Well-presented flight results.
    - **Affected:** `components/FlightResults.tsx` and associated style files.
    - **Development:** Style the container, individual flight items, text formatting, etc.
    - **References:** Task 8.1, Phase 7.

5.  **Task 8.5: Add Transavia Branding Elements (Optional)**

    - **Description:** Incorporate Transavia colors, fonts, or logo if desired.
    - **Expected Outcome:** Application has a visual connection to the Transavia brand.
    - **Affected:** Global styles, potentially specific components.
    - **Development:** Find Transavia brand guidelines (or approximate) and apply relevant colors/fonts. Add logo image if available.
    - **References:** `assignment.md` (mentions Transavia styling is nice), Task 8.2.

6.  **Task 8.6: Responsive Design**
    - **Description:** Ensure the application layout and components adapt reasonably to different screen sizes (desktop, tablet, mobile).
    - **Expected Outcome:** Application is usable and looks good on various devices.
    - **Affected:** All styled components and layout files.
    - **Development:** Use responsive design techniques (media queries, responsive library features) to adjust layout, font sizes, element visibility etc.
    - **References:** Task 8.2, 8.3, 8.4.
