import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/SideBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockComplaints } from "@/data/mockData";
import {
  Plus,
  Zap,
  Droplets,
  Armchair,
  Sparkles,
  HelpCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categoryIcons: Record<string, any> = {
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
    category: "",
    title: "",
    description: "",
    priority: "medium",
  });

  const myComplaints = mockComplaints.filter(
    (c) => c.studentId === user?.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint submitted!", {
      description: "The hostel admin will review your complaint shortly.",
    });
    setIsOpen(false);
    setFormData({
      category: "",
      title: "",
      description: "",
      priority: "medium",
    });
  };

  return (
    <div className="min-h-screen flex bg-[#1E1B4B] font-grotesque">
      
      {/* ✅ REUSABLE SIDEBAR (NO DUPLICATION) */}
      <Sidebar />

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bv.png')" }}
      >
        <div className="absolute inset-6 bg-white/90 rounded-xl border border-blue-500 p-10 overflow-y-auto">

          {/* ===== COMPLAINTS CONTENT (UNCHANGED FUNCTIONALITY) ===== */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 font-grotesque">Complaints</h1>
                <p className="text-muted-foreground font-grotesque">
                  Submit and track maintenance complaints
                </p>
              </div>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    New Complaint
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg font-grotesque">
                  <DialogHeader>
                    <DialogTitle>Submit a Complaint</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
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
                          onValueChange={(value) =>
                            setFormData({ ...formData, priority: value })
                          }
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
                      <Label>Title</Label>
                      <Input
                        placeholder="Brief summary of the issue"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="gradient"
                        className="flex-1"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Complaints List */}
            <div className="space-y-4">
              {myComplaints.map((complaint) => {
                const Icon = categoryIcons[complaint.category];
                return (
                  <div
                    key={complaint.id}
                    className="p-4 rounded-xl bg-secondary/50 border"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex gap-3">
                        <Icon className="text-primary" />
                        <div>
                          <p className="font-medium">{complaint.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {complaint.category}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={complaint.status} />
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {complaint.description}
                    </p>

                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Complaints;
