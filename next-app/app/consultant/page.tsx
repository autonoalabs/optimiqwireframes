import WorkspaceShell, { type NavigationItem } from '@/components/WorkspaceShell';
import { DetailRows, Journey, MetricGrid, Panel, TwoColumn } from '@/components/WorkspaceBlocks';

const navigation: NavigationItem[] = [
  { label: 'Overview', href: '/consultant/' }, { label: 'My role profiles' }, { label: 'CTQ & score' },
  { label: 'Certification' }, { label: 'Opportunities' }, { label: 'Engagements' }, { label: 'Performance & CPD' },
];

export default function ConsultantWorkspacePage() {
  return <WorkspaceShell workspace="Expert workspace" section="My workspace" active="Overview" navigation={navigation} roleLabel="Project Manager profile" eyebrow="Consultant lifecycle" title="Your professional workspace" intro="Manage your professional role profiles, complete the assessment journey, and track concurrent project assignments and client feedback." concept="One Expert role profile can have multiple active project assignments. Client feedback is stored per assignment; its effect on the composite score remains open for client clarification.">
    <MetricGrid items={[{ label: 'Role profiles', value: '3', note: 'Consultant · Strategic Advisor · Project Manager' }, { label: 'Active assignments', value: '2', note: 'Each tracked separately' }, { label: 'Composite score', value: '—', note: 'Feedback treatment pending clarification' }]} />
    <TwoColumn>
      <Panel title="Qualification journey" description="Move through the qualification and certification stages." action="Illustrative"><Journey items={[{ title: 'CTQ', note: 'Complete the role-specific form' }, { title: 'Assessment', note: 'Complete remaining scoring components' }, { title: 'Tier', note: 'Receive a tier after the full score' }, { title: 'Certification', note: 'External certifier details remain open' }]} /></Panel>
      <Panel title="Concurrent assignments" description="Capacity and feedback belong to each project assignment."><DetailRows rows={[{ label: 'Programme Atlas', value: 'Active · 3 days / week' }, { label: 'Project Northstar', value: 'Active · 1 day / week' }, { label: 'Feedback', value: 'Recorded separately per project' }, { label: 'Score impact', value: 'Open for client clarification' }]} /></Panel>
    </TwoColumn>
  </WorkspaceShell>;
}
