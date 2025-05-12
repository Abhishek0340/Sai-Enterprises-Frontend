import { Navigate } from 'react-router-dom';
import { useAuth} from '../Context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAuth();

  return isAdminAuthenticated ? children : <Navigate to="/adminlogin" replace />;
};

export default ProtectedRoute;
