# Africa Jungle Safaris

Marketing + booking website for **Africa Jungle Safaris**, built with Next.js
(App Router), TypeScript and Tailwind CSS v4. Light **white + gold** theme. Guests
can book three ways: **Bókun** online checkout, **WhatsApp**, or an **email**
enquiry form — each with its own message template.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- PrimeIcons (PrimeNG's icon set) for all UI icons — via `src/components/Pi.tsx`
- Bókun booking widgets (loader + embeds)
- Resend for transactional email (lead + guest auto-reply)
- react-hook-form + zod for the booking form
- Deployed on Vercel

## Branding

- Logo: `public/images/logo.png` (the "Africa Jungle Safaris / Explore the Wild"
  badge), rendered via `src/components/Logo.tsx` with a text-wordmark fallback if
  the file is missing.
- Icons: PrimeIcons font (`primeicons`), imported once in `src/app/layout.tsx`.
  Use `<Pi name="pi-..." />` everywhere; the activity/pillar icon names in
  `src/content/*` map to PrimeIcons in `src/components/Icon.tsx`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Build / lint:

```bash
npm run build
npm run lint
```

## Environment variables

See [.env.example](.env.example). Summary:

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_BOKUN_CHANNEL_UUID` | Bókun booking channel UUID (enables the widgets) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business number, E.164 digits only |
| `RESEND_API_KEY` | Resend API key (email flow) |
| `EMAIL_FROM` | Verified Resend sender, e.g. `ATSZ Safaris <bookings@atszsafaris.com>` |
| `BOOKING_INBOX` | Inbox that receives booking leads |

The site is fully functional without these: Bókun widgets show a friendly
placeholder, and the email API returns a "use WhatsApp for now" message until
Resend is configured.

## The three booking flows

1. **Bókun (online checkout)** — `src/components/BokunWidget.tsx`. The loader
   script is added once in `src/app/layout.tsx`. Tour pages embed an
   `experience-calendar`; tour/destination indexes can embed an `experience-list`.
   Map each tour's `slug → bokunExperienceId` in `src/content/tours.ts`.
2. **WhatsApp** — `src/components/WhatsAppButton.tsx` + `src/lib/templates.ts`.
   Opens `wa.me` with a pre-filled, tour-specific message. A floating WhatsApp
   button appears site-wide.
3. **Email** — `src/components/BookingForm.tsx` → `POST /api/booking`
   (`src/app/api/booking/route.ts`) → Resend. Sends a staff **lead** email and a
   branded guest **auto-reply** (templates in `src/emails/templates.ts`).

## Content

Marketing copy lives in `src/content/` (destinations, activities, tours, blog,
guides, testimonials, gallery). **Bókun is the source of truth for prices and
availability** — only each tour's Bókun id is kept here. Brand/contact details
are in `src/lib/siteConfig.ts`.

## Before launch — replace placeholders

- Real Bókun channel UUID + per-tour experience IDs
- WhatsApp number, phone, email, address in `src/lib/siteConfig.ts`
- Verified Resend domain + inbox
- Photography in `public/images/` (see `public/images/README.md`)
- Final tour/destination/blog copy, guide bios, testimonials
