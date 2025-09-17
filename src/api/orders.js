import http from "./http";

export async function createOrder(payload) {
  const { data } = await http.post("/orders", payload);
  return data;
}
export async function listMyOrders(page = 1, pageSize = 20) {
  const { data } = await http.get("/orders/me", { params: { page, pageSize } });
  return data;
}
export async function initiatePayment(orderId) {
  const { data } = await http.post(`/payments/${orderId}/initiate`);
  return data;
}

export async function dummyConfirm(orderId) {
  const { data } = await http.post(`/payments/${orderId}/dummy-confirm`);
  return data;
}

export async function applyDiscount(orderId, code) {
  const { data } = await http.post(`/orders/${orderId}/apply-discount`, {
    code,
  });
  return data; 
}
export async function removeDiscount(orderId) {
  const { data } = await http.delete(`/orders/${orderId}/discount`);
  return data; 
}
