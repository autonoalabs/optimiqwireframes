# Feedback 1 implementation record


## Feedback 1 — client calculator reference, 1 November 2026

User decision: “use whatever client has provided and try to hide formulas if possible”. The linked client prototype supersedes the earlier visitor-defined arithmetic for the three public calculators and their related marketing copy. Approved theme, portal/CTQ flows, short-form requirements, explicit optional attachments and privacy controls remain unchanged.

- Client: planned budget, provider and project type; rounded retained-value range, overhead and delivery-risk breakdown.
- Expert: role, years, prior billed days and day rate; rounded additional earnings, additional days and an illustrative starting level. A calculator default is only an example, never a selected application role or certified standing.
- Firm: practitioners, lost/declined mandates, reason and typical value; rounded potential annual recovery, bid opportunities and the source's zero-fixed-payroll claim. With no lost mandates, show potential new bid opportunities instead of recovered revenue.

Source: https://claude.ai/artifact/E61LmBv78Qr3ojQNSRuDfh . Exact public prototype coefficients, choices, defaults, branch handling and rounding are isolated in benchmark-preview.js and tested against its examples. The source labels its benchmarks as placeholders for review. They are not approved private CTQ scores, production fees or guaranteed outcomes.

Formulas are absent from the visible visitor interface. A functional static GitHub Pages preview cannot keep its JavaScript or public repository private. benchmark-preview.js deliberately contains only the client-supplied public placeholder model. Do not place production benchmarks or private scoring there. For the React/Next + .NET handover, replace that module with a validated server calculator service; send allowlisted answers and return only rounded ranges, verdicts and permitted labels. Keep coefficients/configuration and authoritative calculations in the backend. No unconfigured network request has been added to the preview.

The contact payload includes raw scenario numbers AND allowlisted choice IDs only when deliberately attached, never browser-computed results. Existing attachment flag names are retained for integration compatibility; schema version is public-website-feedback-01. Backend consumers must use that version and the new per-audience input schema rather than assuming the prior calculator fields.

The calculator accepts 3–4 years as the reference does; application eligibility for these candidates remains the existing WEB-ELIGIBILITY-01 clarification. The initial application bands and approved portal are unchanged. Concept-note downloads remain hidden pending approved assets; no fake download or email-success state is introduced. Video and production integration requirements remain open. Feedback 1 changes await client review; base Design 1 and portal-through-CTQ approvals remain recorded.
