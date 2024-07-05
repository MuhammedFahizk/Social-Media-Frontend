import { Navigate } from "react-router-dom";
import useAuthenticatedRedirect from "../../Admin/util/AuthenticatedRedirect";
import UserLoginForm from "../Ui/UserLoginForm"
import UserLoginGoogle from "../Ui/UserLoginGoogle";

const UserLoginPage = () => {
  const { isTokenValid, isLoading } = useAuthenticatedRedirect('user');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isTokenValid) {
    return <Navigate to="/home" />;
  }
  return (
    // <div className=" md:flex  justify-end items-center h-screen ">
    //   <img className="absolute h-full w-full object-cover" src="
    //   https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&"
    //   alt="" />
    //   <div className="h-full w-full absolute hidden md:block  bg-gradient-to-r from-[#00000068]  to-current ">
    //   </div>
    //   <div className=" grid grid-cols-1 gap-0">

    //     <UserLoginForm />
    //     <UserLoginGoogle />
    //   </div>

    // </div>
    
    <div className=" flex  h-screen items-center justify-center">
      <div className="md:border-2 rounded-2xl border-blue-200   p-12   bg-[#2f2d2d0a] flex flex-col gap-3 justify-center">
    

       <UserLoginForm />
     <UserLoginGoogle />
          
      </div>
    </div>
  )
}

export default UserLoginPage