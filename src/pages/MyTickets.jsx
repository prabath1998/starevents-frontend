import { useEffect, useState } from 'react';
import { myTickets } from '../api/tickets';
import http from '../api/http';
import Card from '../components/Card';
import Button from '../components/Button';
import Empty from '../components/Empty';
import toast from 'react-hot-toast';
import QRImage from '../components/QRImage';

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

  const downloadQr = async (ticketId, fileName) => {
    try {
      const res = await http.get(`/me/tickets/${ticketId}/qr`, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Download failed');
    }
  };

  if (!items.length) {
    return <Empty title="No tickets yet" subtitle="Purchase tickets and they’ll appear here." />;
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
            <div className="text-xs text-gray-500">Issued {new Date(t.issuedAt).toLocaleString()}</div>
            <div className="mt-1 text-xs">
              Status:{' '}
              <span className="px-2 py-0.5 rounded border border-gray-700 bg-gray-800">{t.status}</span>
            </div>
          </div>

          {/* Auth-aware image */}
          <QRImage ticketId={t.id} className="w-full rounded-lg border border-gray-800 bg-white p-2" />

          <div className="flex gap-2 pt-1">
            <Button
              variant="secondary"
              onClick={() => window.open(`/me/tickets/${t.id}/qr`, '_blank')}
            >
              Open
            </Button>
            <Button
              onClick={() => downloadQr(t.id, `ticket-${t.ticketCode}`)}
            >
              Download
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
