import { GoogleLogin } from '@react-oauth/google';
import { adminLoginWithGoogle } from '../../../api/auth';
import { useDispatch } from "react-redux";
import { setTokens } from "../../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await adminLoginWithGoogle(credentialResponse);
      console.log('Login successful', response);
      dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken, isAdmin: true }));
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginBtn;
