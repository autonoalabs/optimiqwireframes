# Mobile navigation refinement — 1 November 2026

User requested a collapsible mobile navbar with its button to the left of the logo, and removal of Contact from the navbar. This explicitly supersedes the earlier always-visible mobile menu. The approved palette, typefaces, content components, footer and portal are preserved.

- One shared header on homepage and all three audience pages; Contact removed from desktop and mobile navigation, while footer contacts remain.
- At widths up to 820px, menu is closed initially; 44px toggle is before logo, Register remains visible. Existing navigation links and Member login are available in the dropdown.
- Toggle, outside click, link selection, Escape, keyboard focus leaving the header, or opening Register closes it. Escape returns focus to the toggle; nav and Register do not overlap.
- Hidden navigation is removed from the tab order by display:none. Controls expose aria-expanded, aria-controls and Open/Close menu labels. Dropdown scrolls within short viewports. Desktop navigation remains visible. Without JavaScript, links stay visible instead of becoming inaccessible.
- Production identity routing, pending office addresses and social URLs are unchanged.
