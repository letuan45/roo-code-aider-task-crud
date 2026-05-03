# AGENTS.md

## Project
Build a simple fullstack Task Tracker CRUD app.

## Scope
- Create, read, update, delete tasks
- No AI features
- No automation or background jobs
- Keep everything minimal

## Domain
Task fields:
- id
- title
- description
- status: TODO | IN_PROGRESS | DONE
- createdAt
- updatedAt

Status rules:
- TODO -> IN_PROGRESS
- IN_PROGRESS -> DONE
- DONE is terminal
- DONE cannot go back

## Architecture rules
- Controllers/routes must stay thin
- Business logic must live in task.service.ts
- Status transition validation must be in service layer
- Do not put business rules in route handlers
- Keep implementation simple and readable

## Testing rules
- Unit tests for status transition logic
- One integration test: create -> update status -> list

## Commands

Backend:
- cd backend && npm run dev
- cd backend && npm run test
- cd backend && npx prisma migrate dev

Frontend:
- cd frontend && npm run dev

Infra:
- docker compose up -d