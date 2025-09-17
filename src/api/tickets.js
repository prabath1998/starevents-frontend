import http from './http'

export async function myTickets(eventId) {
  const { data } = await http.get('/me/tickets', { params: { eventId }})
  return data
}
export function myTicketQrUrl(id) {
  // image endpoint returns PNG
  return `${import.meta.env.VITE_API_BASE}/me/tickets/${id}/qr`
}

// Organizer scanning
export async function validateTicket(codeOrQr) {
  const { data } = await http.post('/tickets/validate', { codeOrQr })
  return data
}
export async function checkInTicket(codeOrQr) {
  const { data } = await http.post('/tickets/check-in', { codeOrQr })
  return data
}
