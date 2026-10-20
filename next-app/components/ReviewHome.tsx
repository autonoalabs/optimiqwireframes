import Link from 'next/link';
import { ScreenStatus } from './ScreenStatus';

const screens = [
  { title: 'Portal sign-in', description: 'After CTA registration, use the verified email and password to enter the shared portal.', href: '/login/', status: 'Needs clarification' as const },
  { title: 'Client workspace', description: 'Client overview, requirements, agreement gate, and project journey.', href: '/client/', status: 'Awaiting screen feedback' as const },
  { title: 'Consultant workspace', description: 'Role profiles, CTQ, certification, concurrent assignments, and feedback.', href: '/consultant/', status: 'Awaiting screen feedback' as const },
  { title: 'Consulting firm workspace', description: 'One firm account with Seller, Buyer, and Win-and-Staff modes.', href: '/consulting-firm/', status: 'Awaiting screen feedback' as const },
  { title: 'Staff / Admin workspace', description: 'Role-based administration and Master Admin configuration approvals.', href: '/admin/', status: 'Awaiting screen feedback' as const },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function ReviewHome() {
  return (
    <main className="review-home">
      <header className="review-header">
        <div className="review-brand">
          <img src={`${basePath}/OptimIQ_Consultus_Logo.png`} alt="OptimIQ Consultus logo" />
          <div><p className="eyebrow">Client design review</p><h1>Theme 1 screen review</h1><p className="muted">OptimIQ Consultus workspace concepts</p></div>
        </div>
        <span className="theme-approved">Theme 1 approved</span>
      </header>

      <p className="page-intro">Theme 1 is the approved visual direction. Open each role workspace below to review its screen design. Screen approval is tracked separately from theme approval.</p>
      <aside className="review-note"><strong>Review status:</strong> Theme 1 has been approved. Individual workspace screens are awaiting screen-specific feedback and approval.</aside>

      <section aria-labelledby="screen-list-heading">
        <div className="section-heading"><div><h2 id="screen-list-heading">Workspace screens</h2><p>Select a screen to open its review page.</p></div><a className="secondary-button" href={`${basePath}/OptimIQ_Portal_Screen_Approval_Inventory.xlsx`} download>Download feedback tracker</a></div>
        <div className="screen-grid">
          {screens.map((screen) => (
            <Link className="screen-card" href={screen.href} key={screen.href}>
              <span className="screen-card__content"><span className="screen-card__title">{screen.title}</span><span className="screen-card__description">{screen.description}</span></span>
              <span className="screen-card__bottom"><ScreenStatus status={screen.status} /><span className="screen-card__arrow" aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>
      <footer className="review-footer"><span>OptimIQ Consultus · Theme 1 review</span><span>Client feedback is recorded in the approval inventory.</span></footer>
    </main>
  );
}
