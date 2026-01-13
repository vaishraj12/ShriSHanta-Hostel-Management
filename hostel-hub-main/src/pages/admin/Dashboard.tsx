import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import { mockComplaints, mockLeaveRequests } from '@/data/mockData';
import {
  Users,
  Building,
  MessageSquare,
  Calendar,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const pendingLeaves = mockLeaveRequests.filter(l => l.status === 'pending');
  const pendingComplaints = mockComplaints.filter(c => c.status === 'pending');
  const highPriorityComplaints = mockComplaints.filter(c => c.priority === 'high' && c.status !== 'resolved');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-display font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here's an overview of your hostel.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={124}
            icon={Users}
            variant="primary"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Occupied Rooms"
            value="48/52"
            icon={Building}
            variant="success"
          />
          <StatCard
            title="Pending Complaints"
            value={pendingComplaints.length}
            icon={MessageSquare}
            variant="accent"
          />
          <StatCard
            title="Leave Requests"
            value={pendingLeaves.length}
            icon={Calendar}
            variant="default"
          />
        </div>

        {/* Alerts Section */}
        {highPriorityComplaints.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-4 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-destructive">High Priority Alerts</p>
              <p className="text-sm text-muted-foreground">
                {highPriorityComplaints.length} complaint(s) require immediate attention
              </p>
            </div>
            <Link to="/admin/complaints">
              <Button variant="destructive" size="sm">
                View Now
              </Button>
            </Link>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Leave Requests */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold">Pending Leave Requests</h2>
              <Link to="/admin/leaves">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            {pendingLeaves.length > 0 ? (
              <div className="space-y-3">
                {pendingLeaves.slice(0, 3).map((leave) => (
                  <div
                    key={leave.id}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{leave.studentName}</p>
                        <p className="text-sm text-muted-foreground">Room {leave.roomNumber}</p>
                      </div>
                      <StatusBadge status={leave.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending leave requests</p>
              </div>
            )}
          </div>

          {/* Recent Complaints */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold">Recent Complaints</h2>
              <Link to="/admin/complaints">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            {mockComplaints.length > 0 ? (
              <div className="space-y-3">
                {mockComplaints.slice(0, 3).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{complaint.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {complaint.category} • Room {complaint.roomNumber}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status={complaint.status} />
                        {complaint.priority === 'high' && (
                          <span className="text-xs text-destructive">High Priority</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No complaints to show</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-display font-semibold">This Week's Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-display font-bold text-success">95%</p>
              <p className="text-sm text-muted-foreground">Average Attendance</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-display font-bold">12</p>
              <p className="text-sm text-muted-foreground">New Complaints</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-display font-bold text-success">8</p>
              <p className="text-sm text-muted-foreground">Resolved Issues</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-display font-bold">5</p>
              <p className="text-sm text-muted-foreground">Leave Approvals</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
