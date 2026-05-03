Read AGENTS.md and ARCHITECTURE.md, docs/plan.md.

Implement Phase 4: Backend - API Layer.

## Tasks

Create:

- task.controller.ts
- task.routes.ts

Implement REST API endpoints:

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
- PATCH /tasks/:id/status

## Architecture Rules (STRICT)

- Controllers MUST be thin
- Controllers must NOT contain business logic
- All business logic must be delegated to task.service.ts
- Routes only define endpoint mapping
- Do not introduce new layers (no extra middleware/service layers unless required by existing architecture)

## Implementation Rules

- Use existing task.service.ts from Phase 3
- Do not duplicate logic from service layer
- Keep code simple and readable
- Do not add authentication
- Do not add validation libraries unless already used in project
- Do not add pagination, filtering, or extra endpoints

## Error Handling

- Return proper HTTP status codes:
  - 200 OK (GET, PUT, PATCH)
  - 201 Created (POST)
  - 404 Not Found (invalid id)
  - 400 Bad Request (invalid status transition or input)

## Integration Requirement

After implementation:

- Ensure routes are correctly wired to controller
- Ensure controller correctly calls service methods
- Ensure API matches defined endpoints exactly
- Write more unit test or update unit test if needed

Execution Loop

## If any issue occurs:

- Fix controller or route mapping
- Ensure service remains source of truth for business logic
- Re-test endpoints after fix

Do not finish until all endpoints are working correctly.