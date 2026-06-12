# IKADA Website

A warm, bilingual MVP website and booking system for IKADA, a small island guest house in Sumiyo, Amami Oshima.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The admin login is `/admin/login`.

Local admin default:

```text
ikada-admin-local
```

Set `ADMIN_PASSWORD` and `SESSION_SECRET` before any real deployment.

## MVP Includes

- English/Japanese public pages.
- Generated placeholder visual assets in `public/images`.
- Booking request form with availability checks.
- Local file data store for development.
- Supabase/PostgreSQL schema for production.
- Protected admin dashboard.
- Stripe Checkout route and webhook.
- Resend email templates with dry-run logging when no key is set.
- iCal export at `/api/calendar`.
- SEO metadata, sitemap, robots, and structured data.

## Production Data

The app uses `.data/ikada-store.json` locally. To use Supabase, run `supabase/schema.sql` in Supabase SQL editor and set:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

## Stripe

Set:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

Create a webhook endpoint:

```text
https://your-domain.com/api/stripe/webhook
```

Listen for:

```text
checkout.session.completed
checkout.session.expired
```

## Email

Set:

```text
RESEND_API_KEY
EMAIL_FROM
HOST_EMAIL
```

Without `RESEND_API_KEY`, emails are printed as dry-run logs.

## Verification

```bash
npm run typecheck
npm run build
```

More detail is in `docs/architecture.md`.
