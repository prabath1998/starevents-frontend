import http from './http'

export async function createOrder(payload) {
  const { data } = await http.post('/orders', payload)
  return data
}
export async function listMyOrders(page=1,pageSize=20) {
  const { data } = await http.get('/orders/me', { params:{ page, pageSize } })
  return data
}
export async function initiatePayment(orderId) {
  const { data } = await http.post(`/payments/${orderId}/initiate`)
  return data
}
