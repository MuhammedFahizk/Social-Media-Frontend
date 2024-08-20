import React from 'react'
import DropDown from "../component/DropDown";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoReport } from "react-icons/go";


const MoreOptionFeed = () => {
    const items = [
        {
            key: 1,
            label: (
                <div className='flex  h-full items-center gap-2'><FaRegEyeSlash/> <h3>Hide Post</h3></div>
            )
        },
        {
            key: 2,
            label: (
                <div className='flex  h-full items-center gap-2'><GoReport className='text-red-600'/> <h3 className='text-red-600'>Report Post</h3></div>
            )
        }
    ]
  return (
        <DropDown
            items={items}
            item={<IoEllipsisVerticalCircle className='text-xl '/>}
        />
  )
}

export default MoreOptionFeed