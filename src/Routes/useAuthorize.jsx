import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthorize = (roleProps) => {
  const { role } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    const checkRole = () => {
      if (role === null) {
        if (roleProps === 'admin') {
        navigate('/admin/login'); // Redirect to login if not logged in

        }else {

          navigate('/login'); // Redirect to login if not logged in
        }
        setIsAuthorized(false);
      } else if (role === roleProps) {
        
        setIsAuthorized(true);
      } else {
        if (roleProps === 'admin') {
          navigate('/');
  
          }else {
  
            navigate('/admin');
            // Redirect to login if not logged in
          }
        setIsAuthorized(false);
      }
      setLoading(false); // Set loading to false once check is complete
    };

    checkRole();
  }, [role, roleProps, navigate]);

  return { isAuthorized, loading };
};

export default useAuthorize;
