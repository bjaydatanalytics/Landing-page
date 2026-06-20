# Innersolv Deployment

## Backend And Database

This app uses:

- Next.js route handler: `app/api/contact/route.ts`
- Prisma ORM: `prisma/schema.prisma`
- PostgreSQL database via `DATABASE_URL`
- Basic auth protection for `/admin/*` via `proxy.ts`

Contact form submissions are stored in the `Lead` table.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set:

```bash
DATABASE_URL="your-postgres-connection-string"
DIRECT_URL="your-direct-or-session-pooler-postgres-connection-string"
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-strong-admin-password"
RESEND_API_KEY="your-resend-api-key"
CONTACT_FROM_EMAIL="Innersolv <hello@yourdomain.com>"
```

3. Generate Prisma Client:

```bash
npm run db:generate
```

4. Sync the Prisma schema to the database:

```bash
npm run db:push
```

5. Start the app:

```bash
npm run dev
```

The public site runs at `/`, the contact API runs at `/api/contact`, and leads are visible at `/admin/leads` after admin login.

## Deployment Strategy

Recommended stack:

- Hosting: Vercel
- Database: Supabase Postgres, Neon Postgres, Railway Postgres, or Vercel Postgres
- ORM: Prisma

### Vercel Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add environment variables in Vercel Project Settings:

```bash
DATABASE_URL
DIRECT_URL
ADMIN_USERNAME
ADMIN_PASSWORD
RESEND_API_KEY
CONTACT_FROM_EMAIL
```

4. Use the default build command:

```bash
npm run build
```

5. Before or during deployment, make sure the database schema is applied:

```bash
npm run db:push
```

For a more controlled production flow after creating migrations, use:

```bash
npm run db:migrate
```

## Production Notes

- Keep `.env` private and never commit it.
- Use a strong `ADMIN_PASSWORD`; `/admin/leads` is protected by Basic Auth.
- Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to send automatic welcome emails after form submissions.
- If the database password has been shared anywhere, rotate it before deploying.
- For Supabase, use the transaction pooler connection string for `DATABASE_URL` in serverless hosting. Use the direct connection or session pooler connection string for `DIRECT_URL` so Prisma can create and update tables.
- After deploy, test:
  - Home page loads.
  - Contact form submits successfully.
  - `/admin/leads` prompts for admin credentials.
  - Submitted leads appear in the admin page.
