import React from 'react'
import { LogOutUser } from '../auth/authUser'
import { Link } from 'react-router-dom'
const LogOutBtn = () => {
  const logout = async() => {
   try {
     const response = await LogOutUser() 
     console.log(response)
     window.location.reload()

   } catch (error) {
    console.log(error)

   }
  }
  return (
    <div>
      <hr />
      <Link target="_blank" className='text-red-500  hover:text-red-600'  onClick={logout} rel="noopener noreferrer" >
   <h3>Log Out</h3>
  </Link>
    </div>
  )
}

export default LogOutBtn