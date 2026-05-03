# task_crud_api.md

Read AGENTS.md and ARCHITECTURE.md.

## Implement Task CRUD API:

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
- PATCH /tasks/:id/status

## Rules:
- Keep controllers thin
- Put business logic in task.service.ts
- Do not add extra features

## Then:

Write unit tests for this service:
- Cover valid transitions
- Cover invalid transitions (expect error)
- Keep tests simple