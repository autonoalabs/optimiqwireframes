# Proposed Design 1 — consolidated feedback, 31 October 2026

Client preview: https://autonoalabs.github.io/optimiqwireframes/public-website-design-1/index.html

The consolidated feedback replaces Design 1's former Manrope/forest visual direction. The visual tokens are green #0D5C3A, hover #0B4D30, mint #10B981 on slate #0F172A, white/light-grey surfaces, Plus Jakarta Sans headings and Inter body/figures. Fonts are hosted locally with OFL licences. Arabic font tokens and logical layout properties prepare for IBM Plex Sans Arabic; Arabic translation, font asset and full RTL review remain future work. Existing supplied logo mark is kept legible on its mint tile with a white wordmark on dark surfaces. No new logo artwork is invented.

The locked member portal and Proposed Design 2 are unchanged. Approval of visual specifications is not approval of the completed homepage; Design 1 remains awaiting review.

## Included

- Compact desktop hero; three audience hooks and independent direct short registration flows.
- Original numeric ranges and visitor-defined arithmetic. Confirm days and both client rates separately; confirm consultant days, rate and growth choice. Changes clear the affected confirmation. Partial scenarios cannot be attached.
- Client reduction/increase/zero handling, firm zero-project state, optional consultant earnings attachment.
- Slate result cards, explicit example/visitor figure labels, custom range tracks and numeric entry.
- Content-height-aware 360 ms expansion with reduced-motion handling. No permanent maximum-height clipping.
- Mobile calculator registration action with safe-area/content clearance; removed when registration opens. Input focus and visual viewport resize handling support keyboard clearance.
- Field-specific errors; valid personal email domains are accepted. Values remain in memory while changing panels or correcting validation. General enquiry processing acknowledgement starts unchecked.
- Video frame/poster, honest missing-asset fallback, overview and registration routes. Native player/caption hookup is prepared in site.js but intentionally has null asset paths.

## Pending client assets and production integration

1. WEB-VIDEO-01: approved explainer video, captions and final overview/transcript. Client confirmed on 31 October 2026 that the video is not yet supplied and must be recorded as a requirement. Do not substitute an unrelated video. Playback/caption synchronisation cannot be signed off yet.
2. WEB-LEGAL-01: final Privacy Notice and approved processing wording.
3. WEB-API-01: backend durable submission, authoritative input validation, server recomputation, optional scenario allowlist, idempotent retries, audience routing and verification-email integration. Only acknowledge receipt after durable storage; acknowledge routing/dispatch only after those operations succeed. Keep entered values on validation/connection/server failures; do not reset before durable success. Do not add public scoring, internal margins, risk parameters or allocation rules.
4. WEB-QA-01: physical iOS/Android keyboard and safe-area testing before launch. Desktop browser responsive checks do not substitute for a physical keyboard test.

All current forms are static design previews. They send, log and persist nothing, and do not claim successful receipt, routing or email dispatch. No analytics, cookies, local/session storage, tracking IDs or commercial URL parameters are used. Commercial inputs are outside the short forms. preview-core.js builds an allowlisted application; consultant earnings are excluded unless a fully confirmed scenario is explicitly selected. No downstream commercial linkage exists in this preview. Preserve this separation when the production backend and analytics are built.

## Assets and developer handoff

Fonts: https://github.com/google/fonts/tree/main/ofl/plusjakartasans and https://github.com/google/fonts/tree/main/ofl/inter (licences in assets/).
Shared logo and illustrative photograph: ../public-website/assets/. Photo by Christina Morillo: https://www.pexels.com/photo/group-of-people-on-conference-room-1181396/ . The image is not presented as OptimIQ employees or clients.

Plain semantic HTML, layered CSS tokens and small isolated JavaScript modules preserve the GitHub Pages review workflow and can be mapped to React/Next components later. The short public enquiry is followed by detailed discovery/onboarding: consultant CVs/evidence in Stage 2, client scope/RFPs collected by BD. Neither is requested on the homepage.

Run public arithmetic/payload/contrast checks with `node core.test.cjs`. See REVIEW-TESTS.md for browser results and untestable integration requirements.
