# Windows Setup Instructions

## Quick Setup (Recommended)

1. **Replace package.json:**
   - Rename your current `package.json` to `package-original.json`
   - Rename `package-windows.json` to `package.json`

2. **Install additional dependencies:**
   ```powershell
   npm install concurrently cross-env
   ```

3. **Run the application:**
   ```powershell
   npm run dev
   ```

This will start:
- Backend server on `http://localhost:5000`
- Frontend client on `http://localhost:5173` (with proxy to backend)

## What happens:
- `npm run dev` runs both server and client simultaneously
- Frontend runs on port 5173 (Vite default)
- Backend API runs on port 5000
- All API calls from frontend are proxied to backend automatically

## Alternative Manual Method:

If you prefer to run them separately:

**Terminal 1 (Backend):**
```powershell
$env:NODE_ENV="development"
npx tsx server/index.ts
```

**Terminal 2 (Frontend):**
```powershell
npx vite --config vite-client.config.ts
```

## Next time you want to start:
Just run: `npm run dev`