import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyAdmin } from '../../api/auth';
import AdminLayout from '../private/Component/AdminLayout';
const ProtectedRoutesAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyAdmin();
        console.log('Verification response:', res);
  
      } catch (error) {
        console.error('Verification error:', error);
        console.log('Redirecting to login due to error');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
  
    checkToken();
  }, [navigate]);
  

  if (loading) {
    return <p>Loading...</p>; // Return a loading indicator while verifying user
  }

  return (
    <><AdminLayout /></>)

  ; // Once loading is complete, render the protected route outlet
};

export default ProtectedRoutesAdmin;
