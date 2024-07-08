import React from "react";
import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLoginWithGoogle } from "../auth/authUser";

const UserLoginGoogle = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await userLoginWithGoogle(credentialResponse);
      console.log("Login successful", response);
     
      toast.update(toastId, {
        render: "Login successful",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      toast.update(toastId, {
        render: "Login failed: " + error.message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleError = () => {
    console.log("Login Failed");
    toast.error("Login Failed");
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
      size='large'
      Shape='rectangular'
      width='260px'
      className='w-[370px]'
      onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default UserLoginGoogle;
