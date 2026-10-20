import WorkspaceShell, { type NavigationItem } from '@/components/WorkspaceShell';
import { DetailRows, MetricGrid, Panel } from '@/components/WorkspaceBlocks';

const navigation: NavigationItem[] = [
  { label: 'Overview', href: '/admin/' }, { label: 'Members & organisations' }, { label: 'CTQ & scoring' },
  { label: 'Commercial rules' }, { label: 'Agreements & introduction' }, { label: 'Masking & access' },
  { label: 'Meetings & integrations' }, { label: 'Reports & audit' }, { label: 'Change approvals' },
];

export default function AdminWorkspacePage() {
  return <WorkspaceShell workspace="Staff / Admin" section="Administration" active="Overview" navigation={navigation} roleLabel="Assigned staff role" eyebrow="OptimIQ staff workspace" title="Administration & platform controls" intro="Review member operations and manage business rules through controlled changes. Each staff member sees sections and actions assigned to their role." concept="Required agreements before award and introduction are confirmed. Agreement details and the LOI sequence still need clarification; consultant feedback is recorded per project, with its score treatment still open.">
    <MetricGrid items={[{ label: 'Change requests awaiting review', value: '—', note: 'Example summary field' }, { label: 'Operational items', value: '—', note: 'Queues depend on staff permissions' }, { label: 'Recent privileged actions', value: '—', note: 'Visible to authorised staff' }]} />
    <Panel title="Master Admin approval queue" description="Present each proposed change with its reason, impact, and before/after values." action="Final approval"><div className="approval-rows"><div><strong>Agreement and introduction gate</strong><span>Client approved</span></div><div><strong>Agreement details and LOI order</strong><span>Needs clarification</span></div><div><strong>Client feedback score treatment</strong><span>Needs clarification</span></div></div></Panel>
    <Panel title="Configurable platform controls" description="Staff prepare changes; Master Admin approves them before they take effect."><DetailRows rows={[{ label: 'Agreement rules', value: 'Required signatures and stage gates' }, { label: 'Scoring policy', value: 'Weights, thresholds, and version history' }, { label: 'Access & masking', value: 'Role-based visibility and release gates' }, { label: 'Audit trail', value: 'Actor, decision, reason, and effective date' }]} /></Panel>
  </WorkspaceShell>;
}
