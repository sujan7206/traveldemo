# traveldemo

Small travel demo app.

- `site/` — React + Vite frontend (dev server on port `3000`, proxies `/api` to the API)
- `api/` — Express JSON API (port `3001`)

## Run with Docker (Alloy)

```bash
docker compose -f docker-compose.alloy.yaml up
```

Then open http://localhost:3000.

## Run locally

```bash
cd api && npm install && npm run dev
cd site && npm install && npm run dev
```
