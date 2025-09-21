import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EventsList from "./pages/EventsList.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrganizerEvents from "./pages/OrganizerEvents.jsx";
import OrganizerEventCreate from "./pages/OrganizerEventCreate.jsx";
import OrganizerTicketTypes from "./pages/OrganizerTicketTypes.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import AuthCheck from "./auth/AuthCheck.jsx";
import OrganizerRoute from "./auth/OrganizerRoute.jsx";
import AdminRoute from "./auth/AdminRoute.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminEvents from "./pages/admin/AdminEvents.jsx";
import AdminDiscounts from "./pages/admin/AdminDiscounts.jsx";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs.jsx";
import OrganizerScan from "./pages/OrganizerScan.jsx";
import DiscountsPage from "./pages/organizer/Discounts";

import MyTickets from "./pages/MyTickets.jsx";
import Reports from "./pages/Reports.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import CheckoutCancel from "./pages/CheckoutCancel.jsx";
import Profile from "./pages/Profile.jsx";

export default function RoutesView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventsList />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route element={<OrganizerRoute />}>
        <Route path="/organizer" element={<OrganizerEvents />} />
        <Route path="/organizer/create" element={<OrganizerEventCreate />} />
        <Route
          path="/organizer/:id/ticket-types"
          element={<OrganizerTicketTypes />}
        />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route element={<AuthCheck />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
      
      <Route element={<OrganizerRoute />}>
        <Route path="/organizer/scan" element={<OrganizerScan />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/discounts" element={<AdminDiscounts />} />
        <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/me/tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/events/:eventId/discounts" element={<DiscountsPage />} />

      <Route path="/payment/success" element={<CheckoutSuccess />} />

      <Route path="/payment/cancel" element={<CheckoutCancel />} />
    </Routes>
  );
}
