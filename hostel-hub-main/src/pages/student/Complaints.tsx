import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockComplaints } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { MessageSquare, Plus, Zap, Droplets, Armchair, Sparkles, HelpCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const categoryIcons = {
  electrical: Zap,
  plumbing: Droplets,
  furniture: Armchair,
  cleaning: Sparkles,
  other: HelpCircle,
};

const Complaints: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    priority: 'medium',
  });

  const myComplaints = mockComplaints.filter(c => c.studentId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Complaint submitted!', {
      description: 'The hostel admin will review your complaint shortly.',
    });
    setIsOpen(false);
    setFormData({ category: '', title: '', description: '', priority: 'medium' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Complaints</h1>
            <p className="text-muted-foreground">Submit and track maintenance complaints</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                New Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display">Submit a Complaint</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of the issue"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="gradient" className="flex-1">
                    Submit Complaint
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-warning/10 rounded-xl p-6 text-center border border-warning/20">
            <p className="text-3xl font-display font-bold text-warning">
              {mockComplaints.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-6 text-center border border-primary/20">
            <p className="text-3xl font-display font-bold text-primary">
              {mockComplaints.filter(c => c.status === 'in-progress').length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-success/10 rounded-xl p-6 text-center border border-success/20">
            <p className="text-3xl font-display font-bold text-success">
              {mockComplaints.filter(c => c.status === 'resolved').length}
            </p>
            <p className="text-sm text-muted-foreground">Resolved</p>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h2 className="text-lg font-display font-semibold mb-6">All Complaints</h2>
          <div className="space-y-4">
            {mockComplaints.map((complaint) => {
              const Icon = categoryIcons[complaint.category];
              return (
                <div
                  key={complaint.id}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{complaint.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {complaint.category} • {complaint.studentName} • Room {complaint.roomNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <StatusBadge status={complaint.status} />
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        complaint.priority === 'high' 
                          ? 'bg-destructive/15 text-destructive' 
                          : complaint.priority === 'medium'
                          ? 'bg-warning/15 text-warning'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {complaint.priority} priority
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Submitted on {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  {complaint.adminNotes && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="text-xs font-medium text-primary mb-1">Admin Note:</p>
                      <p className="text-sm">{complaint.adminNotes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Complaints;
