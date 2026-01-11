import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // لو مش عامل login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // لو الدور غير مسموح، حوّليه على صفحته
    if (user.role === "admin") return <Navigate to="/dashboard/dashboardAdmin" replace />;
    if (user.role === "professor") return <Navigate to="/doctor" replace />;
    if (user.role === "student") return <Navigate to="/student" replace />;
  }

  return children;
}
