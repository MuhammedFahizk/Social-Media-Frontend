import React, { useEffect, useState, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateToken } from "../../Services/apiCalls";
import { updateAccessToken } from "../../Redux/AuthSlice"; // Ensure this is correctly imported from your Redux slice
import { Skeleton } from 'antd';

const ProtectedRoutesAdmin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken, refreshToken, isAdmin } = useSelector((state) => state.auth);
  console.log(isAdmin);
  const [isTokenValid, setIsTokenValid] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkToken = async () => {
      if (accessToken) {
        const { isValid, newAccessToken,  } = await validateToken(accessToken, refreshToken, isAdmin, 'admin');
        if (newAccessToken ) {
          // Update the new access token and refresh token in your Redux store
          dispatch(updateAccessToken({ accessToken: newAccessToken}));
        }
        setIsTokenValid(isValid);
      } else {
        setIsTokenValid(false);
      }
      setIsLoading(false); // Set loading to false after checking the token
    };

    checkToken();
  }, [accessToken, refreshToken, location, dispatch]);

  const renderContent = useMemo(() => {
    if (isLoading) {
      return <div>Loading...</div>; // Optionally, you can return a loading spinner here
    }

    if (!accessToken || !isTokenValid) {

      return <Navigate to="/admin/login" state={{ from: location }} />;
      
    }

    return <Outlet />;
  }, [isLoading, accessToken, isTokenValid, location]);

  return renderContent;
};

export default ProtectedRoutesAdmin;
