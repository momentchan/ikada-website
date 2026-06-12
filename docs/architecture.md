# IKADA Architecture

## Recommended Architecture

IKADA is a Next.js app with the App Router, TypeScript, Tailwind CSS, a server-side data layer, Stripe Checkout, Resend email hooks, and an admin dashboard. The MVP runs locally with `.data/ikada-store.json`; production should use Supabase/PostgreSQL by setting `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

## Page Structure

- `/en`, `/ja`: home with story, CTAs, SEO, and LodgingBusiness structured data.
- `/story`: raft story and project origin.
- `/stay`: house details, facilities, fit/not-fit sections.
- `/access`: rental car notes, map embed, downloadable access guide.
- `/guide`: editable local guide spots.
- `/guest-guide`: public guest information; sensitive entry details stay out of public pages.
- `/booking`: booking request form.
- `/booking/pay/[id]`: Stripe Checkout start page.
- `/admin/*`: protected booking, block, guide, and settings management.
- `/house-rules`, `/cancellation`, `/privacy`, `/terms`, `/legal`, `/contact`, `/emergency`: practical/legal pages.

## Database Schema

See `supabase/schema.sql`. It includes:

- `bookings`
- `blocked_dates`
- `payments`
- `guests`
- `listings`
- `guide_spots`
- `house_info`
- `faq_items`
- `admin_users`
- `settings`

The Postgres schema uses date-range exclusion constraints and triggers to reduce double-booking risk across bookings and manual blocks.

## Booking And Payment Flow

1. Guest submits `/booking` with dates, guest count, contact details, message, and rule agreement.
2. Server validates dates, max guests, minimum nights, and overlap with active bookings/blocks.
3. Booking is saved as `pending` and emails are sent to guest and host.
4. Admin reviews the request in `/admin/bookings`.
5. Admin sends payment request, changing status to `awaiting_payment`.
6. Guest opens `/booking/pay/[id]` and starts Stripe Checkout.
7. Stripe webhook marks booking `confirmed` and payment `paid`.
8. iCal export at `/api/calendar` includes pending, awaiting payment, confirmed, and blocked ranges.

## Admin Dashboard Plan

Current MVP:

- Login with `ADMIN_PASSWORD`.
- View bookings and guest messages.
- Send payment request email.
- Manually confirm, cancel, or mark refunded.
- Block/unblock dates.
- Edit prices, fees, max guests, minimum nights, iCal import URL, booking policy, cancellation policy.
- Add/edit/delete guide spots.

Next admin improvements:

- Supabase Auth or passwordless login.
- Photo uploads via Supabase Storage.
- Rich content editing for house info, FAQ, guest guide, and story.
- Airbnb iCal import worker and conflict report.
- Audit log for booking/payment changes.

## UI Component Plan

- `SiteHeader`, `SiteFooter`, `LanguageSwitcher`, `LocaleLink`.
- `SectionHeading`, `ImagePanel`, `ButtonLink`.
- `BookingForm`, `PaymentButton`.
- Admin: `AdminNav`, `StatusBadge`, server-action forms.

## Folder Structure

- `src/app`: routes, pages, route handlers.
- `src/components`: public and admin UI components.
- `src/lib`: data, auth, pricing, email, Stripe, SEO, calendar, validation, i18n.
- `public/images`: generated placeholder assets.
- `supabase/schema.sql`: production database schema.
- `docs`: architecture and operational notes.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `SESSION_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `HOST_EMAIL`

## Deployment On Vercel

1. Create a Supabase project and run `supabase/schema.sql`.
2. Add all production environment variables in Vercel.
3. Set Stripe to test mode first and create a webhook endpoint pointing to `/api/stripe/webhook`.
4. Set Resend domain/from address and `HOST_EMAIL`.
5. Deploy from GitHub through Vercel.
6. Submit `/sitemap.xml` in Google Search Console after the domain is live.

## Testing Checklist

- Home, story, stay, access, guide, booking, and legal pages render in English and Japanese.
- Language switcher preserves the current path.
- Booking form rejects invalid date ranges, too many guests, and unavailable ranges.
- Pending booking appears in admin.
- Payment request email dry-runs locally without `RESEND_API_KEY`.
- Stripe checkout returns a clear setup message when keys are missing.
- Stripe test payment confirms booking through webhook when keys are configured.
- Manual blocks prevent overlapping bookings.
- `/api/calendar` exports active bookings and blocks.
- Admin settings update pricing shown on booking form.
- Mobile viewport has no overlapping text or broken navigation.
