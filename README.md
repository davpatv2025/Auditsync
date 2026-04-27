# ContaAI — AI Accounting SaaS (MVP first)

ContaAI is a full-stack SaaS accountant built for **GitHub + Vercel + Supabase free tier**.
It starts with an MVP (auth + smart transactions + dashboard) and progressively enables automated bookkeeping, reconciliation, reporting, and AI analysis.

## 1) Architecture

- **Monorepo**: single Next.js repo.
- **Frontend**: Next.js App Router pages in `app/`.
- **Backend**: Serverless API routes in `app/api/*`.
- **DB/Auth**: Supabase (Postgres + Auth), multi-tenant by `tenantId` and `userId`.
- **Automation**: GitHub Actions cron triggers monthly report + anomaly jobs.
- **Hosting**: Vercel auto-deploy from GitHub.

### Folder structure

- `app/`: UI routes + API routes
- `components/`: reusable dashboard and form components
- `lib/`: parser, accounting engine, reconciliation logic, AI integration, DB clients
- `scripts/`: monthly cron runner + sample data seed helpers
- `.github/workflows/`: deploy and monthly automation workflows

## 2) MVP delivered

### Step 1 — MVP
- Email/password auth endpoints (`/api/auth/signup`, `/api/auth/login`)
- Smart natural-language transaction parser (`/api/transactions`)
- Dashboard + transactions listing + basic reports + chat + admin page shell

### Step 2 — Accounting engine
- Chart of accounts mapping
- Auto journal entry generation when saving a transaction

### Step 3 — Reconciliation
- CSV statement parsing (`/api/reconcile`)
- Matching by date + amount
- Outputs matched / missing / duplicates

### Step 4 — Reports
- Monthly report generation API (`/api/reports/generate`)
- Income/expense/net persisted into `reports`

### Step 5 — AI accountant
- Chat endpoint (`/api/ai/chat`) with OpenRouter free model
- Prompted for recommendations, report explanations, and spending analysis

## 3) Database design (Supabase SQL)

Run in Supabase SQL editor:

```sql
create table if not exists users (
  id uuid primary key,
  email text unique,
  role text default 'USER',
  status text default 'active',
  tenantId text not null,
  createdAt timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key,
  userId text not null,
  tenantId text not null,
  amount numeric not null,
  category text not null,
  type text not null,
  paymentMethod text not null,
  date date not null,
  source text,
  createdAt timestamptz default now()
);

create table if not exists journal_entries (
  id uuid primary key,
  transactionId uuid,
  debitAccount text not null,
  creditAccount text not null,
  amount numeric not null,
  date date not null
);

create table if not exists reports (
  id uuid primary key,
  userId text not null,
  month text not null,
  income numeric not null,
  expenses numeric not null,
  net numeric not null,
  createdAt timestamptz default now()
);

create table if not exists logs (
  id uuid primary key default gen_random_uuid(),
  userId text,
  action text,
  payload jsonb,
  createdAt timestamptz default now()
);
```

## 4) Deploy (online only)

1. Push this repo to GitHub.
2. Import project in Vercel.
3. Add env vars from `.env.example` in Vercel.
4. Configure Supabase project and run SQL schema.
5. Add GitHub Secrets for workflows:
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
   - `APP_URL`, `CRON_USER_ID`
6. Push to `main` for automatic deploy.

## 5) Usage examples

- Smart input: `gasté 300 en comida con tarjeta`
- AI questions:
  - `Where am I spending the most?`
  - `Am I at financial risk?`
  - `Explain my balance sheet`

## 6) Free-tier constraints

- Supabase free DB + auth
- OpenRouter free model (`mistralai/mistral-7b-instruct:free`) by default
- Vercel hobby plan

## 7) Next enhancements

- PDF extraction pipeline for statements
- stronger reconciliation scoring
- role-based middleware and row-level security policies
- chart visualizations with Recharts
- detailed admin logs and activity stream
