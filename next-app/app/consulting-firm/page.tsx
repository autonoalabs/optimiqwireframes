import WorkspaceShell, { type NavigationItem } from '@/components/WorkspaceShell';
import { DetailRows, Journey, MetricGrid, Panel, TwoColumn } from '@/components/WorkspaceBlocks';

const navigation: NavigationItem[] = [
  { label: 'Overview', href: '/consulting-firm/' }, { label: 'Seller' }, { label: 'Buyer' },
  { label: 'Win & Staff' }, { label: 'Firm profile & CTQ' }, { label: 'Engagements' }, { label: 'Payments & feedback' },
];

export default function ConsultingFirmWorkspacePage() {
  return <WorkspaceShell workspace="Firm workspace" section="Organisation" active="Overview" navigation={navigation} roleLabel="Consulting Firm" eyebrow="One firm account · project-scoped modes" title="Manage your firm's OptimIQ work" intro="Use one organisation login to work as a Seller, Buyer, or Win-and-Staff firm. A firm may act as seller and buyer in one project, subject to platform controls." concept="The client requires agreements before award and introduction. Agreement types, signatories, and sequence relative to the LOI remain open because the BRD describes a different award sequence.">
    <MetricGrid items={[{ label: 'Seller opportunities', value: '—', note: 'Review mandates and manage bids' }, { label: 'Buyer Expert requests', value: '—', note: 'Source an Expert for a firm project' }, { label: 'Won mandates to staff', value: '—', note: 'Expert sourcing follows award' }]} />
    <TwoColumn>
      <Panel title="Firm project modes" description="The firm uses the mode needed for each project." action="One firm login"><Journey items={[{ title: 'Seller', note: 'Respond to a client requirement' }, { title: 'Buyer', note: 'Request Experts from OptimIQ' }, { title: 'Win & Staff', note: 'Source staffing after the firm wins' }]} /></Panel>
      <Panel title="Example activity" description="Each project keeps its own role and status."><DetailRows rows={[{ label: 'Project Cedar', value: 'Seller · Bid submitted' }, { label: 'External project', value: 'Buyer · Expert sourcing requested' }, { label: 'Client contract', value: 'Managed between client and firm' }, { label: 'OptimIQ involvement', value: 'Only for Expert sourcing through the platform' }]} /></Panel>
    </TwoColumn>
  </WorkspaceShell>;
}
