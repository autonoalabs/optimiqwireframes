"""Blueprint-based guide and download components for the review build.

The PDFs built from this content are working drafts, not client-approved policy.
"""
from html import escape

GUIDES = {
    "client": ("Client Guide", "OptimIQ_Client_Guide_REVIEW_DRAFT.pdf", "Organizations"),
    "expert": ("Professional's Guide", "OptimIQ_Professional_Guide_REVIEW_DRAFT.pdf", "Consultants, Strategic Advisors and Project Managers"),
    "firm": ("Firm Partnership Guide", "OptimIQ_Firm_Partnership_Guide_REVIEW_DRAFT.pdf", "Consulting firms"),
}


def guide_download(a, pre=""):
    """Download the right guide from an audience-specific thank-you page."""
    title, file_name, _ = GUIDES[a]
    return (f'<a class="btn secondary guide-download" href="{pre}assets/guides-v43/{file_name}" '
            f'download>{escape("Download " + title)} <span aria-hidden="true">↓</span></a>')


def guide_gate(a, pre=""):
    """Name/email preview gate. Static preview never stores or transmits fields."""
    title, _, audience = GUIDES[a]
    next_path = f'{pre}thank-you-{"consultant" if a == "expert" else a}/?guide-preview=1'
    return f'''<section class="section guide-gate" id="guide-download" aria-labelledby="guide-title-{a}">
      <div class="wrap guide-gate-inner"><div><p class="eyebrow">A practical guide for {escape(audience.lower())}</p>
      <h2 id="guide-title-{a}">Know what to expect.</h2>
      <p>Get the {escape(title)}. This review draft follows the blueprint and marks details still awaiting confirmation.</p></div>
      <form data-guide-gate data-guide-next="{escape(next_path, quote=True)}">
        <label>Full name<input name="name" autocomplete="name" required maxlength="120"></label>
        <label>Work email<input type="email" name="email" autocomplete="email" required maxlength="254"></label>
        <p class="fine">Review preview. Your details are not sent or saved.</p>
        <button class="btn" type="submit">Continue to the guide</button>
        <p class="form-status" role="status"></p>
      </form></div></section>'''
