# ARCHITECTURE.md

## Overview

Simple fullstack CRUD application with:
- Frontend (React SPA)
- Backend (Express REST API)
- Database (PostgreSQL via Prisma)

No AI, no background processing, no complex infrastructure.

## System Design

```
Browser → Frontend (Vite/React) → Backend API (Express) → Database (PostgreSQL)
```

- Frontend calls REST API via Axios (proxied through Vite dev server)
- Backend handles business logic in service layer
- Database stores tasks via Prisma ORM

## Backend Structure

```
src/
├── index.ts                    # App entry, middleware, route mounting
├── types.ts                    # Shared interfaces (CreateTaskInput, UpdateTaskInput)
├── lib/
│   └── prisma.ts               # Prisma client singleton
├── controllers/
│   └── task.controller.ts      # Request/response handling (thin)
├── services/
│   └── task.service.ts         # All business logic
└── routes/
    └── task.routes.ts          # Endpoint → controller mapping
```

### Rules

- Controllers handle request/response only — no business logic
- Services contain all business logic including status transition validation
- Routes only define endpoint-to-controller mapping
- `types.ts` holds shared interfaces used across layers

## Frontend Structure

```
src/
├── main.tsx                    # Entry point, QueryClientProvider
├── App.tsx                     # Main app with TanStack Query mutations
├── types.ts                    # Task, CreateTaskInput, UpdateTaskInput types
├── const.ts                    # Query key constants
├── index.css                   # TailwindCSS v4 entry
├── api/
│   └── tasks.ts                # Axios API functions (6 endpoints)
└── components/
    ├── TaskForm.tsx             # Create/edit form (reusable)
    ├── TaskItem.tsx             # Single task row with actions
    └── TaskList.tsx             # Task list with empty state
```

### Rules

- UI is a single-page app (no routing)
- TanStack Query manages server state (caching, invalidation)
- Axios API layer is the single source for HTTP calls
- Components are small and focused, not over-split

## Database

Single table: `Task` (defined in `prisma/schema.prisma`)

| Field | Type | Notes |
|-------|------|-------|
| id | Int | Auto-increment PK |
| title | String | Required |
| description | String? | Optional |
| status | TaskStatus enum | TODO (default), IN_PROGRESS, DONE |
| createdAt | DateTime | Auto-set on create |
| updatedAt | DateTime | Auto-updated |

## Task Status Flow

```
TODO → IN_PROGRESS → DONE
```

Rules:
- Cannot skip steps (TODO → DONE is rejected)
- DONE is terminal (no further transitions)
- No backward transitions (IN_PROGRESS → TODO is rejected)
- Validation lives in `task.service.ts` via `validateStatusTransition()`

## API Design

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `/tasks` | 200 | List all tasks (newest first) |
| GET | `/tasks/:id` | 200/404 | Get single task |
| POST | `/tasks` | 201/400 | Create task (title required) |
| PUT | `/tasks/:id` | 200/404/400 | Update title/description |
| DELETE | `/tasks/:id` | 200/404 | Delete task |
| PATCH | `/tasks/:id/status` | 200/404/400 | Update status with validation |

Error responses return `{ error: "message" }`.

## Non-Goals

- No authentication
- No AI features
- No background jobs
- No caching
- No microservices
- No complex state management
- No pagination or filtering

Keep everything minimal and easy to understand.
