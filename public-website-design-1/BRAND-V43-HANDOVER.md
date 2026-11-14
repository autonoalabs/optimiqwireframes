# Public website v4.3 review build

14 November 2026. Status: awaiting client feedback.

`build_v43.py` is the authoritative generator for this revision. Run with Python 3.12+; standard library only. Shared presentation: `v43.css`, `v43.js`. Do not run the historic `build_site.py` or `build_review.py` to regenerate this revision. Public short-form preview pages use one shared form component. The external staging website and approved member portal are unchanged.

## Brand
Original light/dark PNG marks extracted without redrawing from the supplied client Brand Kit, page 3. Deep Teal #0C2E2A, Teal #2E8C77, Mint #7BD5C2, Paper #F4FBF9, Mist #DFEFEA. Wordmark follows the supplied serif treatment; website headings/body retain existing Plus Jakarta Sans/Inter because the kit supplies no website font specification. No new logo or external stock imagery. Sample business-card names, addresses and contact values are not used as organisation data.

## Scope
Seven main pages; three calculator-example pages; three thank-you design placeholders; Privacy/Terms/Cookies placeholders; review overview. All seven main pages use shared navigation, footer, typography and spacing. Static HTML remains the client review surface. Existing member portal and CTQ pages are unchanged.

## Behaviour and pending work
Hero selectors, mobile menu, outside/Escape dismissal, Get started menu, FAQs, expertise details and pending-asset dialogs work locally. Contact form validates and simulates submission; it neither transmits nor stores data. The audience pages contain inline local forms, with matching dedicated form-entry pages. Fields follow blueprint pages 21/24/28. The forms simulate submission without network/storage and route to explicit preview confirmations. Consultant LinkedIn-or-CV validation and role preselection work. Final required/validation/experience-boundary/verification rules remain open; no account or OTP is created. Member login uses the user-supplied live endpoint https://optimiq-consultus-moiz.azurewebsites.net/login. This URL opened the sign-in screen; no account/authentication test is included in this UI revision.

Calculator results are fixed examples from the supplied blueprint, not live calculations. The confidential v4.3 workbook, formulas and model constants are not in this build. Do not copy the standalone supplied calculator JavaScript into the public site. Production calculation must run privately after assumptions/disclosure approval. Prior legacy calculator files remain historical assets; v4.3 does not load them.

Consultant/Firm concept-note PDFs use the new palette and original marks; email gating is an explicit simulator and stores no email. The Client concept note awaits the public-disclosure decision. Missing films, captions, long guides, Arabic translations, final legal/leadership/contact/social data and production services remain open. No institute co-signing, draft CPD/appeal thresholds, new scoring model, SLA or fee is invented. The private clarification workbook is supplied separately and must not be published with internal responses.

## Verification
Seven main pages checked at 320, 390, 768, 1280 and 1440 pixel widths: no document overflow or broken images. Ten remaining screens checked at 390px. Local link/asset checks passed. Menu dismissal, hero selection, invalid/valid contact simulator and asset dialog checked. These checks establish a static review build, not production backend readiness.

## 14 November feedback revision

Hero artwork replaced by slide-specific visual placeholders from blueprint pages 15/18/22/26. The former gold art direction is interpreted in the supplied teal brand palette. Home comparison is now paired icon-led cards. Nine Areas uses the same disclosure-grid generator on Home and Client. Six video placements share the Home frame size; audience takeaways and CTA sit below. Revision brand-v43-feedback-20261114.

## Image and login refinement

Revision brand-v43-images-20261114: hero visual slots are actual image elements with a local neutral SVG placeholder; art briefs remain in accessible captions. Decorative launch arrows removed from web CTAs/content; rate-comparison teams are people pictograms, local versus international, with a key and illustrative caption. Fonts remain Plus Jakarta Sans (headings) / Inter (body); the available kit excerpt embeds Liberation Serif but does not declare a website font standard. Original font assets are privately backed up for later restoration, outside this public repository. All public Member login actions use the exact Azure URL supplied by the user; approval-catalog portal previews remain separate static screens.

## Visible pending-image briefs

Revision brand-v43-captions-20261114: user requests that the blueprint image description be visible and highlighted, beneath each actual image placeholder. All 13 hero captions now use an amber panel labelled Image pending from client. Caption text follows the source blueprint, including its gold seal/gateway references; the website palette remains the supplied teal branding. Final image artwork is still pending. This supersedes the preceding hidden-only caption treatment.
