import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // أو spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
