import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockComplaints } from '@/data/mockData';
import {
  MessageSquare,
  Zap,
  Droplets,
  Armchair,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle,
  Play,
} from 'lucide-react';
import { toast } from 'sonner';
import { Complaint } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const categoryIcons = {
  electrical: Zap,
  plumbing: Droplets,
  furniture: Armchair,
  cleaning: Sparkles,
  other: HelpCircle,
};

const ComplaintsManagement: React.FC = () => {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const handleStatusUpdate = (id: string, newStatus: Complaint['status']) => {
    setComplaints(complaints.map(c =>
      c.id === id ? { 
        ...c, 
        status: newStatus, 
        adminNotes: adminNotes || c.adminNotes,
        resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : undefined
      } : c
    ));
    toast.success(`Complaint marked as ${newStatus}`);
    setSelectedComplaint(null);
    setAdminNotes('');
  };

  const stats = {
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-display font-bold mb-2">Complaints Management</h1>
          <p className="text-muted-foreground">Track and resolve student complaints</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-warning/10 rounded-xl p-6 text-center border border-warning/20">
            <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-3xl font-display font-bold text-warning">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-6 text-center border border-primary/20">
            <Play className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-3xl font-display font-bold text-primary">{stats.inProgress}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-success/10 rounded-xl p-6 text-center border border-success/20">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-3xl font-display font-bold text-success">{stats.resolved}</p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-display font-semibold mb-6">All Complaints</h2>
          <div className="space-y-4">
            {complaints.map((complaint) => {
              const Icon = categoryIcons[complaint.category];
              return (
                <div
                  key={complaint.id}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-border transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setAdminNotes(complaint.adminNotes || '');
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        complaint.priority === 'high' 
                          ? 'bg-destructive/20' 
                          : complaint.priority === 'medium'
                          ? 'bg-warning/20'
                          : 'bg-secondary'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          complaint.priority === 'high' 
                            ? 'text-destructive' 
                            : complaint.priority === 'medium'
                            ? 'text-warning'
                            : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{complaint.title}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            complaint.priority === 'high' 
                              ? 'bg-destructive/15 text-destructive' 
                              : complaint.priority === 'medium'
                              ? 'bg-warning/15 text-warning'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {complaint.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {complaint.studentName} • Room {complaint.roomNumber} • {complaint.category}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{complaint.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-16 md:ml-0">
                      <StatusBadge status={complaint.status} />
                    </div>
                  </div>
                  {complaint.adminNotes && (
                    <div className="mt-3 ml-16 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-medium text-primary mb-1">Admin Note:</p>
                      <p className="text-sm">{complaint.adminNotes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Update Dialog */}
        <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Update Complaint Status</DialogTitle>
            </DialogHeader>
            {selectedComplaint && (
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="font-medium">{selectedComplaint.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedComplaint.studentName} • Room {selectedComplaint.roomNumber}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Notes</label>
                  <Textarea
                    placeholder="Add notes about the resolution..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  {selectedComplaint.status === 'pending' && (
                    <Button
                      className="flex-1"
                      onClick={() => handleStatusUpdate(selectedComplaint.id, 'in-progress')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Progress
                    </Button>
                  )}
                  {selectedComplaint.status !== 'resolved' && (
                    <Button
                      variant="success"
                      className="flex-1"
                      onClick={() => handleStatusUpdate(selectedComplaint.id, 'resolved')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintsManagement;
