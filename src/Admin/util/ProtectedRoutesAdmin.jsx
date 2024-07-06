import React, { useEffect, useState, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { validateToken } from "../../Services/apiCalls"; // Ensure this is correctly imported
import { generateAdminAccessToken } from "../../api/auth";
const ProtectedRoutesAdmin = () => {
  const location = useLocation();
  const [isTokenValid, setIsTokenValid] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkToken = async () => {
      console.log("All cookies:", Cookies.get());

      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      console.log(refreshToken, accessToken);
      if (accessToken) {
        try {
          const response = await validateToken(accessToken);
          if (response.isValid) {
            setIsTokenValid(true);
          } else if (refreshToken) {
            const newAccessToken = await generateAdminAccessToken(refreshToken);
            if (newAccessToken) {
              Cookies.set('accessToken', newAccessToken);
              setIsTokenValid(true);
            } else {
              setIsTokenValid(false);
            }
          } else {
            setIsTokenValid(false);
          }
        } catch (error) {
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
      setIsLoading(false); // Set loading to false after checking the token
    };

    checkToken();
  }, []); 

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>; // Optionally, you can return a loading spinner here
    }

    if (!Cookies.get('accessToken') || !isTokenValid) {
      return <Navigate to="/admin/login" state={{ from: location }} />;
    }

    return <Outlet />;
  }, [isLoading, isTokenValid, location]);

  return renderContent;
};

export default ProtectedRoutesAdmin;
