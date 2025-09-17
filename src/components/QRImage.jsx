
import { useEffect, useState } from 'react';
import http from '../api/http';

export default function QRImage({ ticketId, className = '' }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let active = true;
    let url;
    (async () => {
      try {
        const res = await http.get(`/me/tickets/${ticketId}/qr`, { responseType: 'blob' });
        url = URL.createObjectURL(res.data);
        if (active) setSrc(url);
      } catch (e) {
        console.error('QR load failed', e);
      }
    })();
    return () => {
      active = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [ticketId]);

  if (!src) return <div className="h-40 w-40 bg-gray-800/40 animate-pulse rounded-xl" />;
  return <img src={src} alt="Ticket QR" className={className || 'h-40 w-40 rounded-xl border border-gray-800'} />;
}
