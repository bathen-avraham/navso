# Private Tutoring Booking Site

A bilingual (Hebrew / English) portfolio site for booking private lessons in
**Hebrew language** and **math**. The main focus is Hebrew language tutoring;
math is offered as a secondary option.

This is a frontend-only MVP — no backend, no real payment, no real email or
calendar integration. All bookings and the language preference are stored in
the browser's `localStorage`.

## Features

- Bilingual UI with a language switcher in the navbar
  - Default language: **Hebrew** (RTL)
  - English (LTR)
  - Selected language is saved in `localStorage` and applied before React
    mounts to avoid an RTL/LTR flash on reload
- Pages
  - `/` — Home (hero, topics, lesson packages, testimonials, contact)
  - `/subjects` — Hebrew language and math topics with details
  - `/booking` — Multi-step booking form with validation
  - `/booking/confirmation` — Confirmation card with all booking details
  - `/admin` — Demo dashboard for the tutor (no login)
  - `/about` — About the tutor
  - `/faq` — Frequently asked questions
- Booking flow
  - Choose subject → topic → lesson type → duration → student level →
    date and time → student details
  - Friendly validation messages in the selected language
  - On submit, the booking is saved to `localStorage` and the user is
    redirected to the confirmation page
- Admin dashboard (`/admin`)
  - Summary cards (total / Hebrew / math / this week)
  - Filter by subject and by status
  - Update booking status (`new` / `confirmed` / `cancelled`)
  - Delete bookings
  - Friendly empty states for "no bookings yet" and "no matching bookings"
- Responsive layout (mobile, tablet, desktop)
- Tailwind CSS with logical CSS properties (`ms-`, `me-`, `start-`, `end-`,
  `text-start`, `text-end`) so the layout looks natural in both RTL and LTR

## Tech stack

- React 18 + TypeScript (strict mode)
- Vite 4
- React Router v6
- Tailwind CSS v3
- `localStorage` for persistence (no backend)

## Project structure

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── components/
    │   ├── BookingForm.tsx
    │   ├── BookingTable.tsx
    │   ├── ConfirmationCard.tsx
    │   ├── ContactSection.tsx
    │   ├── DashboardStats.tsx
    │   ├── EmptyState.tsx
    │   ├── FAQItem.tsx
    │   ├── Footer.tsx
    │   ├── HeroSection.tsx
    │   ├── LanguageSwitcher.tsx
    │   ├── Layout.tsx
    │   ├── LessonPackageCard.tsx
    │   ├── Navbar.tsx
    │   ├── SubjectCard.tsx
    │   ├── Testimonials.tsx
    │   └── TimeSlotPicker.tsx
    ├── contexts/
    │   └── LanguageContext.tsx
    ├── data/
    │   ├── mockData.ts
    │   └── translations.ts
    ├── pages/
    │   ├── AboutPage.tsx
    │   ├── AdminPage.tsx
    │   ├── BookingConfirmationPage.tsx
    │   ├── BookingPage.tsx
    │   ├── FAQPage.tsx
    │   ├── HomePage.tsx
    │   └── SubjectsPage.tsx
    ├── types/
    │   └── index.ts
    └── utils/
        ├── storage.ts
        └── validation.ts
```

## Getting started

### Prerequisites

- Node.js 18 or newer is recommended (Vite 4 officially supports Node
  `^14.18.0 || >=16.0.0`; older Node versions may print engine warnings during
  `npm install` but the build still works).
- npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
```

Output goes to `dist/`.

### Preview the production build

```bash
npm run preview
```

### Type-check only (no build)

```bash
npm run lint
```

## How the data flows

### Language

- `LanguageProvider` ([src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx))
  is the single source of truth.
- It reads the saved language from `localStorage` (`navso.language.v1`) on
  mount, sets `document.documentElement.dir` and `lang`, and exposes
  `language`, `dir`, `setLanguage`, `toggleLanguage`, and `t(key)` via the
  `useLanguage()` hook.
- All UI text comes from [src/data/translations.ts](src/data/translations.ts).
  Missing keys fall back to the English string and finally to the key itself.
- A small inline script in [index.html](index.html) sets `dir` and `lang` from
  `localStorage` before React mounts, which avoids a one-frame RTL/LTR flash on
  reload when the user has English selected.

### Bookings

- Helpers live in [src/utils/storage.ts](src/utils/storage.ts):
  - `getBookings()` — read all (sorted newest first)
  - `getBookingById(id)` — read one
  - `saveBooking(payload)` — generate id + timestamp, set status to `new`,
    push to `localStorage`, and return the saved booking
  - `updateBookingStatus(id, status)`
  - `deleteBooking(id)`
- Storage key: `navso.bookings.v1`.
- The booking form in [src/components/BookingForm.tsx](src/components/BookingForm.tsx)
  validates required fields, saves the booking, and redirects to
  `/booking/confirmation?id=<id>`.

## Topics

### Hebrew language (main focus)

- מערכת הצורות / Hebrew morphology — word formation
- שם המספר / Hebrew numbers and number agreement
- הבנת הנקרא / Reading comprehension
- כתיבה ממזגת / Integrated writing
- הכנה לבגרות בלשון / Hebrew Bagrut preparation

> **Bagrut** = the Israeli matriculation exam.

### Math

- אלגברה בסיסית / Basic algebra
- פונקציות / Functions
- גיאומטריה / Geometry
- הסתברות / Probability
- הכנה למבחנים / Exam preparation

## Limitations of this MVP

- No backend, no database — bookings only exist in the browser they were
  created in. Clearing site data wipes them.
- The admin dashboard at `/admin` is intentionally unprotected and visibly
  marked as a demo for portfolio purposes.
- Time slots are fixed mock examples — there is no real availability check.
- Phone, email, and WhatsApp values in the contact section are placeholders.
- No email sending, no SMS, no calendar API, no payment.
