import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
export const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flexGrow: 1, padding: "20px" }}>
        <h2>Admin Dashboard</h2>
        <Outlet />
      </div>
    </div>
  );
};
