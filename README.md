# OutreachPlatform

## Project Structure

- **frontend/**: React + Vite SPA using standard React Router.
- **backend/**: Modular Express server (Twilio, Resend, etc.).
- **supabase/**: Supabase configuration and migrations.

## Getting Started

1.  **Install Dependencies**:
    From the root directory:
    ```bash
    pnpm install
    ```
    *If you see build script errors, run `pnpm approve-builds` or `pnpm install --no-frozen-lockfile`.*

2.  **Environment Setup**:
    Ensure `.env` files are present in both `frontend/` and `backend/`.

3.  **Run Backend**:
    ```bash
    cd backend
    pnpm run dev
    ```

4.  **Run Frontend**:
    ```bash
    cd frontend
    pnpm run dev
    ```

## Architecture

- **Frontend**:
  - Uses `react-router-dom` for SPA routing.
  - Components located in `src/components`.
  - Pages located in `src/routes`.
  - API calls to backend via `src/lib/email.ts` and `src/routes/calls.tsx`.

- **Backend**:
  - `server.ts`: Entry point.
  - `src/app.ts`: Express setup.
  - `src/controllers/`: Request handling.
  - `src/services/`: Business logic (Twilio, Resend).
  - `src/routes/`: API route definitions.
