import React, { useState, useEffect } from 'react';
import UserSignUpForm from '../Ui/UserSignUpForm';
import { Navigate } from 'react-router-dom';
import useAuthenticatedRedirect from '../../Admin/util/AuthenticatedRedirect';
import { otpValidation } from '../auth/authUser';
import OtpVerificationForm from '../component/OtpVerificationForm';

const UserSignUpPage = () => {
  const { isTokenValid, isLoading } = useAuthenticatedRedirect();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userData, setUserData] = useState(null);
const [btnType, setBtnType] = useState(true)


  const onSubmit = async (data) => {
    console.log(data);
    try {
      setBtnType('')
      const response = await otpValidation(data);
      console.log(response);
      // Show the OTP form after successful sign-up
      setUserData(data); // Store user data
      setShowOtpForm(true);
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  useEffect(() => {

  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center   items-center h-screen">
      
      {!showOtpForm ? (
        <UserSignUpForm btnType={btnType} setBtnType={setBtnType} onSubmit={onSubmit} />
      ) : (
        <OtpVerificationForm userData={userData} />
      )}
    </div>
  );
};

export default UserSignUpPage;
