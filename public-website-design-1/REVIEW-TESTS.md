# Homepage verification — 31 October 2026

## Completed

| Check | Result |
|---|---|
| 1366 × 768 compact hero | All three complete audience cards visible; cards ended at approximately 561 CSS px before final small link-height adjustment, still within 768 px. |
| 1920 × 1080 compact hero | All cards visible; cards ended at approximately 621 CSS px. |
| 320, 360, 390, 430 px | No page horizontal overflow with calculator open. All three forms checked at all four widths: no overflow, fields at least 48 px high. |
| Mobile calculator action | Visible with open calculator; becomes hidden when any short form opens. Content clearance provided. |
| Direct short flows | Client, consultant and firm card routes each open their own short form without requiring a calculator. Header, video and closing use the same route handler. |
| Client arithmetic | 240 days × $2,000 versus $1,300: $168,000 reduction; target $2,500: $120,000 increase; target $2,000: no difference ($0). |
| Firm zero projects | $0, requested zero-state message, partnership action remains available. |
| Confirmation/attachment | Partial confirmation hides attachment. All required inputs confirmed exposes unchecked optional attachment. Consultant opt-out excludes the scenario; opt-in includes it. Pure payload tests verify commercial fields and unrelated fields do not leak into application. |
| Form validation | Invalid email shows “Please enter a valid email address.” Gmail address accepted; field values retained. Errors are linked to fields, focus moves to the first error. |
| Retained state | Consultant name, email and experience retained across panel switches and close/reopen. |
| Video fallback | Missing-asset fallback opens with readable overview; audience registration remains available. |
| Source checks | JavaScript syntax passes. Public arithmetic, allowlist, opt-in/opt-out and contrast checks pass. |
| Contrast | White/green 8.05:1; white/hover 9.91:1; muted/white 4.76:1; muted/light grey 4.51:1; mint/slate 7.04:1; error/white 6.57:1. |

## Pending — not reported as passed

- Video playback/captions: final client asset missing, confirmed by user; recorded as WEB-VIDEO-01.
- Physical mobile keyboard/OS safe-area behaviour: visual viewport handling implemented; real-device test remains WEB-QA-01.
- Connection/server failures, safe server retries and durable successful submission/routing/email: no backend is connected. This static preview intentionally reports no information sent. Production checks remain WEB-API-01.
- Arabic translation, IBM Plex Sans Arabic asset and comprehensive RTL QA await commissioning.
