import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import Complaints from "./pages/student/Complaints";
import MessMenu from "./pages/student/MessMenu";

// Admin Pages
import AdminRoute from "@/routes/AdminRoute";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/ALogin";
import Analytics from "./pages/admin/Analytics";
import Rooms from "./pages/admin/Rooms";
import Students from "./pages/admin/Students";
import LeaveRequests from "./pages/admin/LeaveRequests";
import ComplaintsManagement from "./pages/admin/ComplaintsManagement";

// Warden Pages
import WardenDashboard from "./pages/warden/Dashboard";

const queryClient = new QueryClient();

// ------------------ Protected Route ------------------
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'student' | 'admin' | 'warden';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    // Redirect based on actual role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'warden':
        return <Navigate to="/warden/dashboard" replace />;
      case 'student':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// ------------------ Already Auth Redirect ------------------
const AlreadyAuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // redirect based on role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'warden':
        return <Navigate to="/warden/dashboard" replace />;
      case 'student':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

// ------------------ App Routes ------------------
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          <AlreadyAuthRedirect>
            <Login />
          </AlreadyAuthRedirect>
        }
      />

      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute allowedRole="student"><Complaints /></ProtectedRoute>} />
      <Route path="/mess-menu" element={<ProtectedRoute allowedRole="student"><MessMenu /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard"element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><Analytics /></ProtectedRoute>} />
      <Route path="/admin/rooms" element={<ProtectedRoute allowedRole="admin"><Rooms /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><Students /></ProtectedRoute>} />
      <Route path="/admin/leaves" element={<ProtectedRoute allowedRole="admin"><LeaveRequests /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="admin"><ComplaintsManagement /></ProtectedRoute>} />

      {/* Warden Routes */}
      <Route path="/warden/dashboard" element={<ProtectedRoute allowedRole="warden"><WardenDashboard /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// ------------------ App Component ------------------
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
