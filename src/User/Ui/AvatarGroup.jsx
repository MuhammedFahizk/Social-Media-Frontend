import { Avatar, Divider } from 'antd';
import React, { useState } from 'react';
import AvatarBtn from '../component/Avatar';
import { FaRegEye } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const AvatarGroup = ({ users }) => {
  const [open, setOpen] = useState(false);
  const handleAvatarClick = () => {
    setOpen(true);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  return (
    <>
     {users.userDetails?.length > 0 ? (

         
         <Avatar.Group
         size="small"
         max={{
          count: 3,
          style: {
              color: '#f56a00',
            backgroundColor: '#ffff',
          },
        }}
        >
        {users.userDetails?.map((item, index) => (
            <div
            key={index}
            onClick={handleAvatarClick}
            className="cursor-pointer"
            >
            <AvatarBtn image={item.profilePicture} spell={item.userName.charAt(0).toUpperCase()} />
          </div>
        ))}
      </Avatar.Group>
    ): (
        <FaRegEye 
        className="text-white cursor-pointer"
        onClick={handleAvatarClick}
      />
    )}
      
      {open && (
        <div className={`absolute h-[400px] w-full overflow-x-scroll no-scrollbar bg-white mb-10 text-black border-2 ${open ? 'slide-up' : 'slide-down'}`}>
          <div className='mx-5 flex  justify-between'>
  
            <h3>{users.userDetails.length} Views</h3>
          <IoCloseOutline 
          className=" right-2 cursor-pointer"
          onClick={handleCloseClick}
          />
          
          </div>
          <div>
            {
                users.userDetails.map((item, index) => (
                    <div key={index} className='m-4 flex gap-2 h-full items-center'>
                                    <AvatarBtn image={item.profilePicture} spell={item.userName.charAt(0).toUpperCase()} />
                                    <h3 className='text-sm'>{item.userName}</h3>
                                    <h3>{item.createdAt}</h3>
                    </div>
                ))
            }
          </div>
          </div>
        )}
        </>
  );
};

export default AvatarGroup;
