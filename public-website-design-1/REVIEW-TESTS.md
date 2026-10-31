# Connected public website verification

31 October 2026. Status: ready for client design review, awaiting approval and the documented release dependencies. This report distinguishes browser preview checks, mocked service checks and production checks that cannot yet run.

## Browser and layout results

| Check | Result |
|---|---|
| Four pages at eight sizes | Homepage, clients, consultants and firms checked at 320, 360, 390, 430, 768, 1024, 1366 and 1920 CSS-pixel widths: 32 matching viewport measurements, no horizontal page overflow. |
| Compact homepage | At 1366 × 768, all complete audience cards end at about 569 px. At 1920 × 1080, cards end at about 653 px. Each card retains tool, direct form and Learn more actions. |
| Mobile targets | Visible action/link/label targets checked at 320 px on all four pages: none below 48 px allowing normal subpixel rounding. Fields and range hit areas retain minimum 48 px sizing. |
| Homepage mobile interactions | All three calculator → sticky registration → short form flows checked at 320 px. No overflow; sticky bar clears for forms and returns on close; focus returns to the sticky opener. |
| Audience navigation | Learn more opens the matching page. Shared Register opens the current audience form or navigates to another audience's form anchor. Header/footer use ordinary same-tab route links. |
| Deep links and refresh | /#enquire, /#apply and /#partner initialise the matching drawer and focus its heading. Refresh at #partner keeps the correct route state. |
| Browser Back | Opening a drawer then returning to the default homepage closes the panel, returns focus and retains same-page contact inputs. |
| Page boundaries | Homepage contact entries do not transfer to a dedicated page. Dedicated page starts with examples and an empty form. |
| Three required fields | Each audience has exactly three required contact fields. Client, consultant and firm forms validate with optional values blank and show an honest preview message. Firm practice and both independent interest options can remain empty/unchecked. |
| Email and validation | Personal/custom-domain email accepted. Invalid email shows “Please enter a valid email address.” First error receives focus, error summary/field associations are present, entered names remain. |
| Consultant role | All cards and application role start neutral. Active Project Manager choice synchronises card, calculator selector and optional application role. |
| Consultant opt-in | Confirming calculation enables a separate unchecked attachment choice. Unchecked preview excludes commercial data; checking includes a complete calculation. A numeric edit clears the snapshot and opt-in while retaining the role and contact name. |
| Client calculations | Default $168,000 reduction; target $2,500 yields $120,000 increase with neutral result styling; equal rates show no fee difference ($0). |
| Client confirmation | Editing days confirms only days. Explicit complete confirmation prepares a removable local snapshot and opens the form without submitting. Removing it clears attachment. |
| Firm zero | Zero projects displays $0 and the requested future-capacity message, with partnership action available. |
| FAQs and media fallback | Real button accordions expand/collapse. Missing films reveal a readable overview and retry; registration remains available. |
| Visual review | Full desktop and narrow mobile layouts for all four pages inspected. Shared headers, forms, calculators, typography, spacing and footer match. |

## Source and mocked service checks

- Eight HTML pages audited: four visitor pages, review inventory and three legacy navigation previews. Local assets/links/anchors resolve; IDs are unique; form labels have targets; visitor pages have one H1 and preview noindex metadata.
- No first-step links to the legacy staging long forms remain in the new public pages. Existing staging itself is unchanged.
- Required guides are absent from visitor HTML until their approved assets are configured.
- Public arithmetic examples, range/step boundaries, zero values and complete scenario validation pass.
- Payload allowlist tests retain an actively chosen role but exclude commercial inputs, totals and unrelated fields when earnings attachment is off. Attached scenarios contain validated raw inputs only; the server must recompute totals.
- Mock transport tests cover connection failure, validation errors, throttling, retry with the same request ID, changed logical enquiry, duplicate in-flight activation, false receipt rejection and accepted receipt with failed/queued verification. These are service tests, not evidence of stored CRM records or email delivery.
- JavaScript syntax and Git whitespace checks pass. No live endpoint, analytics, replay or browser storage is configured.
- The approved palette retains white/primary green 8.05:1, white/hover green 9.91:1, mint/slate 7.04:1, supporting text/white 4.76:1 and supporting text/alabaster 4.51:1. Input boundaries retain an additional contrasting slate keyline. Error crimson is #DC2626. These checks are not a complete accessibility certification.

## Pending release checks

1. All four actual films, final posters, transcripts and language captions. Missing client assets prevent playback/caption synchronisation testing.
2. Actual submission services: authoritative validation and recomputation, durable receipts, CRM/log inspection for opted-out commercial data, routing, throttling and idempotency against a real store.
3. Actual consultant email verification, expiring token, failure/resend and approved private-portal continuation. No operational token lifetime or portal address is invented.
4. Real HTTP 301 navigation redirects and separate preservation/migration of legacy POST services on production hosting. Preview handoffs are HTML navigation, not 301 evidence.
5. Final Privacy Notice, acknowledgement rules, guide PDFs/delivery, verified corporate channels, practice master and outstanding business decisions in requirements.json.
6. Physical iOS/Android keyboards and safe areas, screen-reader review, real browser zoom, media accessibility and commissioned Arabic/RTL acceptance. Responsive browser checks do not substitute for these.

Client review entry is review.html or the repository's main index. Screen readiness does not mean production release is approved.
