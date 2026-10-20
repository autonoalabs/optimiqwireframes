import WorkspaceShell, { type NavigationItem } from '@/components/WorkspaceShell';
import { DetailRows, Journey, MetricGrid, Panel, TwoColumn } from '@/components/WorkspaceBlocks';

const navigation: NavigationItem[] = [
  { label: 'Overview', href: '/client/' }, { label: 'Requirements' }, { label: 'Shortlists' },
  { label: 'Engagements' }, { label: 'Meetings' }, { label: 'Invoices & payments' }, { label: 'Feedback' },
];

export default function ClientWorkspacePage() {
  return <WorkspaceShell workspace="Client workspace" section="Workspace" active="Overview" navigation={navigation} roleLabel="Client workspace" eyebrow="Client portal" title="Your OptimIQ workspace" intro="Track requirements, review masked Expert profiles, and follow each project through agreement, award, introduction, and delivery." concept="Required agreements must be signed before award and introduction. Agreement types, signatories, and exact order relative to the LOI remain open for client clarification.">
    <MetricGrid items={[{ label: 'Active requirements', value: '—', note: 'Example summary field' }, { label: 'Profiles to review', value: '—', note: 'Masked until the approved release gate' }, { label: 'Live engagements', value: '—', note: 'Project-specific status' }]} />
    <TwoColumn>
      <Panel title="Project journey" description="A requirement moves through the agreed project gates." action="Illustrative"><Journey items={[{ title: 'Requirement', note: 'Complete the client CTQ form' }, { title: 'Shortlist', note: 'Review masked profiles' }, { title: 'Agreements', note: 'Collect required signatures' }, { title: 'Award', note: 'Award follows the defined LOI process' }, { title: 'Introduction', note: 'Unmask and introduce after required gates' }]} /></Panel>
      <Panel title="Current review" description="Example project workspace"><DetailRows rows={[{ label: 'Project', value: 'Transformation programme' }, { label: 'Next action', value: 'Review shortlist' }, { label: 'Agreement status', value: 'Pending required signatures' }, { label: 'Decision date', value: 'To be confirmed' }]} /></Panel>
    </TwoColumn>
  </WorkspaceShell>;
}
