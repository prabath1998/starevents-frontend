import http from './http'

export async function listMyEvents(page=1, pageSize=20) {
  const { data } = await http.get('/organizer/events', { params:{ page, pageSize } })
  return data
}
export async function createEvent(payload) {
  const { data } = await http.post('/organizer/events', payload)
  return data
}
export async function addTicketType(eventId, payload) {
  const { data } = await http.post(`/organizer/events/${eventId}/ticket-types`, payload)
  return data
}
