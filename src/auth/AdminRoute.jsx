import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { hasRole } from './AuthContext'

export default function AdminRoute() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!hasRole(user, 'Admin')) return <Navigate to="/" replace />
  return <Outlet />
}
