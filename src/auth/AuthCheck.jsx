import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function AuthCheck() {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}
