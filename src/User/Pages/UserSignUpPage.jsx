import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import UserSignUpForm from '../Ui/UserSignUpForm';
import { otpValidation } from '../auth/authUser';
import OtpVerificationForm from '../component/OtpVerificationForm';
import useAuthenticatedRedirect from '../Utils.js/AuthenticatedRedirect';

const UserSignUpPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [btnType, setBtnType] = useState(true);
  const [toastId, setToastId] = useState(null); // State to manage toast ID

  const { isTokenValid, loading } = useAuthenticatedRedirect();

  // Toast notifications
  const notifyLoading = () => {
    toast.dismiss(); // Dismiss any existing toast
    const id = toast.info('Loading...');
    setToastId(id);
  };



  const notifyError = (errorMessage) => {
    toast.dismiss(); // Dismiss any existing toast
    const id = toast.error(errorMessage);
    setToastId(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Navigate to="/home" />;
  }

  const onSubmit = async (data) => {
    console.log(data);
    notifyLoading(); // Notify loading state

    try {
      setBtnType(false); // Assuming btnType controls a button state like loading spinner
      const response = await otpValidation(data);
      console.log(response);
      setUserData(data); // Store user data
      setShowOtpForm(true); // Show the OTP form after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      notifyError(`ign-up failed. ${error.message}`); // Notify error
    } finally {
      setBtnType(true); // Reset button state
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      {!showOtpForm ? (
        <UserSignUpForm btnType={btnType} setBtnType={setBtnType} onSubmit={onSubmit} />
      ) : (
        <OtpVerificationForm userData={userData} />
      )}
    </div>
  );
};

export default UserSignUpPage;
