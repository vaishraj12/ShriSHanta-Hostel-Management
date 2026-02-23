import React from 'react';
import { StatCard } from '@/components/shared/StatCard';
import {
  Users,
  Building,
  MessageSquare,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const attendanceData = [
  { day: 'Mon', present: 118, absent: 6 },
  { day: 'Tue', present: 120, absent: 4 },
  { day: 'Wed', present: 115, absent: 9 },
  { day: 'Thu', present: 122, absent: 2 },
  { day: 'Fri', present: 119, absent: 5 },
  { day: 'Sat', present: 110, absent: 14 },
  { day: 'Sun', present: 105, absent: 19 },
];

const complaintData = [
  { name: 'Electrical', value: 35, color: 'hsl(234, 89%, 54%)' },
  { name: 'Plumbing', value: 28, color: 'hsl(38, 92%, 50%)' },
  { name: 'Furniture', value: 18, color: 'hsl(142, 71%, 45%)' },
  { name: 'Cleaning', value: 12, color: 'hsl(0, 84%, 60%)' },
  { name: 'Other', value: 7, color: 'hsl(220, 9%, 46%)' },
];

const resolutionTrend = [
  { week: 'Week 1', resolved: 12, pending: 8 },
  { week: 'Week 2', resolved: 15, pending: 6 },
  { week: 'Week 3', resolved: 18, pending: 4 },
  { week: 'Week 4', resolved: 22, pending: 3 },
];

const Analytics: React.FC = () => {
  return (
      <div className="space-y-8">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-display font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Hostel performance insights and statistics</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value={124}
            icon={Users}
            variant="primary"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Avg. Attendance"
            value="95%"
            icon={CheckCircle}
            variant="success"
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Open Complaints"
            value={7}
            icon={AlertTriangle}
            variant="warning"
            trend={{ value: 15, isPositive: false }}
          />
          <StatCard
            title="Avg. Resolution"
            value="2.3 days"
            icon={Clock}
            variant="default"
            trend={{ value: 10, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <h2 className="text-lg font-display font-semibold mb-6">Weekly Attendance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Complaint Categories */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <h2 className="text-lg font-display font-semibold mb-6">Complaints by Category</h2>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complaintData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {complaintData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {complaintData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resolution Trend */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-display font-semibold mb-6">Resolution Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))' }}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="hsl(var(--warning))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--warning))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-sm text-muted-foreground">Resolved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-sm text-muted-foreground">Pending</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Analytics;
