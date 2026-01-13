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
import Attendance from "./pages/student/Attendance";
import Leave from "./pages/student/Leave";
import Complaints from "./pages/student/Complaints";
import MessMenu from "./pages/student/MessMenu";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Analytics from "./pages/admin/Analytics";
import Rooms from "./pages/admin/Rooms";
import Students from "./pages/admin/Students";
import LeaveRequests from "./pages/admin/LeaveRequests";
import ComplaintsManagement from "./pages/admin/ComplaintsManagement";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'student' | 'admin' }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute allowedRole="student"><Attendance /></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute allowedRole="student"><Leave /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute allowedRole="student"><Complaints /></ProtectedRoute>} />
      <Route path="/mess-menu" element={<ProtectedRoute allowedRole="student"><MessMenu /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><Analytics /></ProtectedRoute>} />
      <Route path="/admin/rooms" element={<ProtectedRoute allowedRole="admin"><Rooms /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute allowedRole="admin"><Students /></ProtectedRoute>} />
      <Route path="/admin/leaves" element={<ProtectedRoute allowedRole="admin"><LeaveRequests /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="admin"><ComplaintsManagement /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

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
