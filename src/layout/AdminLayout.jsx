import React from "react";
import AdminHeader from "../components/Header/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader /> {/* Always visible */}
      <main className="">
        <Outlet /> {/* Nested route content */}
      </main>
    </div>
  );
};

export default AdminLayout;