# PLAN.md

## Goal

Build a simple fullstack Task Tracker CRUD app.

## Phase 1: Project Setup

- Create project structure:
  - backend/
  - frontend/
- Setup Docker Compose (PostgreSQL)
- Add .env.example
- Initialize backend project
- Initialize frontend project

## Phase 2: Backend - Data Layer

- Setup Prisma
- Define Task model:
  - id
  - title
  - description
  - status
  - createdAt
  - updatedAt
- Run migration
- Add seed data

## Phase 3: Backend - Core Logic

- Implement task.service.ts:
  - createTask
  - getTasks
  - getTaskById
  - updateTask
  - deleteTask
  - updateTaskStatus
- Implement status transition validation:
  - TODO -> IN_PROGRESS
  - IN_PROGRESS -> DONE
  - DONE is terminal

## Phase 4: Backend - API Layer

- Create task.controller.ts
- Create task.routes.ts
- Implement endpoints:
  - GET /tasks
  - GET /tasks/:id
  - POST /tasks
  - PUT /tasks/:id
  - DELETE /tasks/:id
  - PATCH /tasks/:id/status
- Ensure:
  - Controllers are thin
  - No business logic in controllers

## Phase 5: Backend Cleanup

- Refactor for clarity
- Extract reusable logic if needed (utils/, const.ts, type.ts)
- Keep structure simple
- Ensure code follows architecture rules

## Phase 6: Frontend

- Task list view
- Create / edit form
- Status update actions
- Delete task
- Handle loading + error states
- Connect to backend API

## Phase 7: Documentation

- Basic README
- Update architecture if needed
- Update DECISIONS.md

## Non-Goals

- No authentication
- No AI features
- No background jobs
- No complex validation layers
- No over-engineering

Keep everything minimal and focused on CRUD only.