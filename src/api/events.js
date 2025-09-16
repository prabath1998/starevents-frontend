import http from './http'

export async function listEvents(params) {
  const { data } = await http.get('/events', { params })
  return data
}

export async function getEvent(id) {
  const { data } = await http.get(`/events/${id}`)
  return data
}

export async function getTicketTypes(id, includeAll = false) {
  const { data } = await http.get(`/events/${id}/ticket-types`, { params: { includeAll } })
  return data
}
