import React, { useEffect, useState } from 'react';
import { verifyUser } from '../auth/authUser';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../specific/NavBar';
import { toast } from 'react-toastify';
import useAuthorize from '../../Routes/useAuthorize';

const ProtectedRouteUser = () => {
  const { isAuthorized, loading: isAuthLoading } = useAuthorize('user'); // Check for 'user' role
  const [loading, setLoading] = useState(true); // State to track loading token verification
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser();
        console.log('Verification response:', res);
      } catch (error) {
        console.error('Error verifying user:', error);
        toast.error('Session expired, please log in again.'); // Notify user about the error
        navigate('/login', { state: { from: location.pathname } }); // Redirect to login
      } finally {
        setLoading(false);
      }
    };

    // Check token only if the user is authorized
    if (isAuthorized) {
      checkToken();
    } else {
      setLoading(false); // If not authorized, stop loading
    }
  }, [navigate, isAuthorized, location.pathname]);

  if (isAuthLoading || loading) {
    return <span className="loader"></span>
  }

  return (
    <div className='dark:bg-primary-dark min-h-screen h-full m-0 bg-primary-light dark:text-white'>
      <NavBar />
      <Outlet /> {/* Render nested routes here */}
    </div>
  );
};

export default ProtectedRouteUser;
