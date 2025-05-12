# Phase 1: Project Setup & Foundation

**Goal:** Establish a robust, scalable Next.js project structure with TypeScript, foundational libraries (MUI, Framer Motion), and strict development standards.

**Sub-tasks:**

1.  **Task 1.0: Define Core Dependencies**

    - **Description:** List all core and supplementary libraries required for the project based on the refined plan.
    - **Expected Outcome:** A clear list of dependencies to be installed.
    - **Affected:** Planning / `package.json` (in subsequent task).
    - **Development:**
      - Core: `next`, `react`, `react-dom`, `typescript`
      - UI & Styling: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
      - Date Handling: `@mui/x-date-pickers`, `date-fns`, `@date-io/date-fns` (as adapter for MUI pickers)
      - Animation: `framer-motion`
      - Testing: `jest`, `@types/jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `ts-jest`
      - Linting/Formatting: `eslint`, `eslint-config-next`, `prettier` (often pre-configured)
      - State Management: React Context API (initially), consider `zustand` if complexity increases.
      - Validation (Optional but recommended): `zod`
    - **References:** Refined requirements, All Phases.

2.  **Task 1.1: Initialize Next.js Project with TypeScript**

    - **Description:** Use `create-next-app` with the TypeScript template. Select options for ESLint and Tailwind CSS (even if primarily using MUI, Tailwind can be useful for utility styling or if preferred later, otherwise select No). Ensure App Router is selected if preferred, or Pages Router otherwise (plan assumes Pages Router for `getStaticProps` examples, adjust if using App Router).
    - **Expected Outcome:** A basic Next.js project directory with `package.json`, `tsconfig.json`, ESLint config.
    - **Affected:** Project root directory.
    - **Development:** Run `npx create-next-app@latest --ts`. Follow prompts.
    - **References:** N/A (Initial setup).

3.  **Task 1.2: Install Core Dependencies**

    - **Description:** Install the pre-defined core libraries (MUI, Framer Motion, MUI Date Pickers/Adapter, date-fns).
    - **Expected Outcome:** `package.json` and `yarn.lock`/`package-lock.json` updated with necessary dependencies.
    - **Affected:** `package.json`, `node_modules`, lock file.
    - **Development:** Run `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers date-fns @date-io/date-fns framer-motion [Optional: zod]` (or `yarn add ...`).
    - **References:** Task 1.0.

4.  **Task 1.3: Configure Strict TypeScript (`tsconfig.json`)**

    - **Description:** Ensure `tsconfig.json` enforces strict type checking (`"strict": true`) and configure path aliases (e.g., `@/*`) for cleaner imports.
    - **Expected Outcome:** A configured `tsconfig.json` promoting type safety and better import paths.
    - **Affected:** `tsconfig.json`.
    - **Development:** Edit `tsconfig.json`, ensure `"strict": true`, add `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }` (adjust `src/*` if not using a `src` directory). [Reference: Iqbal Pahlevi A - Medium](https://iqbalpa.medium.com/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-2ee5693e73a9)
    - **References:** Task 1.1.

5.  **Task 1.4: Setup Advanced Folder Structure**

    - **Description:** Create a modular and scalable folder structure (e.g., inside a `src/` directory).
    - **Expected Outcome:** A standardized folder structure promoting separation of concerns (e.g., `src/components/`, `src/lib/` (core logic, non-React), `src/utils/` (React-specific utils/hooks), `src/hooks/`, `src/types/`, `src/contexts/`, `src/styles/`, `src/pages/`, `src/services/` (if API calls were needed)).
    - **Affected:** Project root directory structure.
    - **Development:** Create directories. Consider Atomic Design principles for `components` (e.g., `atoms`, `molecules`, `organisms`). [Reference: Pedals Up - Medium](https://medium.com/@PedalsUp/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-626257980e60)
    - **References:** Task 1.1.

6.  **Task 1.5: Configure ESLint & Prettier**

    - **Description:** Ensure ESLint and Prettier are configured for consistent code style and quality checks. Integrate Prettier with ESLint.
    - **Expected Outcome:** Config files (`.eslintrc.json`, `.prettierrc.json` or equivalents) set up. IDE integration working.
    - **Affected:** Config files, `package.json` (scripts).
    - **Development:** Verify/update `.eslintrc.json` (e.g., add rules). Create/verify `.prettierrc.json`. Add lint/format scripts to `package.json`. [Reference: Iqbal Pahlevi A - Medium](https://iqbalpa.medium.com/mastering-next-js-best-practices-for-clean-scalable-and-type-safe-development-2ee5693e73a9)
    - **References:** Task 1.1.

7.  **Task 1.6: Setup MUI Theme & Provider**

    - **Description:** Create a basic MUI theme (e.g., defining primary/secondary colors, potentially typography). Wrap the application in MUI's `ThemeProvider` and `CssBaseline`. Configure the DatePicker provider.
    - **Expected Outcome:** MUI is configured with a custom theme, and providers are set up in `_app.tsx`.
    - **Affected:** `src/styles/theme.ts` (new), `src/pages/_app.tsx`.
    - **Development:** Create `theme.ts` using `createTheme`. Import and apply `ThemeProvider`, `CssBaseline` in `_app.tsx`. Wrap with `LocalizationProvider` from `@mui/x-date-pickers` using `AdapterDateFns`.
    - **References:** Task 1.2, Task 1.4.

8.  **Task 1.7: Verify Project Runs**
    - **Description:** Start the development server to ensure the initial setup, including MUI integration, works correctly.
    - **Expected Outcome:** The default Next.js page renders without errors, potentially with basic MUI styles applied via `CssBaseline`.
    - **Affected:** Development environment.
    - **Development:** Run `npm run dev` (or `yarn dev`) and open the specified localhost URL.
    - **References:** Task 1.1 - 1.6.
