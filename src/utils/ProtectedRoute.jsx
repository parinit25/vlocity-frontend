import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isPublicPath = location.pathname === "/login" || location.pathname === "/signup";

  if (!user && !isPublicPath) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;