Read AGENTS.md and ARCHITECTURE.md, docs/plan.md.

Implement Phase 5: Backend Cleanup and Refactor.

## Goals

Refactor existing backend code for clarity, maintainability, and consistency WITHOUT changing behavior.

## Tasks

- Refactor code only if it improves readability or removes duplication
- Ensure consistent structure across:
  - task.service.ts
  - task.controller.ts
  - task.routes.ts

## Allowed Refactors

You MAY extract:

- Shared constants → const.ts (only if truly reused)
- Shared types/interfaces → types.ts
- Small reusable helper functions → utils/ (ONLY if reused in multiple places)

## Strict Constraints (IMPORTANT)

- Do NOT introduce new architecture layers
- Do NOT change business logic
- Do NOT add new features
- Do NOT optimize prematurely
- Do NOT split files unnecessarily
- Keep structure as simple as possible

## Architecture Rules (must still be respected)

- Controllers remain thin
- Business logic remains in service layer
- Routes only define mappings
- Service remains single source of truth for logic

## Refactor Principles

- Prefer deletion over abstraction
- Prefer simplicity over reuse
- If unsure → do NOT extract into new file
- Avoid over-engineering at all cost

## Output Requirement

After refactor:

- Code should be easier to read than before
- No behavior changes
- No new bugs introduced
- Existing API must remain identical


## Safety Check

Before finishing:

- Ensure all endpoints still work
- Ensure service logic unchanged
- Ensure no unnecessary files were created