# Ahnajak Pay

Ahnajak Pay is a SaaS payment gateway starter for ACLEDA integration built with React + Supabase.

## Included Features

- Landing page with cyberpunk dark-mode branding.
- Login and signup using Supabase Auth.
- Protected developer dashboard.
- Merchant configuration form for ACLEDA credentials.
- API key copy button + success toast.
- Auto-attempt copy API key after login.
- Recent transactions table (last 5).
- Dashboard test buttons for QR generation and credit card flow.
- Docs page with complete Node.js sample (install, init, checkout, status check, webhook verification).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

3. Fill in your Supabase values and API base URL in `.env`.

4. Run the app:

   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_AHNAJAK_API_BASE_URL` (default: `https://api.ahnajak.com`)
- `SUPABASE_DB_URL` (optional for CLI migration script)

## Database

### Option A: Supabase SQL Editor

Run the migration in `supabase/migrations/202602141300_init.sql` in your Supabase SQL editor.

### Option B: PostgreSQL connection string (CLI)

If you want to run migrations directly using your Supabase Postgres endpoint:

```bash
export SUPABASE_DB_URL='postgresql://postgres:<YOUR-PASSWORD>@db.uyyirtfrrrvbnntrsplg.supabase.co:5432/postgres'
./scripts/run-migration.sh supabase/migrations/202602141300_init.sql
```

Your provided connection template is compatible:

```text
postgresql://postgres:[YOUR-PASSWORD]@db.uyyirtfrrrvbnntrsplg.supabase.co:5432/postgres
```

## Security Note

This starter stores credentials in `encrypted_secret_key` field, but production-grade encryption/decryption should run server-side (Supabase Edge Function or secure Node backend), not in a browser client.
Never commit raw database passwords, service-role keys, or webhook secrets into source control.
