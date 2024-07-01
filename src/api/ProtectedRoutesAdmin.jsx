import React, { useEffect, useState, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { validateToken } from "../Services/apiCalls";
import { setTokens } from "../Redux/AuthSlice"; // Ensure this is correctly imported from your Redux slice

const ProtectedRoutesAdmin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isTokenValid, setIsTokenValid] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkToken = async () => {
      if (accessToken) {
        const { isValid, newAccessToken, newRefreshToken } = await validateToken(accessToken, refreshToken);
        if (newAccessToken && newRefreshToken) {
          // Update the new access token and refresh token in your Redux store
          dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
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
