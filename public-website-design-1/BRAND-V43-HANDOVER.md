# Public website v4.3 review build

14 November 2026. Status: awaiting client feedback.

`build_v43.py` is the authoritative generator for this revision. Run with Python 3.12+; standard library only. Shared presentation: `v43.css`, `v43.js`. Do not run the historic `build_site.py` or `build_review.py` to regenerate this revision. Existing legacy form files are preserved.

## Brand
Original light/dark PNG marks extracted without redrawing from the supplied client Brand Kit, page 3. Deep Teal #0C2E2A, Teal #2E8C77, Mint #7BD5C2, Paper #F4FBF9, Mist #DFEFEA. Wordmark follows the supplied serif treatment; website headings/body retain existing Plus Jakarta Sans/Inter because the kit supplies no website font specification. No new logo or external stock imagery. Sample business-card names, addresses and contact values are not used as organisation data.

## Scope
Seven main pages; three calculator-example pages; three thank-you design placeholders; Privacy/Terms/Cookies placeholders; review overview. All seven main pages use shared navigation, footer, typography and spacing. Static HTML remains the client review surface. Existing member portal and CTQ pages are unchanged.

## Behaviour and pending work
Hero selectors, mobile menu, outside/Escape dismissal, Get started menu, FAQs, expertise details and pending-asset dialogs work locally. Contact form validates and simulates submission; it neither transmits nor stores data. Registration links point to the existing staging CTA forms pending the final short-form/verification contract. Member login points to the existing static portal preview.

Calculator results are fixed examples from the supplied blueprint, not live calculations. The confidential v4.3 workbook, formulas and model constants are not in this build. Do not copy the standalone supplied calculator JavaScript into the public site. Production calculation must run privately after assumptions/disclosure approval. Prior legacy calculator files remain historical assets; v4.3 does not load them.

Consultant/Firm concept-note PDFs use the new palette and original marks; email gating is an explicit simulator and stores no email. The Client concept note awaits the public-disclosure decision. Missing films, captions, long guides, Arabic translations, final legal/leadership/contact/social data and production services remain open. No institute co-signing, draft CPD/appeal thresholds, new scoring model, SLA or fee is invented. The private clarification workbook is supplied separately and must not be published with internal responses.

## Verification
Seven main pages checked at 320, 390, 768, 1280 and 1440 pixel widths: no document overflow or broken images. Ten remaining screens checked at 390px. Local link/asset checks passed. Menu dismissal, hero selection, invalid/valid contact simulator and asset dialog checked. These checks establish a static review build, not production backend readiness.
