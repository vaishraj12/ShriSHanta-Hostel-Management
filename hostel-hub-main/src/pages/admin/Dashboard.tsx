import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  Users,
  ShieldCheck,
  Wrench,
  LogOut,
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#3A2B8F] to-[#2E1A72] font-grotesque">
      
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between text-white bg-gradient-to-b from-[#2F2AA8] via-[#3A2B8F] to-[#5A3D8C]">
        <div>
          {/* Branding */}
          <div className="p-6 flex items-center gap-3">
            <img
              src="/public/bv logo cir.png"
              className="w-10 h-10"
              alt="Banasthali"
            />
            <div className="text-xs ">
              <p className="font-semibold">बनस्थली विद्यापीठ</p>
              <p className="opacity-90">Banasthali Vidyapith</p>
            </div>
          </div>

          {/* ShriShanta Block */}
          <div className="mx-4 mb-6 bg-[#3B2DA5] rounded-2xl p-6 flex items-center gap-4 shadow-lg ">
            <Building2 className="w-7 h-7 text-white" />
            <div>
              <p className="text-lg font-bold">ShriShanta</p>
              <p className="text-sm opacity-80">Hostel Management System</p>
            </div>
          </div>

          {/* ONLY 3 OPTIONS */}
          <nav className="px-6 space-y-6 text-sm">
            <Link to="/admin/students" className="flex items-center gap-4 opacity-95">
              <Users className="w-5 h-5" />
              Students
            </Link>

            <Link to="/admin/warden" className="flex items-center gap-4 opacity-95">
              <ShieldCheck className="w-5 h-5" />
              Warden
            </Link>

            <Link to="/admin/maintenance" className="flex items-center gap-4 opacity-95">
              <Wrench className="w-5 h-5" />
              Maintenance Department
            </Link>
          </nav>
        </div>

        {/* Bottom User */}
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
              {user?.name?.[0]}
            </div>
            <div className="text-xs">
              <p className="font-medium">{user?.name}</p>
              <p className="opacity-70 break-all">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm opacity-90 hover:opacity-100"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bv.png')" }}
      >
        {/* White Container */}
        <div className="absolute inset-6 bg-white/90 rounded-xl border border-blue-500 p-10 flex flex-col">

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-grotesque">
                Welcome, {user?.name}
              </h2>

              <p className="text-gray-600 font-grotesque">
                Admin Control Panel
              </p>

              <div className="text-lg space-y-3 max-w-md">
                <p className="font-semibold font-grotesque">
                  Manage hostel operations efficiently.
                </p>
                <p className="text-gray-600 font-grotesque">
                  Oversee students, coordinate with wardens, and monitor maintenance activities from one place.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center">
              <img
                src="/public/bv.png"
                className="rounded-xl object-cover max-h-[380px] shadow-xl"
                alt="Hostel"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
