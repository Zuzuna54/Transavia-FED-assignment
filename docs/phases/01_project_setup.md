# Phase 1: Project Setup & Foundation

**Goal:** Establish a robust, scalable Next.js project structure with TypeScript, foundational libraries (MUI, Framer Motion), SCSS setup, and strict development standards.

**Sub-tasks:**

1.  **Task 1.0: Define Core Dependencies**

    - **Description:** List all core and supplementary libraries required for the project based on the refined plan.
    - **Expected Outcome:** A clear list of dependencies to be installed.
    - **Affected:** Planning / `package.json` (in subsequent task).
    - **Development:**
      - Core: `next`, `react`, `react-dom`, `typescript`
      - UI Components: `@mui/material`, `@mui/icons-material`, `@mui/x-date-pickers`
      - Styling Engine (for MUI): `@emotion/react`, `@emotion/styled`
      - Custom Styling: `sass` (dev dependency)
      - Date Handling: `date-fns`, `@date-io/date-fns` (adapter for MUI pickers)
      - Animation: `framer-motion`
      - Testing: `jest`, `@types/jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `ts-jest`
      - Linting/Formatting: `eslint`, `eslint-config-next`, `prettier`
      - State Management: React Context API (initially), consider `zustand` if complexity increases.
      - Validation (Optional): `zod`
    - **References:** Refined requirements, All Phases.

2.  **Task 1.1: Initialize Next.js Project with TypeScript**

    - **Description:** Use `create-next-app`. Select Yes for TypeScript, ESLint, `src/` directory. Select No for Tailwind CSS, App Router (unless preferred). Keep default import alias.
    - **Expected Outcome:** Basic Next.js project directory with `package.json`, `tsconfig.json`, ESLint config.
    - **Affected:** Project root directory.
    - **Development:** Run `npx create-next-app@latest flight-search-app`. Follow prompts.
    - **References:** N/A (Initial setup).

3.  **Task 1.2: Install Core Dependencies & SCSS**

    - **Description:** Install MUI, Emotion, date pickers/adapter, date-fns, Framer Motion, Zod (optional), and `sass` as a dev dependency.
    - **Expected Outcome:** `package.json` updated with necessary dependencies and devDependencies.
    - **Affected:** `package.json`, `node_modules`, lock file.
    - **Development:** Run `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns @date-io/date-fns framer-motion zod` and `npm install --save-dev sass`.
    - **References:** Task 1.0.

4.  **Task 1.3: Configure Strict TypeScript (`tsconfig.json`)**

    - **Description:** Ensure `tsconfig.json` enforces `"strict": true` and configure path aliases (`"baseUrl": "."`, `"paths": { "@/*": ["src/*"] }`).
    - **Expected Outcome:** Configured `tsconfig.json` promoting type safety and cleaner imports.
    - **Affected:** `tsconfig.json`.
    - **Development:** Edit `tsconfig.json`.
    - **References:** Task 1.1.

5.  **Task 1.4: Setup Advanced Folder Structure (including SCSS)**

    - **Description:** Create a modular `src/` structure including standard component/logic folders and a structured `src/styles` directory for SCSS partials.
    - **Expected Outcome:** Standardized folder structure: `src/components/` (atoms, molecules, organisms), `src/lib/`, `src/utils/`, `src/hooks/`, `src/types/`, `src/contexts/`, `src/pages/`, and `src/styles/` containing `globals.scss`, `abstracts/` (\_variables.scss, \_mixins.scss), `base/` (\_reset.scss, \_typography.scss), `layout/`, `components/`.
    - **Affected:** Project root directory structure.
    - **Development:** Create directories and initial SCSS files (e.g., `_variables.scss`).
    - **References:** Task 1.1.

6.  **Task 1.5: Configure ESLint & Prettier**

    - **Description:** Ensure ESLint/Prettier are configured. Add lint/format scripts to `package.json`.
    - **Expected Outcome:** Config files set up. IDE integration working. Scripts available.
    - **Affected:** Config files, `package.json`.
    - **Development:** Verify/update configs. Add `"format": "prettier --write \"**/*.{ts,tsx,scss,md,json}\""` script.
    - **References:** Task 1.1.

7.  **Task 1.6: Setup MUI Theme & Global SCSS Import**

    - **Description:** Create a basic MUI theme (`src/styles/theme.ts`) primarily for defining variables (palette, breakpoints, typography settings) that can be potentially referenced or used to generate SCSS variables. Import the main SCSS entry point (`globals.scss`) in `_app.tsx`. Wrap app in MUI `ThemeProvider`, `CssBaseline`, and `LocalizationProvider`.
    - **Expected Outcome:** MUI ThemeProvider setup. Global SCSS file imported, allowing global styles and variables.
    - **Affected:** `src/styles/theme.ts`, `src/styles/globals.scss` (new/updated), `src/pages/_app.tsx`.
    - **Development:** Create `theme.ts`. Create `globals.scss` and import partials (@import 'abstracts/variables'; etc.). In `_app.tsx`, add `import '@/styles/globals.scss';` and wrap with providers.
    - **References:** Task 1.2, Task 1.4.

8.  **Task 1.7: Verify Project Runs**
    - **Description:** Start dev server to ensure basic setup, including SCSS compilation and MUI integration, works.
    - **Expected Outcome:** Default page renders without errors. Basic global styles (if any added to `globals.scss`) are applied.
    - **Affected:** Development environment.
    - **Development:** Run `npm run dev`. Check browser.
    - **References:** Task 1.1 - 1.6.
