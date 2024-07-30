import React, { useEffect, useState } from 'react';
import { verifyUser } from '../auth/authUser';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import NavBar from '../Ui/NavBar';

const ProtectedRouteUser = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser();
        console.log('Verification response:', res);
      } catch (error) {
        console.error('Verification error:', error);
        console.log('Redirecting to login due to error');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate, location.pathname]); // Add location.pathname as a dependency

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='dark:bg-primary-dark  min-h-screen h-full m-0  bg-primary-light dark:text-white'>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default ProtectedRouteUser;
