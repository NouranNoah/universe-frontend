import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

export default function DoctorOnlyRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user || user.type !== "doctor") {
    return <Navigate to="/doctor" replace />;
  }

  return children;
}
