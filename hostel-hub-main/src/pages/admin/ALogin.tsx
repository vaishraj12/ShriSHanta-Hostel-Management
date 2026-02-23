import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("admin@hostel.com"); // test
  const [password, setPassword] = useState("1234");       // test

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password, "admin");

    if (!success) {
      alert("Invalid admin credentials");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <div
      className="min-h-screen flex font-grotesque"
      style={{
        background: `
          linear-gradient(
            135deg,
            #1d0ab3 0%,
            #330ab1 25%,
            #3d09b3 45%,
            #6228c8 70%,
            #7941da 100%
          )
        `,
      }}
    >
      {/* ===== LEFT PANEL (IMAGE + INFO) ===== */}
      <div className="hidden lg:flex w-1/2 text-white px-12 py-10">
        <div className="flex flex-col w-full">
          
          {/* University Branding */}
          <div className="flex items-center gap-4 mb-10">
            <img
              src="/public/bv logo cir.png"
              alt="Banasthali Vidyapith"
              className="w-12 h-12 bg-white rounded-full p-1"
            />
            <div className="text-sm leading-tight font-grotesque">
              <p className="font-semibold">बनस्थली विद्यापीठ</p>
              <p className="opacity-90">Banasthali Vidyapith</p>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-9 h-9" />
              <h1 className="text-4xl font-bold tracking-tight font-grotesque">
                Admin Panel
              </h1>
            </div>

            <h2 className="text-xl font-semibold mb-4 tracking-wide font-grotesque">
              ShriShanta – Hostel Management System
            </h2>

            <p className="text-base opacity-90 max-w-lg mb-8 font-grotesque">
              Secure admin access to manage hostel operations, complaints,
              mess services, and student records.
            </p>

            {/* Photo */}
            <div className="max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="/public/bv.png"
                alt="Hostel Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL (LOGIN FORM) ===== */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Shield className="w-10 h-10 text-[#5B2DAD]" />
            </div>
            <h2 className="text-3xl font-bold mb-1 font-grotesque">
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm font-grotesque">
              Restricted system access
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Admin email"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Admin password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-white font-semibold font-grotesque"
              style={{
                background:
                  "linear-gradient(90deg, #3d09b3 0%, #7941da 100%)",
              }}
            >
              Sign In as Admin
            </Button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-sm text-gray-500 hover:text-primary transition text-center font-grotesque"
          >
            ← Back to main login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
