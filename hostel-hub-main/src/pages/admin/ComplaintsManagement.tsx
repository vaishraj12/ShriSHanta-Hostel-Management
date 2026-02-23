import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockComplaints } from "@/data/mockData";
import { Complaint } from "@/types";
import { toast } from "sonner";

import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  LogOut,
  Zap,
  Droplets,
  Armchair,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle,
  Play,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categoryIcons: any = {
  electrical: Zap,
  plumbing: Droplets,
  furniture: Armchair,
  cleaning: Sparkles,
  other: HelpCircle,
};

const ComplaintsManagement: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleStatusUpdate = (
    id: string,
    newStatus: Complaint["status"]
  ) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              adminNotes: adminNotes || c.adminNotes,
              resolvedAt:
                newStatus === "resolved"
                  ? new Date().toISOString()
                  : undefined,
            }
          : c
      )
    );

    toast.success(`Complaint marked as ${newStatus}`);
    setSelectedComplaint(null);
    setAdminNotes("");
  };

  const stats = {
    pending: complaints.filter((c) => c.status === "pending").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#3A2B8F] to-[#2E1A72] font-grotesque">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 flex flex-col justify-between text-white bg-gradient-to-b from-[#2F2AA8] via-[#3A2B8F] to-[#5A3D8C]">
        <div>
          {/* Branding */}
          <div className="p-6 flex items-center gap-3">
            <img src="/public/bv logo cir.png" className="w-10 h-10" />
            <div className="text-xs">
              <p className="font-semibold">बनस्थली विद्यापीठ</p>
              <p className="opacity-90">Banasthali Vidyapith</p>
            </div>
          </div>

          {/* ShriShanta */}
          <div className="mx-4 mb-6 bg-[#3B2DA5] rounded-2xl p-6 flex items-center gap-4 shadow-lg">
            <Building2 className="w-7 h-7" />
            <div>
              <p className="text-lg font-bold">ShriShanta</p>
              <p className="text-sm opacity-80">
                Hostel Management System
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-6 space-y-6 text-sm">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-4 opacity-95"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>

            <Link
              to="/admin/complaints"
              className="flex items-center gap-4 opacity-95"
            >
              <MessageSquare className="w-5 h-5" />
              Complaints
            </Link>
          </nav>
        </div>

        {/* User */}
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
              {user?.name?.[0]}
            </div>
            <div className="text-xs">
              <p className="font-medium">{user?.name}</p>
              <p className="opacity-70">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm opacity-90"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bv.png')" }}
      >
        <div className="absolute inset-6 bg-white/90 rounded-xl border border-blue-500 p-8 overflow-y-auto">

          {/* Header */}
          <h1 className="text-3xl font-bold mb-2">
            Complaints Management
          </h1>
          <p className="text-gray-600 mb-6">
            Track and resolve student complaints efficiently
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Stat title="Pending" value={stats.pending} icon={Clock} />
            <Stat title="In Progress" value={stats.inProgress} icon={Play} />
            <Stat title="Resolved" value={stats.resolved} icon={CheckCircle} />
          </div>

          {/* Complaints List */}
          <div className="space-y-4">
            {complaints.map((complaint) => {
              const Icon = categoryIcons[complaint.category];
              return (
                <div
                  key={complaint.id}
                  className="p-4 rounded-xl bg-gray-50 border hover:border-gray-300 cursor-pointer"
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setAdminNotes(complaint.adminNotes || "");
                  }}
                >
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-semibold">
                          {complaint.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {complaint.studentName} • Room{" "}
                          {complaint.roomNumber}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ================= DIALOG ================= */}
      <Dialog
        open={!!selectedComplaint}
        onOpenChange={() => setSelectedComplaint(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Complaint</DialogTitle>
          </DialogHeader>

          {selectedComplaint && (
            <>
              <Textarea
                placeholder="Admin notes..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />

              <div className="flex gap-3 mt-4">
                {selectedComplaint.status === "pending" && (
                  <Button
                    onClick={() =>
                      handleStatusUpdate(
                        selectedComplaint.id,
                        "in-progress"
                      )
                    }
                  >
                    Start Progress
                  </Button>
                )}

                {selectedComplaint.status !== "resolved" && (
                  <Button
                    variant="success"
                    onClick={() =>
                      handleStatusUpdate(
                        selectedComplaint.id,
                        "resolved"
                      )
                    }
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Stat = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: any;
}) => (
  <div className="bg-blue-50 border rounded-xl p-6 text-center">
    <Icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
    <p className="text-3xl font-bold">{value}</p>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

export default ComplaintsManagement;
