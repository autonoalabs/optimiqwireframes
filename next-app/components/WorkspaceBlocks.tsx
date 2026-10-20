import type { ReactNode } from 'react';

export function MetricGrid({ items }: { items: { label: string; value: string; note: string }[] }) {
  return <section className="metric-grid" aria-label="Workspace summary">{items.map((item) => <article className="surface metric-card" key={item.label}><span className="muted">{item.label}</span><strong>{item.value}</strong><span className="metric-note">{item.note}</span></article>)}</section>;
}

export function Panel({ title, description, action, children }: { title: string; description?: string; action?: string; children: ReactNode }) {
  return <section className="surface panel"><header className="panel-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action && <span className="panel-tag">{action}</span>}</header>{children}</section>;
}

export function Journey({ items }: { items: { title: string; note: string }[] }) {
  return <ol className="journey-list">{items.map((item, index) => <li className={index === 0 ? 'journey-step journey-step--current' : 'journey-step'} key={item.title}><span className="journey-step__number">{index + 1}</span><strong>{item.title}</strong><span>{item.note}</span></li>)}</ol>;
}

export function DetailRows({ rows }: { rows: { label: string; value: string }[] }) {
  return <dl className="detail-rows">{rows.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>;
}

export function TwoColumn({ children }: { children: ReactNode }) {
  return <div className="content-columns">{children}</div>;
}
