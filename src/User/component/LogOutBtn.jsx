import React from 'react'
import { LogOutUser } from '../auth/authUser'
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
      <a target="_blank" className='text-red-500  hover:text-red-600'  onClick={logout} rel="noopener noreferrer" >
    Log Out
  </a>
    </div>
  )
}

export default LogOutBtn