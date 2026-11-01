# Final contact and member-sign-in update

User authorises the last review tweak: add member sign-in, contact/address information and social icons, especially LinkedIn. When the source gaps were explained, user replied: "add whatever is present and rest mark for pending requirement".

## Confirmed source details

https://staging.optimiqconsultus.com/contact reviewed 1 November 2026.

- Phone: +91 9168772020. The contact-body tel:+919168772020 matches the displayed number. The old footer's unrelated tel:+483939993900 is corrected rather than copied.
- Client enquiries: solutions@optimiqconsultus.com; assignments/joining: joinus@optimiqconsultus.com. Both displayed emails are converted into correct mailto links; old malformed relative URLs are not reused.
- Presence: India, UAE, Saudi Arabia. No street address is published on that page. These are described as presence, not invented offices.
- LinkedIn, Instagram and Twitter icons exist, but all use javascript:void(0). The review shows accessible non-interactive social icons with an honest "Social profiles coming soon" label. No link to a similarly named unrelated company or generic social homepage is invented. Once supplied, config URLs generate genuine links with new-tab labels.
- Published www.optimiqconsultus.com also supplies joinus@optimiqconsultus.com, but no official social/street details were found. Third-party directory addresses were not promoted to a customer-facing office without confirmation.

## Login

Existing OptimIQ_Portal_Login_Concept.html is used unchanged. Header and footer on all four visitor pages include Member login. Each registration form also offers Already registered? Member login. Audience pages/forms include their appropriate consultant/client/consulting-firm context for the existing demo. The homepage header/footer link stays a shared sign-in without asserting an audience. Its existing simulator needs a previously selected audience to demonstrate continuation; audience-specific entry points work directly. This is a preview, not live identity or registration integration. The production portal URL remains pending; backend login must route from authenticated account roles. No public-registration, password setup, portal layout or CTQ logic changes are included.

The shared footer uses the existing slate/green palette, fonts, type scale, borders and responsive grid. Mobile navigation retains all desktop links. No base theme replacement is introduced.

Pending requirements: official office street addresses; official LinkedIn company URL and other social profile URLs; production portal endpoint and identity integration. These are recorded in requirements.json and the client review inventory.
