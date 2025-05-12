# Phase 8: MUI Theming, Responsiveness & Polish

**Goal:** Refine the application's visual appearance using MUI theming, ensure responsiveness across devices, add subtle animations, and apply Transavia branding elements if desired.

**Sub-tasks:**

1.  **Task 8.1: Customize MUI Theme**

    - **Description:** Expand the basic MUI theme created in Phase 1 (`src/styles/theme.ts`). Define a color palette (potentially based on Transavia branding), customize typography (fonts, sizes), and adjust component default styles (e.g., Button variants, Card elevation) for a unique look.
    - **Expected Outcome:** A cohesive and customized visual theme applied consistently across the application.
    - **Affected:** `src/styles/theme.ts`, `src/pages/_app.tsx`.
    - **Development:** Use `createTheme` options extensively. Define `palette`, `typography`, `components` overrides. Ensure theme is correctly provided in `_app.tsx`.
    - **References:** Task 1.6, [MUI Theming Docs](https://mui.com/material-ui/customization/theming/).

2.  **Task 8.2: Apply Consistent Layout**

    - **Description:** Implement a consistent page layout using MUI's `Container` component or custom layout components built with `Grid` or `Stack`. Ensure proper spacing and alignment.
    - **Expected Outcome:** All content is well-aligned within a consistent page structure (e.g., centered, max-width).
    - **Affected:** `src/pages/index.tsx`, potentially a new layout component (`src/components/layout/MainLayout.tsx`).
    - **Development:** Wrap page content in `<Container maxWidth="md">...</Container>` or similar. Use `Box`, `Stack`, `Grid` for internal spacing.
    - **References:** Phase 1 (MUI setup).

3.  **Task 8.3: Refine Form Component Styling**

    - **Description:** Fine-tune the styling of `FlightSearchForm` using the custom theme and potentially the `sx` prop for specific adjustments. Ensure focus states, spacing, and alignment are polished.
    - **Expected Outcome:** The form is visually integrated with the theme and highly usable.
    - **Affected:** `src/components/organisms/FlightSearchForm/FlightSearchForm.tsx`, `src/styles/theme.ts`.
    - **Development:** Rely primarily on theme overrides. Use `sx` prop for minor tweaks: `sx={{ mt: 2, mb: 1 }}`. Check visual hierarchy and readability.
    - **References:** Task 8.1, Phase 3, Phase 4, Phase 5.

4.  **Task 8.4: Refine Results Component Styling**

    - **Description:** Polish the styling of `FlightResults`, ensuring flight cards are clear, readable, and utilize the theme effectively. Adjust spacing, typography, and layout within cards.
    - **Expected Outcome:** Flight results are presented professionally and are easy to scan.
    - **Affected:** `src/components/organisms/FlightResults/FlightResults.tsx`, `src/styles/theme.ts`.
    - **Development:** Use theme styles. Apply `sx` prop for card-specific adjustments. Ensure consistent spacing and visual weight for information.
    - **References:** Task 8.1, Phase 7.

5.  **Task 8.5: Implement Responsive Design**

    - **Description:** Ensure the layout of the form and results adapts gracefully to different screen sizes using MUI's responsive helpers (Grid breakpoints, `sx` prop with breakpoint objects, `useMediaQuery` hook if needed).
    - **Expected Outcome:** Application provides a good user experience on desktop, tablet, and mobile devices.
    - **Affected:** `FlightSearchForm.tsx`, `FlightResults.tsx`, layout components.
    - **Development:** Use responsive props in `Grid` (`xs`, `sm`, `md`). Use `sx` prop with objects: `sx={{ flexDirection: { xs: 'column', sm: 'row' } }}`. Test thoroughly using browser dev tools.
    - **References:** Task 8.2, 8.3, 8.4, [MUI Responsive Docs](https://mui.com/material-ui/customization/responsive-values/).

6.  **Task 8.6: Add Subtle Page/Layout Animations (Framer Motion)**

    - **Description:** Introduce subtle page transitions or layout animations using Framer Motion for a smoother overall feel (e.g., animating the results section appearance relative to the form).
    - **Expected Outcome:** Enhanced perceived performance and visual appeal through motion.
    - **Affected:** `src/pages/index.tsx`, potentially `_app.tsx` or layout component.
    - **Development:** Use `motion.div` with `initial`, `animate`, `exit` props on page containers or key sections. Consider `LayoutGroup` for shared layout animations if needed.
    - **References:** Phase 1 (Framer Motion), Phase 7 (Results Animation).

7.  **Task 8.7: Apply Transavia Branding (Optional)**
    - **Description:** If desired, integrate Transavia brand colors (e.g., green, blue) into the MUI theme's palette. Optionally add the logo.
    - **Expected Outcome:** Application visually aligns with Transavia's branding.
    - **Affected:** `src/styles/theme.ts`, potentially layout component for logo.
    - **Development:** Update `palette` in `theme.ts` with Transavia colors. Add an `<img>` or SVG component for the logo in the header/layout.
    - **References:** Task 8.1, `assignment.md`.
