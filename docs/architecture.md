# ARCHITECTURE.md

## Overview

Simple fullstack CRUD application with:
- Frontend (UI)
- Backend (API)
- Database

No AI, no background processing, no complex infrastructure.

## System Design

Frontend -> Backend API -> Database

- Frontend calls REST API
- Backend handles business logic
- Database stores tasks

## Backend Structure

- routes/
  - task.routes.ts
- controllers/
  - task.controller.ts
- services/
  - task.service.ts
- models/
  - task.model.ts (or Prisma schema)

### Rules

- Controllers handle request/response only
- Services contain all business logic
- No business logic in controllers
- Keep functions small and readable

## Frontend Structure

- pages/
- components/
- services/ (API calls)

### Rules

- UI should be simple
- No complex state management required
- Fetch data from backend via API

## Database

Single table: Task

Fields:
- id
- title
- description
- status
- createdAt
- updatedAt

## Task Status Flow

TODO -> IN_PROGRESS -> DONE

Rules:
- Cannot skip steps
- DONE is final
- No backward transitions

## API Design

Basic REST endpoints:

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id

## Non-Goals

- No authentication
- No AI features
- No background jobs
- No caching
- No microservices
- No complex state management

Keep everything minimal and easy to understand.