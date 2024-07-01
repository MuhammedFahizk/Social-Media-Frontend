import React from 'react'
import UserSignUpForm from '../component/UserSignUpForm'
import { Navigate } from 'react-router-dom';
import useAuthenticatedRedirect from '../../Admin/util/AuthenticatedRedirect';
const UserSignUpPage = () => {
  const { isTokenValid, isLoading } = useAuthenticatedRedirect();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Navigate to="/home" />;
  }

  return (
    <div className=" flex   flex-col md:flex-row  justify-end items-center h-screen ">
    <img className="absolute h-full w-full  object-cover " src="
    https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&"
    alt="" />
      <UserSignUpForm
 />
    <div className="h-full w-full absolute   bg-gradient-to-r from-[#000] via-[#000000a4] to-[#0000006d] ">
    </div>

  </div>
  )
}

export default UserSignUpPage