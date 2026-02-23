import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Wrench, Building2, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

const Login: React.FC = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("student@hostel.com"); // default test case
  const [password, setPassword] = useState("1234");          // default test case

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function from AuthContext

  const roles: { label: string; value: UserRole; icon: React.FC<any> }[] = [
  { label: "Student", value: "student", icon: User },
  { label: "Warden", value: "warden", icon: Building2 },
  { label: "Maintenance Dept.", value: "admin", icon: Wrench }, 
];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ use context login to set authenticated user
    const success = login(email, password, role);

    if (!success) {
      alert("Invalid credentials");
      return;
    }

    // ✅ navigate after successful login
    switch (role) {
      case "student":
        navigate("/dashboard");
        break;
      case "warden":
        navigate("/warden/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
    }
  };

  return (
    <div
      className="min-h-screen flex font-grotesque"
      style={{
        background: "linear-gradient(135deg, #0c0ab1 0%, #4709b3 50%, #8852e7 100%)",
      }}
    >
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 text-white">
        <div className="flex flex-col w-full px-16 py-12">
          <div className="flex items-center gap-3 mb-16">
            <img src="/bv logo cir.png" alt="Banasthali Vidyapith" className="w-12 h-12" />
            <div className="leading-tight">
              <p className="text-sm font-medium">वनस्थली विद्यापीठ</p>
              <p className="text-sm opacity-90">Banasthali Vidyapith</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-9 h-9 text-white" />
              <h1 className="text-5xl font-bold font-grotesque">ShriShanta</h1>
            </div>
            <h2 className="text-2xl font-semibold font-grotesque mb-8">
              Hostel Management System
            </h2>
            <p className="text-lg leading-relaxed opacity-90 max-w-xl">
              Shri Shanta streamlines hostel management with smart attendance, easy complaint tracking, and real-time updates.            </p>
          </div>

          <div className="flex justify-center mt-12">
            <img src="/bv.png" alt="Hostel" className="rounded-2xl shadow-2xl max-w-lg w-full" />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-grotesque mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* ROLE SELECTION */}
            <div className="flex gap-3 mb-6">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={cn( "flex-1 h-20 border rounded-xl flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all",
                        role === r.value
                        ? "border-[#5B2DAD] bg-[#F1ECFA] text-[#5B2DAD]" : "border-gray-200 hover:bg-gray-50" )}>
                      <Icon className="w-5 h-5" />
                      <span className="text-center leading-tight">
                       {r.label}
                        </span>
                        </button>

                );
              })}
            </div>

            <div>
              <Label>Email</Label>
              <Input
                placeholder="Enter your email"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-white"
              style={{ background: "linear-gradient(90deg, #201ec1 0%, #8852e7 120%)" }}
            >
              Sign In
            </Button>
          </form>
          {/* ADMIN LOGIN LINK */}
<div className="mt-8 pt-4 border-t border-gray-100 text-center">
  <p className="text-xs text-gray-400 mb-1">
    System access
  </p>
  <button
  type="button"
  onClick={() => navigate("/admin/login")}
  className="text-sm font-semibold text-[#5B2DAD] hover:underline">
  Admin Login
</button>

</div>

        </div>
      </div>
    </div>
  );
};

export default Login;
