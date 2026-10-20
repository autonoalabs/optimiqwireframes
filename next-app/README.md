# OptimIQ Theme 1 Wireframes (Next.js)

This folder contains developer source for the application screens in React/Next.js. It is for developers to clone and build on after client approval. The client reviews the separate HTML/CSS pages at the repository root; GitHub Pages does not publish this folder.

## Local preview

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. The developer preview links to the shared sign-in and role workspace concepts.

## GitHub Pages

GitHub Pages publishes only the HTML/CSS review site from the repository root. This Next.js source is not part of the client-facing Pages artifact.

The static review screens do not call the .NET backend. They are presentation-only concepts; live identity, role permissions, configuration approvals, and business data are outside this wireframe build.

## Routes

- `/` — Theme 1 review hub and per-screen statuses
- `/login/` — Shared portal sign-in concept. Account registration, email verification, and password setup happen in the existing public CTA forms before this route.
- `/client/` — Client workspace concept
- `/consultant/` — Consultant lifecycle and concurrent assignments
- `/consulting-firm/` — Seller, Buyer, and Win-and-Staff concepts
- `/admin/` — Staff/admin configuration and approval concept
