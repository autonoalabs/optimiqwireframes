# OptimIQ public website connected preview

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
- public-core.js isolates visitor arithmetic, range validation, raw-input scenario allowlists and truthful next-step copy.
- submission-service.js separates preview from a real configured transport and preserves an in-memory logical request ID for retries. No endpoint is configured and no data is sent. Mock service tests cover response handling and duplicate prevention.
- Approved supporting guides have an independent component, two-field request and download confirmation. It is omitted until a guide is approved and its asset configured. Guide requests never reuse personal data automatically or include commercial scenarios.
- build_review.py generates the internal client review inventory from requirements.json. Dependency notes are on review.html and in this handover, separate from visitor copy.

Run `python build_site.py`, `python build_review.py`, `node --check site.js`, `node core.test.cjs`, and the HTML audit when editing. React/Next developers can map these shared components to layout, route, form, calculator and service modules. The client continues to review the static site on GitHub Pages.

## Form and calculator rules

All audiences have three required contact fields. Firm contact name and leadership role are one field; practice is optional. Empty selectors and role cards have no chosen application role. The approved portal label Consultant is retained pending clarification of Strategy Consultant in the designer draft. Practice labels are the designer's proposed nine-area list, pending authoritative label/ID confirmation.

Each numeric edit confirms only that input. Per-input confirmations remain independent. A complete valid scenario can be prepared by the explicit confirmation action. Client/firm confirmation attaches a removable snapshot locally and opens the short form; it never submits. Consultant confirmation enables a separate unchecked attachment option. Editing invalidates the snapshot and clears consultant opt-in, preserving contacts. A chosen professional role is independent of earnings and can remain when attachment is off.

The public payload includes only allowed contact/context fields, an explicit attachment flag, and complete raw numeric inputs when deliberately attached. Derived totals are computed for preview and must be recomputed by the server. No backend result, scoring weight, threshold, private margin or allocation algorithm is included. No analytics, session replay, local/session storage or commercial URL transport is used. Cross-page navigation resets unsubmitted state. The same-page session preserves it. Declined commercial data stays only in anonymous calculator memory and is purged on exit or a real accepted unattached application.

## Integration and release requirements

The review forms say no information was sent. They do not simulate actual receipt or queued email. When endpoints are supplied, backend validation, authoritative recomputation, durable persistence, safe request identifiers, CORS/authentication, rate limits and abuse handling, CRM mappings and operational queues must be implemented and verified. Only a response with accepted status, durable receipt and an opaque reference can show receipt. Routing/email failure must not discard a received lead. A queued verification response permits the check-email instruction; failure uses truthful wording. Actual resend and portal token handling await approved services.

requirements.json and review.html distinguish missing four films, English/Arabic captions, final posters/transcripts, three approved PDFs, Privacy Notice, practice master, role wording, under-five-years eligibility, portal/account provisioning, contact channels, production domain/redirects, analytics governance and remaining integration/device QA. No people or due dates have been invented. Detailed public short enquiries do not automatically approve firms, clients or consultant standing. Existing portal workflows and BRD decisions are not silently rewritten by the marketing specification.

Preview metadata is noindex/nofollow. Production canonicals and social metadata require the final approved domain and artwork. Unverified corporate emails, telephone numbers, offices, portal links and unavailable guide cards are hidden. Production film/caption playback is blocked by missing assets rather than falsely reported complete. Film overviews are draft public explanations, not claimed final transcripts. All four films remain required launch components.

## Assets

The supplied logo mark is kept on its existing mint tile with a legible wordmark on slate. It is not recreated or recoloured. Fonts are locally hosted with their OFL licences. The illustrative photograph in review film posters is shared from ../public-website/assets/collaboration.jpg, by Christina Morillo: https://www.pexels.com/photo/group-of-people-on-conference-room-1181396/ . It is not presented as actual OptimIQ staff or a final approved video poster.

Source documents remain unmodified and are not uploaded to the public repository. Proposed Design 2 and the locked member portal remain outside this change.
