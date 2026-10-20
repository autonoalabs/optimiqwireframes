export type ReviewStatus = 'Awaiting screen feedback' | 'Needs clarification' | 'Approved';

export function ScreenStatus({ status }: { status: ReviewStatus }) {
  return <span className={`review-status review-status--${status.toLowerCase().replace(/\s+/g, '-')}`}>{status}</span>;
}
