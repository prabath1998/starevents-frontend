
export default function TicketStatusBadge({ status }) {
  const color =
    status === 'Valid' ? 'bg-emerald-600'
  : status === 'CheckedIn' ? 'bg-indigo-600'
  : status === 'Invalid' ? 'bg-rose-600'
  : status === 'Forbidden' ? 'bg-amber-600'
  : 'bg-slate-600';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${color}`}>
      {status}
    </span>
  );
}
