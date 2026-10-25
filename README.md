# OptimIQ Consultus Theme 1 Screen Review

The client approved Theme 1. The client-facing review site is a simple HTML/CSS index and page previews. The React/Next.js application under [`next-app/`](next-app/README.md) is developer source for implementation after client approval; GitHub Pages does not publish that app.

## Stack direction

- Static HTML/CSS pages for client review, published from the repository root by `.github/workflows/pages.yml`.
- React with TypeScript and Next.js for the developer handoff after screen approval.
- The eventual .NET backend is not connected to these presentation-only wireframes.
- Keep every audience screen responsive. Use a persistent left sidebar on desktop and the same vertical navigation in a left-edge drawer on mobile; avoid horizontal scrolling navigation on mobile. Apply this pattern in both the static review pages and the Next.js developer screens.

## Local preview

Clients open the root `index.html` on GitHub Pages and select a screen preview. Developers can clone the repository and use the Next.js source after the client approves the screens.

The static Consultant, Consulting Firm, and Client screens provide connected browser-only demos. Sign-in routes by audience, CTQ answers are kept in the browser, and page actions are simulated; they do not call a backend. Consultant and firm scoring details remain hidden. Client categorisation is automatic and internal; client scores and CL1–CL4 routing labels are never shown to client users.

## Delivery phases shown in the review

The client-facing [enterprise phase plan](OptimIQ_Enterprise_Phase_Plan.html) shows the approved release boundary, a proposed Phase 2 delivery sequence, linked screen placeholders, and the decisions needed before detailed design. Its Phase 2A–2D groups are planning increments, not approved dates or separate applications. The source mind map's numbered phases are business process stages and do not replace the approved release boundary.

- **Phase 1:** the shared member sign-in and Consultant, Consulting Firm, and Client journeys through CTQ. Consultant role-fit selection follows CTQ in Phase 1. The existing CTA forms precede portal sign-in.
- **Phase 2:** dashboards, remaining assessments, profile updates, qualification, and all project and support journeys. Their screen concepts remain available in the review site for later refinement.

The client confirms that the optional three-question Client enrichment page is the Client CTQ. The source workbook places that page immediately after the public CTA without login. The review app places it after sign-in and terms to match the common portal journey; this placement awaits client confirmation. No client score or segment appears on member pages.

## Review screens

- Shared portal sign-in
- Client workspace
- Consultant journey: terms/declarations, CTQ, role fit, profile and assessment progress, agreement gate, engagements, payments, communications/notifications, project calendar, performance/CPD, and Phase 2 project documents
- Consulting firm workspace
- Staff / Admin workspace
- Client journey: existing CTA, shared sign-in, terms, optional Client CTQ, Phase 2 dashboard, and requirements through post-delivery support

Theme 1 is approved. Individual screen concepts are marked **Awaiting screen feedback** until each receives separate approval. Record client feedback in the approval inventory linked from the review hub.

## Shared design decisions

- **Locked approved baseline:** The current consistent Theme 1 structure is the base for all future screen changes. Layer requested changes on top of it; do not invent a new style or alter shared layout, navigation, typography, spacing, sizing, or visual language during ordinary updates. Change the base only when the user explicitly asks, and get their approval before applying a base-level change.
- **Locked navigation and account behavior:** On mobile, tapping outside the open left navigation drawer closes it. Tapping outside the profile/account popup closes it on desktop and mobile. On mobile, the profile/account popup stays anchored to the viewport bottom, and long names/headings wrap within it instead of shifting its controls.
- Keep typography, sidebar/logo sizing, page spacing, controls, and button treatments consistent across every audience screen. The responsive left sidebar becomes a left-edge drawer on mobile.
- CTQ question priority is shown with accessible color indicators: red for Must Have / Required, green-teal for Good to Have / Recommended, and neutral gray for Optional.
- CTQ priority colors are an Admin Portal configuration with these accessible defaults. Color changes are presentational only and must not affect question priority, validation, score, or eligibility. Include a preview in the future Admin color settings.
- The Consultant CTQ form includes an explicit Save draft action. The static review demo stores answers in the browser only.
