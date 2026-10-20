'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';

export type NavigationItem = { label: string; href?: string };

type WorkspaceShellProps = {
  workspace: string;
  section: string;
  active: string;
  navigation: NavigationItem[];
  roleLabel: string;
  title: string;
  eyebrow: string;
  intro: string;
  concept: string;
  children: ReactNode;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function WorkspaceShell({ workspace, section, active, navigation, roleLabel, title, eyebrow, intro, concept, children }: WorkspaceShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overviewHref = workspace === 'Client workspace' ? '/client/' : workspace === 'Expert workspace' ? '/consultant/' : workspace === 'Firm workspace' ? '/consulting-firm/' : '/admin/';

  return (
    <div className="workspace-app">
      <aside className="workspace-sidebar" aria-label={`${workspace} navigation`}>
        <Link className="workspace-brand" href="/" aria-label="OptimIQ Consultus home">
          <img src={`${basePath}/OptimIQ_Short_logo.png`} alt="" />
          <span><strong>OptimIQ</strong><small>Consultus</small></span>
        </Link>
        <p className="workspace-label">{workspace}</p>
        <div className="workspace-navigation">
          <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="workspace-menu" onClick={() => setMenuOpen((open) => !open)}>
            <span aria-hidden="true">☰</span><span>{section} menu</span><span className="mobile-menu-chevron" aria-hidden="true">{menuOpen ? '▴' : '▾'}</span>
          </button>
          <nav className={`workspace-menu${menuOpen ? ' workspace-menu--open' : ''}`} id="workspace-menu" aria-label={section}>
            <p className="workspace-menu__label">{section}</p>
            {navigation.map((item) => {
              const href = item.href ?? '#';
              const isActive = item.label === active;
              return <Link className={isActive ? 'workspace-menu__link workspace-menu__link--active' : 'workspace-menu__link'} href={href} key={item.label} aria-current={isActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>;
            })}
          </nav>
        </div>
        <p className="sidebar-note">Navigation and actions shown here are illustrative and follow the active account role.</p>
      </aside>

      <main className="workspace-main">
        <header className="workspace-topbar">
          <p className="breadcrumb"><Link href={overviewHref}>{workspace}</Link><span aria-hidden="true">/</span><strong>{active}</strong></p>
          <div className="workspace-topbar__actions"><span className="role-chip">{roleLabel}</span><button className="icon-button" type="button" aria-label="Help">?</button></div>
        </header>
        <aside className="concept-banner"><strong>Client review concept</strong><span>{concept}</span></aside>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="workspace-title">{title}</h1>
        <p className="page-intro">{intro}</p>
        {children}
        <footer className="workspace-footer">Screen concept · Values and workflow details are illustrative where client clarification remains open.</footer>
      </main>
    </div>
  );
}
