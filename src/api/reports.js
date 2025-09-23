
import http from './http';

export const dlOrganizerSales = (params) =>
  http.get('/organizer/reports/sales.csv', { params, responseType: 'blob' });

export const dlOrganizerRevenue = (params) =>
  http.get('/organizer/reports/revenue.csv', { params, responseType: 'blob' });

export const dlAdminSales = (params) =>
  http.get('/admin/reports/sales.csv', { params, responseType: 'blob' });

export const dlAdminUsers = (params) =>
  http.get('/admin/reports/users.csv', { params, responseType: 'blob' });

export const dlAdminEvents = (params) =>
  http.get('/admin/reports/events.csv', { params, responseType: 'blob' });

export const dlAdminDiscounts = (params) =>
  http.get('/admin/reports/discounts.csv', { params, responseType: 'blob' });
