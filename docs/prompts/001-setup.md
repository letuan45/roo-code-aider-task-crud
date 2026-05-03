Read AGENTS.md and ARCHITECTURE.md, docs/plan.md

Implement Phase 1: Project Setup in docs/plan.md

## Tasks:
- Create project structure:
  - backend/
  - frontend/
- Initialize backend project (Node.js + TypeScript)
- Initialize frontend project (simple setup, no complex framework required)
- Setup Docker Compose with PostgreSQL
- Add .env.example with required environment variables

## Requirements:
- Keep everything minimal
- Do not add authentication or extra features
- Use simple and common tooling only
- Backend should be ready to run basic server
- Frontend should be able to start (even empty UI is fine)
- Do not implement any logic yet

Then:

- Install all required dependencies
- Run setup commands (e.g. npm install, docker compose up -d)
- Verify:
  - backend can start
  - frontend can start
  - database container is running

## If any step fails:
- Fix the issue
- Re-run the command
- Repeat until everything works

Do not stop until the project can run successfully.