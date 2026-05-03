Read AGENTS.md and ARCHITECTURE.md, docs/plan.md

Implement Phase 2: Backend - Data Layer.

Tasks:
- Setup Prisma in backend/
- Initialize Prisma with PostgreSQL datasource
- Define Task model with fields:
  - id (auto-generated)
  - title (string)
  - description (string, optional)
  - status (enum: TODO | IN_PROGRESS | DONE)
  - createdAt
  - updatedAt

- Generate Prisma client
- Run database migration
- (Optional) Add seed data for Task model

Requirements:
- Keep setup minimal and standard
- Do not add extra tables or features
- Do not introduce authentication or users table
- Only focus on Task model

Then:

- Install required dependencies (prisma, @prisma/client if needed)
- Run prisma migration
- Run prisma generate
- Ensure database is connected successfully

If any step fails:
- Fix the schema or config
- Re-run migration/generate
- Repeat until everything works

Do not proceed until Prisma setup is fully working.