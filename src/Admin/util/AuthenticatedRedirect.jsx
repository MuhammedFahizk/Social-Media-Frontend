import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { validateToken } from "../../Services/apiCalls";
import { updateAccessToken } from "../../Redux/AuthSlice";

const useAuthenticatedRedirect = (role) => {
  console.log(role);
  const location = useLocation();
  const { accessToken, refreshToken, isAdmin } = useSelector((state) => state.auth);
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true); // Start loading

      if (accessToken) {
        const { isValid, newAccessToken,  } = await validateToken(accessToken, refreshToken, isAdmin, role);        
        if (newAccessToken) {
          dispatch(updateAccessToken({ accessToken: newAccessToken,  }));
        }
        if (isValid) {
          setIsTokenValid(true); // Token is valid
        } else {
          setIsTokenValid(false); // Token is invalid
        }
      } else {
        setIsTokenValid(false); // No token found
      }

      setIsLoading(false); // Stop loading
    };

    checkToken(); // Initial token check

  }, [accessToken, refreshToken, dispatch, location.pathname]);

  return { isTokenValid, isLoading };
};

export default useAuthenticatedRedirect;
