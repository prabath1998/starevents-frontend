import { useEffect, useState } from 'react';
import { myTickets } from '../api/tickets';
import http from '../api/http';
import Card from '../components/Card';
import Button from '../components/Button';
import Empty from '../components/Empty';
import toast from 'react-hot-toast';
import QRImage from '../components/QRImage';
import { Download, ExternalLink } from 'lucide-react'; // Added icons

// Reusable component for status badges with distinct colors
const TicketStatusBadge = ({ status }) => {
  const statusColors = {
    VALID: 'bg-green-600 text-green-100',
    CHECKED_IN: 'bg-blue-600 text-blue-100', // Example
    EXPIRED: 'bg-red-600 text-red-100', // Example
    PENDING: 'bg-yellow-600 text-yellow-100', // Example
    DEFAULT: 'bg-gray-600 text-gray-100'
  };

  const statusClass = statusColors[status] || statusColors.DEFAULT;

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full tracking-wider ${statusClass}`}>
      {status}
    </span>
  );
};

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 md:p-8">
      {items.map(t => (
        <Card key={t.id} className="relative p-6 rounded-2xl border border-gray-700 bg-gray-900 shadow-xl
          transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/50">
          
          <div className="flex flex-col items-center text-center">
            
            <div className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-1">
              {t.eventTitle}
            </div>
            <div className="text-xs text-gray-400 mb-4">
              Issued {new Date(t.issuedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
              })}
            </div>

            <div className="bg-white p-2 rounded-xl mb-4 shadow-inner border border-gray-200">
              <QRImage ticketId={t.id} className="w-32 h-32 rounded-lg" />
            </div>

            <div className="text-xs font-mono text-gray-400 mb-2">
              Ticket Code: <span className="text-gray-200 font-bold text-base">{t.ticketCode}</span>
            </div>

            <div className="mb-4">
              <TicketStatusBadge status={t.status} />
            </div>
          </div>
         
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
            <Button
              className="w-full justify-center gap-2 rounded-full text-white font-semibold
                bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                transition-transform transform hover:scale-[1.02]"
              onClick={() => downloadQr(t.id, `ticket-${t.ticketCode}`)}
            >
              <Download size={18} />
              Download QR Code
            </Button>
            
          </div>
        </Card>
      ))}
    </div>
  );
}