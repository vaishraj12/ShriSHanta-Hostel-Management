import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  CalendarCheck,
  Calendar,
  MessageSquare,
  UtensilsCrossed,
  Users,
  Building,
  ClipboardList,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const studentNavItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
  { icon: Calendar, label: 'Apply Leave', path: '/leave' },
  { icon: MessageSquare, label: 'Complaints', path: '/complaints' },
  { icon: UtensilsCrossed, label: 'Mess Menu', path: '/mess-menu' },
];

const adminNavItems = [
  { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Building, label: 'Rooms', path: '/admin/rooms' },
  { icon: Users, label: 'Students', path: '/admin/students' },
  { icon: Calendar, label: 'Leave Requests', path: '/admin/leaves' },
  { icon: ClipboardList, label: 'Complaints', path: '/admin/complaints' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = user?.role === 'admin' ? adminNavItems : studentNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg">HostelHub</h1>
                <p className="text-xs text-sidebar-muted capitalize">{user?.role} Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={onToggle}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn("nav-link", isActive && "nav-link-active")}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-muted truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent mt-2"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden bg-card shadow-md"
        onClick={onToggle}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
};
