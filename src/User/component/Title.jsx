import React from 'react'
import { Link } from 'react-router-dom'
const Title = () => {
  return (
    <div className='  h-full  flex items-center '>
       <Link to={'/'}>
       <h1 className=''>React</h1>
       </Link>
    </div>
  )
}

export default Title