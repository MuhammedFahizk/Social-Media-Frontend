import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserLoginForm from '../specific/UserLoginForm';
import UserLoginGoogle from '../specific/UserLoginGoogle';
import useAuthenticatedRedirect from '../Utils.js/AuthenticatedRedirect';
import useAuthorize from '../../Routes/useAuthorize';

const UserLoginPage = () => {
  const { isTokenValid, loading } = useAuthenticatedRedirect();
  const { isAuthorized, loading: authLoading } = useAuthorize('user'); // Check for 'admin' role

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="md:border-2 rounded-2xl border-blue-200 p-12 bg-[#2f2d2d0a] flex flex-col gap-3 justify-center">
        <UserLoginForm />
        <UserLoginGoogle />
      </div>
    </div>
  );
};

export default UserLoginPage;
