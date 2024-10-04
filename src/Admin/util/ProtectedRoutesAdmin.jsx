import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { verifyAdmin } from '../api/auth';
import AdminLayout from '../private/Component/AdminLayout';
import useAuthorize from '../../Routes/useAuthorize';

const ProtectedRoutesAdmin = () => {
  const navigate = useNavigate();
  const { isAuthorized, loading } = useAuthorize('admin'); // Check for 'admin' role

  const [tokenLoading, setTokenLoading] = useState(true); // State to track loading token verification

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyAdmin();
        console.log('Verification response:', res);
      } catch (error) {
        console.error('Verification error:', error);
        console.log('Redirecting to admin login due to error');
        navigate('/admin/login'); // Redirect to admin login on failure
      } finally {
        setTokenLoading(false); // Stop loading after the check
      }
    };

    // Only check the token if the user is authorized
    if (isAuthorized) {
      checkToken();
    } else {
      setTokenLoading(false); // If not authorized, don't wait for token verification
    }
  }, [navigate, isAuthorized]);

  if (loading || tokenLoading) {
    return <span className="loader"></span>  }

  return (
    <AdminLayout>
      <Outlet /> {/* Render nested routes here */}
    </AdminLayout>
  ); // Render the admin layout if everything is valid
};

export default ProtectedRoutesAdmin;
