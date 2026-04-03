# Social Dashboard (modulare + più sicuro)

Questa versione separa il progetto in:

- `frontend` (React + Vite)
- `backend` (Express API con hardening base)

## Cosa è stato migliorato

- Architettura spezzata in più file (`components`, `constants`, `utils`)
- Preparazione deploy: frontend e backend separati
- Sicurezza backend:
  - `helmet` per header HTTP sicuri
  - `rate-limit` per limitare abuso API
  - CORS configurabile via env
  - API key Gemini solo lato server (`GEMINI_API_KEY`)

## Avvio locale

### 1) Backend

```bash
cd backend
cp .env.example .env
# inserisci GEMINI_API_KEY nel file .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deploy consigliato

- Frontend: Vercel / Netlify / Cloudflare Pages
- Backend: Render / Railway / Fly.io
- Variabili ambiente backend da pannello provider (`GEMINI_API_KEY`, `CORS_ORIGIN`)

## Step successivo consigliato

Integrare tutte le chiamate AI del frontend verso `POST /api/gemini/generate-image` per eliminare definitivamente qualsiasi gestione della chiave nel browser.
