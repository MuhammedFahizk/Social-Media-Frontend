// src/Admin/util/AdminAuthorization.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthorize from './useAuthorize';

const AdminAuthorization = () => {
  const { isAuthorized, loading, isLoggedIn } = useAuthorize('admin');

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!isAuthorized) {
    return <Navigate to="/home" replace={true} />;
  }

  return <Outlet />;
};

export default AdminAuthorization;
