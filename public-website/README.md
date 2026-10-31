# OptimIQ public website — design draft 01

Status: awaiting design feedback. This is a new public homepage concept, not an approved brand or portal theme change. It reuses the approved portal palette: forest #062f29, teal #37a78a, mint #dff3eb, canvas #f5f8f6 and ink #092e28. It uses the supplied OptimIQ logo.

Buildless semantic HTML, layered modern CSS, responsive Grid/Flexbox, fluid typography, native details/summary, progressive anchor navigation, keyboard-accessible audience tabs and small dependency-free JavaScript. No runtime framework, external trackers, forms collecting data, invented testimonials or earnings forecasts. The consultant planner only calculates days from visitor-specified values. The default numbers demonstrate arithmetic and are editable assumptions.

Open index.html directly or serve this folder over HTTP. For the repository version, the shared portal links resolve from public-website/ to the root portal pages. The existing CTA links point to staging; choose production destinations before launch. The public site currently has no published standalone legal copy; add approved privacy/terms links before production.

Suggested component boundaries for later React/Next.js: SiteHeader, Hero, ExpertiseMap, AudiencePaths, AudienceTabs, ClientPanel, ConsultantPlanner, FirmPanel, ApproachSection, JourneySteps, FaqList, SiteFooter. Keep business calculations pure and testable. The review HTML remains the client-facing artifact.

First review scope: homepage direction, content hierarchy, palette, audience routing and consultant hook interaction. Client/firm calculator concepts remain pending their document reviews. Other planned public pages, guides, Arabic/RTL content, backend handoff, metadata and production legal content require later implementation. Phase 1 public availability and credential language still need business alignment; copy avoids assuming the future marketplace is live.
