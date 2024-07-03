import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { adminLoginWithGoogle } from '../../../api/auth';
import { useDispatch } from "react-redux";
import { setTokens } from "../../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await adminLoginWithGoogle(credentialResponse);
      console.log('Login successful', response);
      dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken, isAdmin: true }));
      toast.update(toastId, { render: "Login successful", type: "success", isLoading: false, autoClose: 5000 });
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
      toast.update(toastId, { render: "Login failed: " + error.message, type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  const handleError = () => {
    console.log('Login Failed');
    toast.error("Login Failed");
  };

  return (
    <div>
       <GoogleLogin
       size='large'
       Shape='rectangular'
       width='300px'
       onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleLoginBtn;
