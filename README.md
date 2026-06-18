# Indlulamithi Safaris & Tours

Marketing + booking website for **Indlulamithi Safaris & Tours**, built with Next.js
(App Router), TypeScript and Tailwind CSS v4. Light **white + gold** theme. Guests
can book three ways: **Bókun** online checkout, **WhatsApp**, or an **email**
enquiry form — each with its own message template.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- PrimeIcons (PrimeNG's icon set) for all UI icons — via `src/components/Pi.tsx`
- Bókun booking widgets (loader + embeds)
- Nodemailer + SMTP for transactional email (lead + guest auto-reply, PDF attachment)
- react-hook-form + zod for the booking form
- Deployed on Vercel

## Branding

- Logo: `public/images/logo.png` (the "Indlulamithi Safaris & Tours / Explore the Wild"
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
| `SMTP_HOST` | SMTP server hostname (email flow) |
| `SMTP_PORT` | SMTP port (default `587`; use `465` with `SMTP_SECURE=true`) |
| `SMTP_SECURE` | `true` for implicit TLS (port 465); `false` for STARTTLS (port 587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | Sender address, e.g. `bookings@indlulamithisafaris.com` or `"Name" <bookings@…>` |
| `BOOKING_INBOX` | Inbox that receives booking leads |

The site is fully functional without these: Bókun widgets show a friendly
placeholder, and the email API returns a "use WhatsApp for now" message until
SMTP is configured.

## The three booking flows

1. **Bókun (online checkout)** — `src/components/BokunWidget.tsx`. The loader
   script is added once in `src/app/layout.tsx`. Tour pages embed an
   `experience-calendar`; tour/destination indexes can embed an `experience-list`.
   Map each tour's `slug → bokunExperienceId` in `src/content/tours.ts`.
2. **WhatsApp** — `src/components/WhatsAppButton.tsx` + `src/lib/templates.ts`.
   Opens `wa.me` with a pre-filled, tour-specific message. A floating WhatsApp
   button appears site-wide.
3. **Email** — `src/components/BookingForm.tsx` → `POST /api/booking`
   (`src/app/api/booking/route.ts`) → SMTP via Nodemailer. Sends a staff **lead**
   email and a branded guest **auto-reply** with an optional PDF summary
   (`src/emails/templates.ts`, `src/emails/booking-pdf.ts`).

## Content

Marketing copy lives in `src/content/` (destinations, activities, tours, blog,
guides, testimonials, gallery). **Bókun is the source of truth for prices and
availability** — only each tour's Bókun id is kept here. Brand/contact details
are in `src/lib/siteConfig.ts`.

## Before launch — replace placeholders

- Real Bókun channel UUID + per-tour experience IDs
- WhatsApp number, phone, email, address in `src/lib/siteConfig.ts`
- SMTP credentials + verified sender domain + booking inbox
- Photography in `public/images/` (see `public/images/README.md`)
- Final tour/destination/blog copy, guide bios, testimonials
