# DECISIONS.md

Key technical decisions made during development.

## 1. Prisma as ORM

**Choice:** Prisma with PostgreSQL
**Why:** Type-safe database access, auto-generated client, simple schema definition. Fits the minimal scope — single table, no complex queries.

## 2. Thin Controllers + Service Layer

**Choice:** All business logic in `task.service.ts`, controllers only handle HTTP concerns.
**Why:** Keeps status transition validation centralized and testable. Controllers stay simple and focused on request/response.

## 3. Status Transition Validation in Service

**Choice:** `validateStatusTransition()` function with a `VALID_TRANSITIONS` map.
**Why:** Explicit, readable, easy to test. Throws errors on invalid transitions rather than silently ignoring.

## 4. TanStack Query for Frontend State

**Choice:** TanStack Query (React Query) instead of manual `useState` + `useEffect`.
**Why:** Automatic cache invalidation after mutations, built-in loading/error states, no need for global state management.

## 5. Axios for HTTP

**Choice:** Axios over native `fetch`.
**Why:** Cleaner API for JSON, automatic error transformation, interceptor support if needed later.

## 6. TailwindCSS v4 with Vite Plugin

**Choice:** TailwindCSS v4 via `@tailwindcss/vite` plugin (no PostCSS config).
**Why:** Simplest setup for Vite projects. Zero-runtime CSS, utility-first approach keeps styles colocated with components.

## 7. No ShadCN/ui

**Choice:** Plain TailwindCSS components instead of ShadCN/ui.
**Why:** ShadCN requires additional setup (CLI init, component registry, CSS variables). For a minimal CRUD app, custom Tailwind components are simpler and sufficient.

## 8. Separate Vitest Config

**Choice:** `vitest.config.ts` separate from `vite.config.ts`.
**Why:** Avoids type conflicts between Vite's `defineConfig` and Vitest's `test` property. Cleaner separation of build vs test concerns.

## 9. jsdom v24 (not v29)

**Choice:** Downgraded jsdom from v29 to v24.
**Why:** jsdom v29 requires Node.js >= 20.19.0. The development environment runs Node.js 20.10.0. v24 is fully compatible.

## 10. Query Keys in Constants File

**Choice:** `QUERY_KEY` object in `const.ts`.
**Why:** Single source of truth for query keys, prevents typos, easy to refactor if keys change.

## 11. Shared Types File

**Choice:** `types.ts` at both backend and frontend roots.
**Why:** Interfaces (`CreateTaskInput`, `UpdateTaskInput`, `Task`) are used across multiple files. Extracting avoids duplication and keeps imports clean.

## 12. Single Page App (No Router)

**Choice:** No React Router or page navigation.
**Why:** The app has one view (task list + form). Adding routing would be over-engineering for this scope.
