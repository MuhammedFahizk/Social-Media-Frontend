import React from "react";
import { Navigate } from "react-router-dom";
import useAuthenticatedRedirect from "../../util/AuthenticatedRedirect";
import LoginForm from "../Component/LoginForm";
import useAuthorize from "../../../Routes/useAuthorize";

const AdminLoginPage = () => {
  const { isTokenValid, loading: tokenLoading } = useAuthenticatedRedirect();
  const { isAuthorized, loading: authLoading } = useAuthorize('admin'); // Check for 'admin' role

  // Show loading indicator while checking authentication and authorization
  if (tokenLoading || authLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to admin dashboard if token is valid
  if (isTokenValid) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="p-10 flex md:h-screen h-screen sm:h-fit justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default AdminLoginPage;
