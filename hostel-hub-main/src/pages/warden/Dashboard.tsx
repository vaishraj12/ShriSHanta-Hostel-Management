import React from "react";

const WardenDashboard: React.FC = () => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Warden Dashboard</h1>
      <p className="text-gray-600">
        Welcome, Warden! Here you can manage hostel blocks, monitor student attendance, 
        review leave requests, and handle complaints.
      </p>

      {/* Example cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">Attendance</h2>
          <p>View and monitor student attendance for your hostel blocks.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">Leave Requests</h2>
          <p>Approve or reject student leave requests.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">Complaints</h2>
          <p>View and manage complaints submitted by students.</p>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
