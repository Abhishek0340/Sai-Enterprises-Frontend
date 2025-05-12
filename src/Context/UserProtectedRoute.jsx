import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UserProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
