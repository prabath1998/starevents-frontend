import http from './http'

export async function myTickets(eventId) {
  const { data } = await http.get('/me/tickets', { params: { eventId }})
  return data
}
export function myTicketQrUrl(id) { 
  return `${import.meta.env.VITE_API_BASE}/me/tickets/${id}/qr`
}

export const validateTicket = async (codeOrQr) => {
  const r = await http.post('/tickets/validate', { codeOrQr });
  const d = r.data; 
  return {
    ok: !!d.valid,
    status: d.status,
    ticketId: d.ticketId,
    eventId: d.eventId,
    message: d.message ?? null,
  };
};

export const checkInTicket = async (codeOrQr) => {
  const r = await http.post('/tickets/check-in', { codeOrQr });
  const d = r.data; 
  return {
    ok: !!d.success,
    status: d.status,
    ticketId: d.ticketId,
    eventId: d.eventId ?? null,
    message: d.message ?? null,
    checkedInAt: d.checkedInAt ?? null,
  };
};
