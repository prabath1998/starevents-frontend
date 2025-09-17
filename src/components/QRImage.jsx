import { useEffect, useState } from 'react';
import http from '../api/http'; // your axios instance that injects Authorization

export default function QRImage({ ticketId, className = '' }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let alive = true;
    let url;

    (async () => {
      try {
        const res = await http.get(`/me/tickets/${ticketId}/qr`, { responseType: 'blob' });
        url = URL.createObjectURL(res.data);
        if (alive) setSrc(url);
      } catch (e) {
        console.error('QR load failed', e);
      }
    })();

    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [ticketId]);

  if (!src) {
    return <div className="h-40 w-40 rounded-xl bg-gray-800/40 border border-gray-800 animate-pulse" />;
  }
  return <img src={src} alt="Ticket QR" className={className || 'h-40 w-40 rounded-xl border border-gray-800 bg-white p-2'} />;
}
