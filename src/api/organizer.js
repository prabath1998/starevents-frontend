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

// Reports API functions
export async function getUserReport(params = {}) {
  const { data } = await http.get('/organizer/reports/users', { params })
  return data
}

export async function getEventReport(params = {}) {
  const { data } = await http.get('/organizer/reports/events', { params })
  return data
}

export async function generatePdfReport(reportData) {
  const response = await http.post('/organizer/reports/generate-pdf', reportData, {
    responseType: 'blob'
  })
  return response.data
}