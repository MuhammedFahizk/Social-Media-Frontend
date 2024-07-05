import React from 'react'
import { Input } from 'antd';
import { CiSearch } from "react-icons/ci";


const SearchBer = () => {
  return (
    <div className='flex items-center h-full'>
    <Input size="large" placeholder="Search .... " className= 'w-[400px] bg-[#f5f4f426] dark:bg-white hidden md:flex  '  prefix={<CiSearch />} />

    </div>
  )
}

export default SearchBer