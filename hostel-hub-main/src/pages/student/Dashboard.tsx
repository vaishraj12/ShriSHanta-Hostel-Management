import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/shared/StatCard';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import { mockComplaints, mockLeaveRequests, mockAttendance } from '@/data/mockData';
import {
  CalendarCheck,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const myComplaints = mockComplaints.filter(c => c.studentId === user?.id);
  const myLeaves = mockLeaveRequests.filter(l => l.studentId === user?.id);
  const recentAttendance = mockAttendance.slice(0, 5);
  
  const attendancePercentage = Math.round(
    (recentAttendance.filter(a => a.status === 'present').length / recentAttendance.length) * 100
  );

  const pendingComplaints = myComplaints.filter(c => c.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Room {user?.roomNumber} • {user?.hostelBlock}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attendance Rate"
            value={`${attendancePercentage}%`}
            icon={CalendarCheck}
            variant="success"
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Active Complaints"
            value={pendingComplaints}
            icon={MessageSquare}
            variant="primary"
          />
          <StatCard
            title="Leave Requests"
            value={myLeaves.length}
            icon={Calendar}
            variant="accent"
          />
          <StatCard
            title="Days Present"
            value={recentAttendance.filter(a => a.status === 'present').length}
            icon={CheckCircle}
            variant="default"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Attendance */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold">Recent Attendance</h2>
              <Link to="/attendance">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentAttendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    {record.status === 'present' ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : record.status === 'absent' ? (
                      <XCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <Clock className="w-5 h-5 text-warning" />
                    )}
                    <span className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          </div>

          {/* My Complaints */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold">My Complaints</h2>
              <Link to="/complaints">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            {myComplaints.length > 0 ? (
              <div className="space-y-3">
                {myComplaints.slice(0, 3).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{complaint.title}</h3>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <p className="text-xs text-muted-foreground capitalize mb-2">
                      {complaint.category} Issue
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No complaints submitted yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/attendance">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <CalendarCheck className="w-6 h-6" />
                <span>Mark Attendance</span>
              </Button>
            </Link>
            <Link to="/leave">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Calendar className="w-6 h-6" />
                <span>Apply Leave</span>
              </Button>
            </Link>
            <Link to="/complaints">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>New Complaint</span>
              </Button>
            </Link>
            <Link to="/mess-menu">
              <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                <Clock className="w-6 h-6" />
                <span>Mess Menu</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
