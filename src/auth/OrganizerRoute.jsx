import { Navigate, Outlet } from 'react-router-dom'
import { useAuth, hasRole } from './AuthContext'

export default function OrganizerRoute() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return hasRole(user, 'Organizer') ? <Outlet/> : <Navigate to="/" replace />
}
