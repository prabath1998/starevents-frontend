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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map(t => (
        <Card key={t.id} className="relative overflow-hidden p-6 rounded-2xl border-2 border-gray-800 shadow-xl
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black">

          {/* Ticket Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              Ticket Code
            </div>
            <div className="text-purple-400 font-bold text-lg">
              #{t.ticketCode}
            </div>
          </div>
        
          <div className="mb-4">
            <div className="text-xl font-bold text-white mb-1">{t.eventTitle}</div>
            <div className="text-xs text-gray-500">
              Issued {new Date(t.issuedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              })}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Status:{' '}
              <span className="px-3 py-1 rounded-full text-white font-semibold text-xs tracking-wider"
                style={{ backgroundColor: t.status === 'VALID' ? '#22c55e' : '#eab308' }}>
                {t.status}
              </span>
            </div>
          </div>
         
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <QRImage ticketId={t.id} className="w-full h-auto rounded-lg" />
          </div>
        
          <div className="flex gap-4 pt-6">
            <Button
              variant="secondary"
              className="flex-1 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => window.open(`/me/tickets/${t.id}/qr`, '_blank')}
            >
              Open
            </Button>
            <Button
              className="flex-1 rounded-full text-white font-semibold transition-transform transform hover:scale-105
                bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
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