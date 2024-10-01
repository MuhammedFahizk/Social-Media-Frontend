import React, { useState, useEffect } from 'react';
import AvatarBtn from '../../component/Avatar';
import { Link } from 'react-router-dom';
import { formatTimeDifference } from '../../../Services/formatTimeDifference';
import { IoIosClose } from 'react-icons/io';

const Notification = ({ data, setNotifications }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime(formatTimeDifference(data.notification.createdAt));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [data?.notification.createdAt]);
  

  return (
    <div className='flex h-full items-center gap-4 w-full  dark:text-white'>
      <AvatarBtn  image={data.senderDetails.profilePicture} />
      <div>
          <Link to={`/profile/${data?.notification.userId}`} className='text-text-primary'>
        <h3>
          {` ${data?.notification.message}`}
        </h3>
          </Link> 
        <h3 className="text-xs text-gray-500">{formatTimeDifference(data?.notification.createdAt)}</h3>
      </div>
      {
        data.notification?.postImage && (
          <Link className='ms-auto' >
             <img
              src={data.notification.postImage}
                className="text-2xl  object-cover rounded-lg hover:bg-text-gray border size-14 text-text-primary border-text-primary ms-auto"
              />
             </Link>
        )
      }
    </div>
  );
};

export default Notification;
