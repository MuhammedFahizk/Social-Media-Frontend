import React from 'react'
import HomeLeftSide from '../Ui/HomeLeftSide'
import { useSelector } from 'react-redux'
import CustomizePost from '../Ui/CustomizePost'
const AddPost = () => {
    const {user} = useSelector(state => state)
  return (
    <div className='grid md:grid-cols-9 p-2 -full '>
        <HomeLeftSide data={user} />
        <CustomizePost        />
    </div>
  )
}

export default AddPost