import React from "react";
import { Sidebar } from "../specific/Settings/Sidebar";
import { Outlet } from "react-router-dom";
import EditPassword from "../specific/Settings/EditPassword";
import EditProfileForm from "../specific/Settings/EditProfileForm!";

const EditProfile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 shadow-lg w-full">
      <Sidebar />
      <main className="col-span-3">
        <Outlet /> {/* Render nested routes here */}
      </main>
    </div>
  );
};

export default EditProfile;
