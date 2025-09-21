
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

