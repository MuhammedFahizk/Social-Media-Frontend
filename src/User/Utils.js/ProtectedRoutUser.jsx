import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { validateToken } from "../../Services/apiCalls";
import { updateAccessToken } from "../../Redux/AuthSlice";
const ProtectedRoutUser = () => {
    const location = useLocation()
    const dispatch  = useDispatch()
    const { accessToken, refreshToken } = useSelector((state) => state.auth);
    const [isTokenValid, setIsTokenValid] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    console.log(accessToken, refreshToken);
    
    useEffect(() => {
      const checkToken = async () => {
        if (accessToken) {
          const { isValid, newAccessToken } = await validateToken(accessToken, refreshToken);
          if (newAccessToken) {
            // Update the new access token and refresh token in your Redux store
            dispatch(updateAccessToken({ accessToken: newAccessToken,  }));
            console.log(newAccessToken, 'new');
          }
          setIsTokenValid(isValid);
        } else {
          setIsTokenValid(false);
        }
        setIsLoading(false); // Set loading to false after checking the token
      };
    checkToken()

    }, [accessToken, refreshToken, location, dispatch])

    const renderContent = useMemo(() => {
      if (isLoading) {
       return <div>Loading ....</div>; // Optionally, you can return a loading spinner here
      }
  
      if (!accessToken || !isTokenValid) {
  
        return <Navigate to="/login" state={{ from: location }} />;
        
      }
  
      return <Outlet />;
    }, [isLoading, accessToken, isTokenValid, location]);
  
  return renderContent
}

export default ProtectedRoutUser