import http from './http'

export async function adminListUsers({ q, role, active, page=1, pageSize=20 }={}) {
  const { data } = await http.get('/admin/users', { params: { q, role, active, page, pageSize }})
  return data
}
export async function adminUpdateUserStatus(id, isActive) {
  const { data } = await http.patch(`/admin/users/${id}/status`, { isActive })
  return data
}
export async function adminModifyUserRoles(id, add=[], remove=[]) {
  await http.post(`/admin/users/${id}/roles`, { add, remove })
}

export async function adminListEvents({ status, q, from, to, page=1, pageSize=20 }={}) {
  const { data } = await http.get('/admin/events', { params: { status, q, from, to, page, pageSize }})
  return data
}
export async function adminChangeEventStatus(id, status) {
  const { data } = await http.patch(`/admin/events/${id}/status`, { status })
  return data
}

export async function adminListDiscounts({ q, active, page=1, pageSize=20 }={}) {
  const { data } = await http.get('/admin/discounts', { params: { q, active, page, pageSize }})
  return data
}
export async function adminToggleDiscount(id, isActive) {
  const { data } = await http.patch(`/admin/discounts/${id}/active`, { isActive })
  return data
}

export async function adminOverview({ from, to }={}) {
  const { data } = await http.get('/admin/reports/overview', { params: { from, to }})
  return data
}

export async function adminAuditLogs({ page=1, pageSize=50 }={}) {
  const { data } = await http.get('/admin/audit-logs', { params: { page, pageSize }})
  return data
}
