# OptimIQ Consultus Theme 1 Screen Review

The client approved Theme 1. The client-facing review site is a simple HTML/CSS index and page previews. The React/Next.js application under [`next-app/`](next-app/README.md) is developer source for implementation after client approval; GitHub Pages does not publish that app.

## Stack direction

- Static HTML/CSS pages for client review, published from the repository root by `.github/workflows/pages.yml`.
- React with TypeScript and Next.js for the developer handoff after screen approval.
- The eventual .NET backend is not connected to these presentation-only wireframes.
- Keep every audience screen responsive. Use a persistent left sidebar on desktop and the same vertical navigation in a left-edge drawer on mobile; avoid horizontal scrolling navigation on mobile. Apply this pattern in both the static review pages and the Next.js developer screens.

## Local preview

Clients open the root `index.html` on GitHub Pages and select a screen preview. Developers can clone the repository and use the Next.js source after the client approves the screens.

## Review screens

- Shared portal sign-in
- Client workspace
- Consultant journey: terms/declarations, CTQ, role fit, profile and assessment progress, agreement gate, engagements, payments, communications/notifications, project calendar, performance/CPD, and Phase 2 project documents
- Consulting firm workspace
- Staff / Admin workspace

Theme 1 is approved. Individual screen concepts are marked **Awaiting screen feedback** until each receives separate approval. Record client feedback in the approval inventory linked from the review hub.
