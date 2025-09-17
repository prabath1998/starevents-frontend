import { useEffect, useState } from 'react';
import { myTickets, myTicketQrUrl } from '../api/tickets';
import Card from '../components/Card';
import Button from '../components/Button';
import Empty from '../components/Empty';
import toast from 'react-hot-toast';

export default function MyTickets() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await myTickets();
        if (!cancelled) setItems(res);
      } catch {
        if (!cancelled) toast.error('Failed to load tickets');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  if (!items.length) {
    return (
      <Empty
        title="No tickets yet"
        subtitle="Purchase tickets and they’ll appear here."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(t => (
        <Card key={t.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Ticket Code</div>
            <div className="text-indigo-300 font-semibold">#{t.ticketCode}</div>
          </div>

          <div>
            <div className="text-gray-100 font-medium">{t.eventTitle}</div>
            <div className="text-xs text-gray-500">
              Issued {new Date(t.issuedAt).toLocaleString()}
            </div>
            <div className="mt-1 text-xs">
              Status:{' '}
              <span className="px-2 py-0.5 rounded border border-gray-700 bg-gray-800">
                {t.status}
              </span>
            </div>
          </div>

          <img
            className="w-full border border-gray-800 rounded-lg bg-white p-2"
            src={myTicketQrUrl(t.id)}
            alt="Ticket QR"
          />

          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              onClick={() => window.open(myTicketQrUrl(t.id), '_blank')}
            >
              Open
            </Button>
            <a
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
              href={myTicketQrUrl(t.id)}
              download={`ticket-${t.ticketCode}.png`}
            >
              Download
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
