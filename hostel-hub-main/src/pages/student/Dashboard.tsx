import React from "react";
import Sidebar from "@/components/SideBar";
import { useAuth } from "@/context/AuthContext";

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#3A2B8F] to-[#2E1A72] font-grotesque">
      
      {/* ✅ SHARED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="flex-1 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/bv.png')" }}
      >
        {/* White translucent container */}
        <div className="absolute inset-6 bg-white/90 rounded-xl border border-blue-500 p-10 flex flex-col">

          {/* Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-grotesque">
                Welcome, {user?.name}
              </h2>

              <p className="text-gray-600 text-base">
                Shri Shanta Sthanam
              </p>

              <div className="text-lg space-y-3 max-w-md">
                <p className="font-semibold">
                  Your hostel services, simplified!
                </p>
                <p className="text-gray-600">
                  Check today’s mess menu or submit and track complaints with just a click.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center">
              <img
                src="/public/bv.png"
                alt="Shri Shanta Hostel"
                className="rounded-xl object-cover max-h-[380px] shadow-xl"
              />
            </div>
          </div>

          {/* Bottom Note */}
          <p className="text-sm font-medium mt-8">
            Note:{" "}
            <span className="font-normal">
              Hostel gates close at 9:00 PM sharp.
            </span>
          </p>

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
