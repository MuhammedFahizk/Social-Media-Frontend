import React from 'react'
import { LogOutUser } from '../auth/authUser'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/UserInformation'
const LogOutBtn = () => {

  const dispatch = useDispatch()
  const logout = async() => {
   try {
     const response = await LogOutUser() 
     console.log(response)

     window.location.reload()
     localStorage.clear()
     dispatch(logout())

   } catch (error) {
    console.log(error)

   }
  }
  return (
    <div>
      <hr />
      <button  className='text-red-500  hover:text-red-600'  onClick={logout}  >
   <h3>Log Out</h3>
  </button>
    </div>
  )
}

export default LogOutBtn