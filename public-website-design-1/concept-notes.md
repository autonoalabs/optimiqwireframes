# Audience concept-note downloads

Decision recorded 1 November 2026: the user requested all three client-supplied concept notes be restyled as downloadable PDFs, using Design 1 branding. The user explicitly approved a simulator now; a developer will connect the backend later. This is an incremental addition to Design 1, not a new theme or a change to portal/CTQ approvals.

## Delivered flow

Each homepage audience card, its expanded calculator result, and its dedicated audience hero/calculator has a Get the concept note button. A shared accessible dialog asks only for email, validates it, and automatically starts the matching PDF download. A visible manual download link handles browsers that do not start the download. Closing or leaving clears email. Escape and clicking the backdrop dismiss the dialog and return focus. No email is stored in the browser, URL, repository or external system, and no message is sent.

The dialog states Review simulator: your email is not saved. It never claims a real lead was captured. No extra name, application or commercial calculator data is requested or reused. There are no new tracking or third-party submission services.

## PDF assets

Three two-page, searchable PDFs: Clients, Experts and Firms. They retain the supplied problem, calculator example, process, benefits, quote and CTA copy. Branding uses #0D5C3A green, #10B981 mint, #0F172A slate, Plus Jakarta Sans headings, Inter body and the current OptimIQ logo. Fonts are embedded. Files are approximately 91 KB each.

Navigation inside the review PDFs points to working GitHub audience calculator/application routes. At production cutover, set BASE in pdf-source/build_concept_notes.py to the approved production base and regenerate. The footer's unsupported statement that the benchmark model is not published was replaced with a neutral illustrative-model disclaimer, consistent with the existing public prototype. No formulas or coefficients appear in the PDFs.

## Future backend connection

Set guides.client.endpoint, guides.expert.endpoint and guides.firm.endpoint in site-config.json, then rebuild. Endpoints remain null in this simulator. The UI uses the existing submission service for retry IDs, duplicate prevention and durable receipt checks.

POST JSON contains only audience, lead_type=concept_note, concept_note_id, email, form_version, source_page, source_component and request_id. The backend must validate audience/note mapping and email, persist the potential lead with a server timestamp and preserve the idempotency key. A PDF request does not grant an unrequested marketing subscription.

Expected accepted response: {"status":"accepted","receipt":true,"reference":"opaque-server-reference"}. Only this durable acknowledgement unlocks the production download flow. Validation uses HTTP 422 with {"fields":{"email":"..."}}; throttling uses HTTP 429; failures offer retry and preserve email without pretending to save a lead. Final Privacy Notice remains a separate requirement.

PDF files in this static review are public assets. The email prompt demonstrates lead collection UX; it is not secure file access control. If protected delivery is later required, the backend must return controlled download access after recording the request.

## Regenerating PDFs

Run pdf-source/build_concept_notes.py with Python, ReportLab, Pillow, FontTools and pypdf installed. From public-website-design-1: python pdf-source/build_concept_notes.py --output assets/concept-notes . It converts the bundled variable fonts to the required static weights for PDF embedding, checks text coverage and maintains two pages per audience. Temporary font files/verification live under tmp/pdfs/concept-notes in the invocation directory. Re-render and inspect all pages after edits. Original uploaded PDFs remain untouched.
