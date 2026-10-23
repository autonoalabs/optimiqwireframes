import WorkspaceShell, { type NavigationItem } from '@/components/WorkspaceShell';
import { DetailRows, Journey, MetricGrid, Panel, TwoColumn } from '@/components/WorkspaceBlocks';

const navigation: NavigationItem[] = [
  { label: 'Overview', href: '/consultant/' },
  { label: 'Profile & assessment', href: '/consultant/profile/' },
  { label: 'Terms & declarations', href: '/consultant/terms/' },
  { label: 'CTQ form', href: '/consultant/ctq/' },
  { label: 'Role fit', href: '/consultant/role-fit/' },
  { label: 'Certification', href: '/consultant/certification/' },
  { label: 'Opportunities', href: '/consultant/opportunities/' },
  { label: 'Project agreement gate', href: '/consultant/agreement/' },
  { label: 'Engagements', href: '/consultant/engagements/' },
  { label: 'Payments & invoices', href: '/consultant/payments/' },
  { label: 'Communications', href: '/consultant/communications/' },
  { label: 'Project calendar', href: '/consultant/calendar/' },
  { label: 'Performance & CPD', href: '/consultant/performance/' },
  { label: 'Project documents · Phase 2', href: '/consultant/documents/' },
];

export default function ConsultantWorkspacePage() {
  return <WorkspaceShell workspace="Consultant workspace" section="My workspace" active="Overview" navigation={navigation} roleLabel="Project Manager profile" eyebrow="Consultant lifecycle" title="Your professional workspace" intro="Manage your professional role profiles, complete the assessment journey, and track concurrent project assignments and client feedback." concept="One Consultant can have multiple active project assignments. Client feedback is stored per assignment; its effect on the composite score remains open for client clarification.">
    <MetricGrid items={[{ label: 'Role fit options', value: '3', note: 'Consultant · Strategic Advisor · Project Manager' }, { label: 'Active engagements', value: '2', note: 'Each tracked separately' }, { label: 'Assessment progress', value: 'In progress', note: 'Scores and weights are not shown.' }]} />
    <TwoColumn>
      <Panel title="Consultant journey" description="Complete the full assessment, then follow each selected project through signed agreements and delivery." action="Illustrative"><Journey items={[{ title: 'CTQ & assessments', note: 'One CTQ set plus the other components' }, { title: 'Tier & certification', note: 'After the full composite is complete' }, { title: 'Opportunity', note: 'Review and respond to a project' }, { title: 'Agreements', note: 'Sign before award and introduction' }, { title: 'Award & engagement', note: 'Track every project separately' }]} /></Panel>
      <Panel title="Concurrent assignments" description="Capacity and feedback belong to each project assignment."><DetailRows rows={[{ label: 'Programme Atlas', value: 'Active · 3 days / week' }, { label: 'Project Northstar', value: 'Active · 1 day / week' }, { label: 'Feedback', value: 'Recorded separately per project' }, { label: 'Score impact', value: 'Open for client clarification' }]} /></Panel>
    </TwoColumn>
  </WorkspaceShell>;
}
