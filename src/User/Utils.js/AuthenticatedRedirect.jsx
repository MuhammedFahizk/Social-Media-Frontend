import React, { useEffect, useState } from 'react';
import { verifyUser } from '../auth/authUser';
import { useNavigate } from 'react-router-dom';

const useAuthenticatedRedirect = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyUser();
        console.log('Verification response:', res);
        setIsTokenValid(true);
      } catch (error) {
        console.error('Verification error:', error);
        console.log('Redirecting to Home due to error');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);

  return { isTokenValid, loading };
};

export default useAuthenticatedRedirect;
