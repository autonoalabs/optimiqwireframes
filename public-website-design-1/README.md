# Feedback 3 — certification assurance, 1 November 2026

Why OptimIQ now summarises OptimIQ Certified in three concise assurance principles, using the existing approved component. See feedback-03.md for source interpretation, precise copy and claim boundaries. No registration, calculator or portal workflow is changed. Earlier missing source option lists remain explicit clarification items.

# Current website handover — Feedback 2, 1 November 2026

Feedback 2 supersedes the former short three-required-field registration proposal: all audience CTA forms now use the existing live fields, including the three consultant role variants. Mobile displays the same four desktop navigation links. See feedback-02.md and legacy-form-reference.json for exact fields, source gaps, role behavior, file transport and backend mapping. Concept-note email-only download simulator and calculator models remain available.

The notes below include earlier decisions as history; their short-form field counts and optional registration role descriptions are superseded by Feedback 2. The public source registration fields are now authoritative for the review. Required source option lists that are absent remain explicit clarification items.

---

# OptimIQ public website connected preview

Client decision recorded 1 November 2026: Design 1 approved with feedback and changes pending. The user will provide changes one by one. This records design approval, not implementation of unspecified changes or production release. Member portal screens through CTQ are also approved. See approval-status.json for the precise scope.

Based on Homepage Wireframe Documentation v1.2 and Comprehensive Design and Developer Handover v1.0, received 31 October 2026. Local repository: C:/Users/majid/Downloads/OptimIQ_Wireframes. Static client review entry remains the repository's index.html; public website overview is public-website-design-1/review.html. No portal theme change is included.

## Routes

| Production route concept | Static review route | Form | Optional tool |
|---|---|---|---|
| / | public-website-design-1/index.html | #enquire, #apply, #partner | #client-calculator, #expert-calculator, #firm-calculator |
| /for-clients | public-website-design-1/for-clients/ | #enquire | #fee-comparison |
| /for-consultants | public-website-design-1/for-consultants/ | #apply | #earnings |
| /for-consulting-firms | public-website-design-1/for-consulting-firms/ | #partner | #missed-opportunities |

GitHub Pages uses directory index routes under the existing review subfolder. Corresponding local legacy GET preview routes use a navigation handoff; these are not real HTTP 301 redirects and do not change staging. Actual permanent redirects require production hosting configuration after acceptance. Do not redirect existing POST endpoints.

## Shared components and build

- site-config.json is the single master for audience routes, form fields, ranges, roles, practice options and unconfigured asset/integration destinations.
- build_site.py creates semantic static HTML for all four pages, including forms and ordinary navigation links. It generates site-config.js from the same master. Run after changing definitions/copy; it preserves CSS and behaviour modules.
- site.css retains the approved green/slate system, Plus Jakarta Sans headings, Inter body/data, responsive controls, and prepared Arabic font tokens.
- site.js supplies progressive enhancement: homepage drawers, form hashes, calculator state, neutral optional role cards, attachment summaries/removal, validation, FAQ buttons, video fallback and mobile actions.
- public-core.js isolates public model access, range validation, raw-input scenario allowlists and truthful next-step copy.
- submission-service.js separates preview from a real configured transport and preserves an in-memory logical request ID for retries. No endpoint is configured and no data is sent. Mock service tests cover response handling and duplicate prevention.
- The three branded concept notes use a shared email-only dialog and PDF download simulator. No email is saved. Future backend persistence is documented in concept-notes.md; no commercial calculator data is included.
- build_review.py generates the internal client review inventory from requirements.json. Dependency notes are on review.html and in this handover, separate from visitor copy.

Run `python build_site.py`, `python build_review.py`, `node --check site.js`, `node core.test.cjs`, and the HTML audit when editing. React/Next developers can map these shared components to layout, route, form, calculator and service modules. The client continues to review the static site on GitHub Pages.

## Form and calculator rules

All audiences have three required contact fields. Firm contact name and leadership role are one field; practice is optional. Empty selectors and role cards have no chosen application role. The approved portal label Consultant is retained pending clarification of Strategy Consultant in the designer draft. Practice labels are the designer's proposed nine-area list, pending authoritative label/ID confirmation.

Each numeric edit confirms only that input. Per-input confirmations remain independent. A complete valid scenario can be prepared by the explicit confirmation action. Client/firm confirmation attaches a removable snapshot locally and opens the short form; it never submits. Consultant confirmation enables a separate unchecked attachment option. Editing invalidates the snapshot and clears consultant opt-in, preserving contacts. A chosen professional role is independent of earnings and can remain when attachment is off.

The public payload includes only allowed contact/context fields, an explicit attachment flag, and complete raw inputs and allowlisted choice IDs when deliberately attached. Derived totals are computed for preview and must be recomputed by the server. No backend result, scoring weight, threshold, private margin or allocation algorithm is included. No analytics, session replay, local/session storage or commercial URL transport is used. Cross-page navigation resets unsubmitted state. The same-page session preserves it. Declined commercial data stays only in anonymous calculator memory and is purged on exit or a real accepted unattached application.

## Integration and release requirements

The review forms say no information was sent. They do not simulate actual receipt or queued email. When endpoints are supplied, backend validation, authoritative recomputation, durable persistence, safe request identifiers, CORS/authentication, rate limits and abuse handling, CRM mappings and operational queues must be implemented and verified. Only a response with accepted status, durable receipt and an opaque reference can show receipt. Routing/email failure must not discard a received lead. A queued verification response permits the check-email instruction; failure uses truthful wording. Actual resend and portal token handling await approved services.

requirements.json and review.html distinguish missing four films, English/Arabic captions, final posters/transcripts, final production lead service, Privacy Notice, practice master, role wording, under-five-years eligibility, portal/account provisioning, contact channels, production domain/redirects, analytics governance and remaining integration/device QA. No people or due dates have been invented. Detailed public short enquiries do not automatically approve firms, clients or consultant standing. Existing portal workflows and BRD decisions are not silently rewritten by the marketing specification.

Preview metadata is noindex/nofollow. Production canonicals and social metadata require the final approved domain and artwork. Unverified corporate emails, telephone numbers, offices, portal links and unavailable guide cards are hidden. Production film/caption playback is blocked by missing assets rather than falsely reported complete. Film overviews are draft public explanations, not claimed final transcripts. All four films remain required launch components.

## Assets

The supplied logo mark is kept on its existing mint tile with a legible wordmark on slate. It is not recreated or recoloured. Fonts are locally hosted with their OFL licences. The illustrative photograph in review film posters is shared from ../public-website/assets/collaboration.jpg, by Christina Morillo: https://www.pexels.com/photo/group-of-people-on-conference-room-1181396/ . It is not presented as actual OptimIQ staff or a final approved video poster.

Source documents remain unmodified and are not uploaded to the public repository. Proposed Design 2 and the locked member portal remain outside this change.


## Feedback 1 — client calculator reference, 1 November 2026

User decision: “use whatever client has provided and try to hide formulas if possible”. The linked client prototype supersedes the earlier visitor-defined arithmetic for the three public calculators and their related marketing copy. Approved theme, portal/CTQ flows, short-form requirements, explicit optional attachments and privacy controls remain unchanged.

- Client: planned budget, provider and project type; rounded retained-value range, overhead and delivery-risk breakdown.
- Expert: role, years, prior billed days and day rate; rounded additional earnings, additional days and an illustrative starting level. A calculator default is only an example, never a selected application role or certified standing.
- Firm: practitioners, lost/declined mandates, reason and typical value; rounded potential annual recovery, bid opportunities and the source's zero-fixed-payroll claim. With no lost mandates, show potential new bid opportunities instead of recovered revenue.

Source: https://claude.ai/artifact/E61LmBv78Qr3ojQNSRuDfh . Exact public prototype coefficients, choices, defaults, branch handling and rounding are isolated in benchmark-preview.js and tested against its examples. The source labels its benchmarks as placeholders for review. They are not approved private CTQ scores, production fees or guaranteed outcomes.

Formulas are absent from the visible visitor interface. A functional static GitHub Pages preview cannot keep its JavaScript or public repository private. benchmark-preview.js deliberately contains only the client-supplied public placeholder model. Do not place production benchmarks or private scoring there. For the React/Next + .NET handover, replace that module with a validated server calculator service; send allowlisted answers and return only rounded ranges, verdicts and permitted labels. Keep coefficients/configuration and authoritative calculations in the backend. No unconfigured network request has been added to the preview.

The contact payload includes raw scenario numbers AND allowlisted choice IDs only when deliberately attached, never browser-computed results. Existing attachment flag names are retained for integration compatibility; schema version is public-website-feedback-01. Backend consumers must use that version and the new per-audience input schema rather than assuming the prior calculator fields.

The calculator accepts 3–4 years as the reference does; application eligibility for these candidates remains the existing WEB-ELIGIBILITY-01 clarification. The initial application bands and approved portal are unchanged. The missing concept-note assets noted in Feedback 1 have since been supplied; see the current concept-note simulator section below. Video and production integration requirements remain open. Feedback 1 changes await client review; base Design 1 and portal-through-CTQ approvals remain recorded.


## Concept-note update — 1 November 2026

Three PDFs have been supplied and rebranded. Get the concept note opens an email-only simulator and downloads the matching PDF. User explicitly deferred lead storage to the backend developer. Read concept-notes.md for the precise decision, source-content reconciliation, PDF regeneration and future service contract. The old missing-guide gate is superseded for these three assets.


## Complete Why OptimIQ summary — 1 November 2026

The homepage now covers all three audiences across six concise benefits using the existing responsive component. See [source mapping and limitations](why-overview.md). This supersedes the certification-only homepage copy in feedback-03.md; certification remains the first trust pillar. Business rules, source forms, calculators, portal and approved base theme are unchanged.
