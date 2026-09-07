# Base44 Dev Environment

## Architecture
Single-origin Vite + React + Express app. `server.ts` is the entry point (`npm run dev` → `tsx server.ts`). It starts an Express server on port 3000 that mounts Vite as middleware (dev mode) and exposes API endpoints (`/api/security-briefings`, `/api/security-tips`, `/api/chat`). The frontend is served from live source via Vite — no prebuilt bundle.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d
```
The `web` service uses `node:22`, bind-mounts the repo, runs `npm install && npm run dev`, and maps port 3000.

## Secrets
- `GEMINI_API_KEY` (optional): Google Gemini API key. Without it, the app boots fine and serves local/default data for security briefings and chat. With it, AI-powered features use live Gemini calls.
- `APP_URL`: Self-referential URL; defaults to `http://localhost:3000`.

## Verification
- `curl http://localhost:3000` → HTML with Vite client scripts (confirms live source, not prebuilt)
- `curl http://localhost:3000/api/security-tips` → JSON with 12 tips
- `curl http://localhost:3000/api/security-briefings` → JSON with fallback briefings (or live if key present)

## Notes
- No lockfile; `npm install` resolves versions at startup.
- Vite runs in middleware mode (no standalone dev server), so host/origin checks are handled by Express, which binds `0.0.0.0`.
- `CHOKIDAR_USEPOLLING=true` is set for file watching to work through the Docker bind mount.
