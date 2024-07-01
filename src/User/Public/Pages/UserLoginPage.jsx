import UserLoginForm from "../component/UserLoginForm"

const UserLoginPage = () => {
  return (
    <div className=" md:flex  justify-end items-center h-screen ">
      <img className="absolute h-full w-full object-cover" src="
      https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&"
      alt="" />
      <div className="h-full w-full absolute hidden md:block  bg-gradient-to-r from-[#00000068]  to-current ">
      </div>
        <UserLoginForm />

    </div>
  )
}

export default UserLoginPage