import LoginForm from "../Component/LoginForm";
import useAuthenticatedRedirect from "../../util/AuthenticatedRedirect";
import { Navigate } from "react-router-dom";

const AdminLoginPage = () => {
  const { isTokenValid, isLoading } = useAuthenticatedRedirect();

  if (isLoading) {
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
