import React, { useEffect, useState } from 'react';
import { verifyUser } from '../auth/authUser';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRouteUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State to track loading state

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
  }, [navigate]);
  

  if (loading) {
    return <p>Loading...</p>; // Return a loading indicator while verifying user
  }

  return <Outlet />

  ; // Once loading is complete, render the protected route outlet
};

export default ProtectedRouteUser;
