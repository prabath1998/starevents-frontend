import http from "./http";

export const listPublicDiscounts = (eventId) =>
  http.get(`/events/${eventId}/discounts`).then((r) => r.data);

export const applyDiscount = (orderId, code) =>
  http.post(`/orders/${orderId}/apply-discount`, { code }).then((r) => r.data);

export const removeDiscount = (orderId) =>
  http.delete(`/orders/${orderId}/discount`).then((r) => r.data);


export async function listDiscounts(eventId, params = {}) {
  const { page = 1, pageSize = 20, q, active } = params;
  const res = await http.get(`/admin/discounts/${eventId}/discounts`, {
    params: { page, pageSize, q, active },
  });
  return res.data; 
}

export const createDiscount = (eventId, payload) =>
  http.post(`/admin/discounts/${eventId}/discounts`, payload).then(r => r.data);

export const updateDiscount = (eventId, id, payload) =>
  http.put(`/admin/discounts/${eventId}/discounts/${id}`, payload).then(r => r.data);

export const deleteDiscount = (eventId, id) =>
  http.delete(`/admin/discounts/${eventId}/discounts/${id}`);
