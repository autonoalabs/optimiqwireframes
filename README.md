# OptimIQ Consultus Theme 1 Screen Review

The client approved Theme 1. The client-facing review site is a simple HTML/CSS index and page previews. The React/Next.js application under [`next-app/`](next-app/README.md) is developer source for implementation after client approval; GitHub Pages does not publish that app.

## Stack direction

- Static HTML/CSS pages for client review, published from the repository root by `.github/workflows/pages.yml`.
- React with TypeScript and Next.js for the developer handoff after screen approval.
- The eventual .NET backend is not connected to these presentation-only wireframes.
- Keep every audience screen responsive. Use a persistent left sidebar on desktop and the same vertical navigation in a left-edge drawer on mobile; avoid horizontal scrolling navigation on mobile. Apply this pattern in both the static review pages and the Next.js developer screens.

## Local preview

Clients open the root `index.html` on GitHub Pages and select a screen preview. Developers can clone the repository and use the Next.js source after the client approves the screens.

The static Consultant screens also provide a connected browser-only demo. Sign-in, CTQ draft answers, role selection, and page actions are simulated in the browser; they do not call a backend. The CTQ demo uses the approved 36-field, eight-category question set and hides scoring and weights.

## Delivery phases shown in the review

- **Phase 1:** registration and portal onboarding through CTQ submission and role-fit results, which completes the CTQ score stage.
- **Phase 2:** remaining composite assessments, profile updates, qualification, and the project lifecycle after CTQ.
- **Phase 3 (proposed):** future reusable knowledge resources and publishable success stories. Project folders and controlled project-file access remain shown in Phase 2, as previously requested.

Phase 3 is a planning label for client review; it is not a confirmed delivery commitment.

## Review screens

- Shared portal sign-in
- Client workspace
- Consultant journey: terms/declarations, CTQ, role fit, profile and assessment progress, agreement gate, engagements, payments, communications/notifications, project calendar, performance/CPD, and Phase 2 project documents
- Consulting firm workspace
- Staff / Admin workspace

Theme 1 is approved. Individual screen concepts are marked **Awaiting screen feedback** until each receives separate approval. Record client feedback in the approval inventory linked from the review hub.

## Shared design decisions

- **Locked approved baseline:** The current consistent Theme 1 structure is the base for all future screen changes. Layer requested changes on top of it; do not invent a new style or alter shared layout, navigation, typography, spacing, sizing, or visual language during ordinary updates. Change the base only when the user explicitly asks, and get their approval before applying a base-level change.
- Keep typography, sidebar/logo sizing, page spacing, controls, and button treatments consistent across every audience screen. The responsive left sidebar becomes a left-edge drawer on mobile.
- CTQ question priority is shown with accessible color indicators: red for Must Have / Required, green-teal for Good to Have / Recommended, and neutral gray for Optional.
- CTQ priority colors are an Admin Portal configuration with these accessible defaults. Color changes are presentational only and must not affect question priority, validation, score, or eligibility. Include a preview in the future Admin color settings.
- The Consultant CTQ form includes an explicit Save draft action. The static review demo stores answers in the browser only.
