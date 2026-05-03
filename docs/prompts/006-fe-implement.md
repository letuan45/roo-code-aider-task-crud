Read AGENTS.md and ARCHITECTURE.md, docs/wireframe.md, docs/plan.md

Implement Phase 6: Frontend.

## Goal

Build a simple frontend for Task CRUD operations.

Use TailwindCSS, ShadCN to implement UI

Use Tanstack Query, axios to call API

No advanced architecture. Keep it minimal and functional.

## Tasks

Implement UI with the following features:

- Task list view
- Create task form
- Edit task form (can reuse create form if possible)
- Delete task action
- Update task status action (TODO → IN_PROGRESS → DONE)

## API Integration

Connect frontend to backend API:

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- PATCH /tasks/:id/status
- DELETE /tasks/:id

## UI Requirements
- Show list of tasks clearly
- Each task shows:
  - title
  - description
  - status
- Provide buttons for:
  - edit
  - delete
  - change status

## State Handling

- Handle loading state (e.g. fetching tasks)
- Handle error state (API failure)
- Keep state management simple (use basic state only, no external state library unless already present)

## Strict Constraints

- Do NOT introduce complex state management (Redux, Zustand, etc.)
- Do NOT add authentication
- Do NOT add routing complexity unless already required
- Do NOT add UI frameworks unless already initialized in project
- Do NOT over-design components

## Architecture Rules

- Frontend should remain simple and feature-focused
- Keep components small but not over-split
- Avoid unnecessary abstraction layers

## Behavior Rules

- UI must reflect backend state accurately
- Any API error must be shown to user in simple form
- Do not silently fail actions

## Completion Criteria

Frontend is complete when:

- User can create task
- User can edit task
- User can delete task
- User can update status
- Task list updates correctly after each action
- No broken API integration