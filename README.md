# Digital Farming Solutions

Monorepo: **nextjs-fe/** (frontend) and **java-be/** (backend). The frontend talks only to the backend; the backend calls the external ML service [dfs-mlapi](https://github.com/nikhar-25/dfs-mlapi).

- **nextjs-fe/** — Next.js 15 (TypeScript, Tailwind). Calls the backend for recommendations, suggestions, and crop list.
- **java-be/** — Spring Boot 2.7 (Java 11, Maven). REST API; calls dfs-mlapi for ML.

---

## High-Level Design (three microservices)

| Service      | Role         | Location |
|-------------|--------------|----------|
| **nextjs-fe** | Web UI       | This repo (`nextjs-fe/`) |
| **java-be**   | Backend API  | This repo (`java-be/`) |
| **dfs-mlapi** | ML inference | External (Django, e.g. Render) |

**Architecture**

```
User (Browser)  →  nextjs-fe :3000  →  java-be :8080  →  dfs-mlapi (e.g. Render)
                       │                    │
                       │                    ├─ GET /api/crops (in-memory)
                       │                    └─ POST /api/recommend, /api/suggest → ML
```

- **nextjs-fe:** Serves `/`, `/home`, `/crop`, `/fertiliser`. Calls java-be only (`GET /api`, `GET /api/crops`, `POST /api/recommend`, `POST /api/suggest`). Config: `NEXT_PUBLIC_API_URL`.
- **java-be:** Exposes `/api/*`, CORS, `ApiResponse<T>`. CropService (in-memory crop list). MlApiService proxies to dfs-mlapi `POST /api/croprecommend` and `POST /api/suggest`.
- **dfs-mlapi:** External. `POST /api/croprecommend` (soil/climate → crop), `POST /api/suggest` (crop + nutrients → fertilizer).

**Data flow:** Crop list → FE → BE (no ML). Crop recommendation → FE → BE → dfs-mlapi `/api/croprecommend` → back. Fertilizer suggestion → FE → BE → dfs-mlapi `/api/suggest` (crop lowercased) → back.

**Run order:** 1) dfs-mlapi reachable, 2) java-be, 3) nextjs-fe with `NEXT_PUBLIC_API_URL` pointing at BE.

---

## Run locally

**1. Backend (port 8080)**

```bash
cd java-be
mvn spring-boot:run
```

**2. Frontend (port 3000)**

```bash
cd nextjs-fe
cp .env.local.example .env.local   # optional: edit if BE is not on localhost:8080
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses `http://localhost:8080` for the API.

## Config

- **Backend**: `java-be/src/main/resources/application.properties`  
  - `server.port=8080`  
  - `app.cors.allowed-origins` — includes `localhost:3000`, `localhost:3001`, `127.0.0.1:3000`, `127.0.0.1:3001`  
  - `app.ml-api.base-url` — ML API base URL (e.g. `https://dfs-mlapi.onrender.com`)
- **Frontend**: `nextjs-fe/.env.local`  
  - `NEXT_PUBLIC_API_URL=http://localhost:8080`

## API (Backend)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api | Health |
| GET | /api/crops | Sorted list of crop names (for dropdowns) |
| POST | /api/recommend | Crop recommendation (body: N, P, K, temperature, humidity, ph, rainfall) |
| POST | /api/suggest | Fertilizer suggestion (body: Crop, N, P, K, soil_moisture) |
