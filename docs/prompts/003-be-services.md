Read AGENTS.md and ARCHITECTURE.md, docs/plan.md

Implement Phase 3: Backend - Core Logic.

Focus only on backend business logic.

## Tasks

Implement `task.service.ts` with the following functions:

- createTask
- getTasks
- getTaskById
- updateTask
- deleteTask
- updateTaskStatus

## Business Rules

Implement strict status transition validation:

- TODO → IN_PROGRESS
- IN_PROGRESS → DONE
- DONE is terminal (cannot change anymore)

If invalid transition occurs:
- throw an error
- do not silently ignore

## Requirements

- All business logic must be inside task.service.ts
- Controllers/routes must NOT contain logic
- Do not add extra features (auth, pagination, filtering, etc.)
- Keep implementation minimal and readable
- Use Prisma client from previous phase

## Testing (IMPORTANT)

After implementation:

- Write unit tests for task.service.ts
- Tests must cover:
  - valid status transitions
  - invalid transitions (must throw errors)
  - basic CRUD behavior

## Execution loop

- Run unit tests after writing them
- If tests fail:
  - fix implementation OR test
  - re-run tests
  - repeat until all tests pass

Do not finish until all tests are passing.

## Constraints

- No new modules
- No architecture changes
- No extra abstraction layers
- Keep everything simple