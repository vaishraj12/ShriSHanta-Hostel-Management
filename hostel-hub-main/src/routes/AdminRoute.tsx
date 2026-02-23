import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  // ❌ Not logged in OR not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Admin allowed
  return children;
};

export default AdminRoute;
