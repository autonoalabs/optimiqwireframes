# Feedback 2 — legacy registration fields and mobile navigation

Received 1 November 2026. User instruction: all CTA/registration forms must have the exact existing fields; mobile navigation must expose the desktop navigation. This supersedes the earlier short three-required-field public-form proposal. Design 1 colours, fonts, branding and shared components are retained.

## Existing pages inspected directly

- https://staging.optimiqconsultus.com/for-clients-form
- https://staging.optimiqconsultus.com/for-consultants-form
- https://staging.optimiqconsultus.com/for-consulting-firms-form

The reference is recorded in legacy-form-reference.json: visible field names, labels, types, required indicators, groups and option values. No staging form was submitted or modified. Existing frontend form-pages.js and upload-interest.js were read to understand tabs, multi-selects, drafts and file limits. No legacy JavaScript or hidden token is copied into the new visitor application.

## Restored fields

- Client: 11 fields/groups across Organization & Contact, Support Needed, Relevant Domains, Organization Size, Project & Requirements. Scope documents accept up to five PDF/DOC/DOCX files.
- Consultant registration: three source role variants, selected by accessible tabs. Consultant has 16 fields including optional video; Strategic Advisor has 14; Project Manager has 14. Inactive role panels are disabled, excluded from validation and payloads, and preserve their entries only during the current page session.
- Consulting firm: eight fields/groups, including four required contacts, all three interest options, practice-area multi-select, firm size and narrative.
- General enquiries and the separate email-only concept-note simulator remain distinct from registration.

All three website CTA entry points and their dedicated audience pages use the same component/master. Register links, direct actions, calculator continuation and legacy preview GET redirects reach the matching complete registration form. Registration is a simulator, with no live submission endpoint. Existing account/email verification and password setup remain the approved continuation; no duplicate verification or login process is introduced. Initial CTA role is separate from the approved common CTQ and later multi-role fit selection.

## Source gaps and reconciliations

1. Consultant Years in Consulting has no choices on the live source or in its Stage 1 workbook. It is retained, optional, disabled and marked Needs clarification.
2. Strategic Advisor Sectors of Expertise is required but has no choices in the live source or Stage 1 workbook. It is retained and marked Needs clarification; final submission cannot pretend that this required field is complete.
3. Project Manager Years as PM / Program Lead is required but has no choices on the source or Stage 1 workbook. Same explicit pending handling.

The approved CTA workbook specifies the same primary-expertise master for Secondary Expertise and PM Primary Expertise, and the existing platform region list for Advisor Geographic Expertise. Those reuse the choices already visible in the Consultant form; these reconciliations are documented in the reference JSON. No unsupported business bands are invented.

The client source gives both concern and project-description textareas the same HTML name. Both visible fields are restored, using separate areas_of_concern and project_description payload keys so neither answer overwrites the other. Source IDs are retained in metadata for integration mapping. The client source omits the required attribute on Work Email. That same field is required in this implementation to honour the already-approved email-verification registration flow; no new business question is raised. The existing source website and approved portal are not edited.

## Mobile navigation

The same four desktop links remain visible on mobile: For clients, For consultants, For consulting firms and Why OptimIQ. They wrap into a two-column navigation below the existing logo and Register control, with 48 px targets and the same reading order/current-page styling. No horizontal scrolling or hidden menu is needed to find these links. Shared Register retains its three audience destinations. Header height drives anchor offsets so form headings remain visible below the sticky navigation.

## Drafts, files and backend handover

Save as Draft explicitly keeps data only in the current review tab; refresh/navigation clears it. It does not claim durable saving. File selection and removal work locally; no upload occurs with endpoints null. CV accepts PDF/DOC/DOCX, one file up to 5 MB; client scope uploads accept the displayed types and five-file maximum. Optional consultant video is an upload field; recording integration is outside this field-parity update. Private data/files are not stored in browser storage, URLs or the repository.

Payload version is public-website-feedback-02. It allowlists the active audience/role fields, arrays of the source choice IDs, and safe file metadata. Manually chosen registration day-rate expectation is its own legacy field and is not populated from or bundled with the optional calculator. The existing consultant calculator opt-in still excludes its raw commercial inputs unless deliberately attached.

With a future configured endpoint, submissions containing files use multipart/form-data: registration contains the JSON payload including request_id, and named file parts carry the selected files. Without files, JSON is used. Idempotency headers, receipt handling, retry IDs and validation/throttling behavior remain shared. Backend developers must map this version to the existing identity/verification services and validate/store files and leads before acknowledging durable receipt. No actual endpoint, upload store or notification is invented.

## Verification

Node regressions cover all restored field keys and role counts, grouped-choice allowlists, separate client narratives, file metadata, role-specific data exclusion, commercial opt-out, and the three pending option lists. Existing calculator/reference and submission/receipt/retry tests remain passing.

Browser: client details, scope-PDF selection and simulated submission completed; firm contacts and Not sure yet interest submitted in preview; Advisor filled required details stops at its missing required sector choices with a clear message. Role tabs support mouse/keyboard and draft simulation. Four pages checked at 320/390/768 widths with visible desktop-equivalent links and no horizontal overflow; navigation and Register route to the correct audience. Desktop final visual review is included before publishing. Physical-device upload/keyboard and live integration tests remain later production checks.
