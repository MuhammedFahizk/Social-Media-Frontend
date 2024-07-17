import React from "react";
import { Navigate } from "react-router-dom";
import useAuthenticatedRedirect from "../../util/AuthenticatedRedirect";
import LoginForm from "../Component/LoginForm";
const AdminLoginPage = () => {
  const { isTokenValid, loading } = useAuthenticatedRedirect();

  if (loading) {
    return <div>Loading...</div>;
  }

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
