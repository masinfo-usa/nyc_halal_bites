import { Navigate, useLocation } from "react-router-dom";

const isTokenValid = () => {
  const token = sessionStorage.getItem("staffToken");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isTokenValid()) {
    return <Navigate to="/staff/login" state={{ from: location.pathname }} replace />;
  }
  return children;
};

export default ProtectedRoute;
