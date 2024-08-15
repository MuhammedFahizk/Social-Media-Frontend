import React, { useState, useEffect } from 'react';
import AvatarBtn from '../component/Avatar';
import { Link } from 'react-router-dom';
import { formatTimeDifference } from '../../Services/formatTimeDifference';
import { IoIosClose } from 'react-icons/io';

const Notification = ({ data, setNotifications }) => {


  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime(formatTimeDifference(data.time));
    }, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [data.time]);

  const handleRemoveNotification = () => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== data.id)
    );
  };

  return (
    <div className='flex h-full items-center gap-4 w-full dark:text-white'>
      <AvatarBtn image={data.image} />
      <div>
        <h3>
          <Link to={`/profile/${data.receivedId}`} className='text-text-primary'>
            {data.userName}
          </Link> 
          {` ${data.description}`}
        </h3>
        <h3 className="text-xs text-gray-500">{formatTimeDifference(data.time)}</h3>
      </div>
      <IoIosClose 
        className='text-2xl rounded-full hover:bg-text-gray border text-text-primary border-text-primary ms-auto' 
        onClick={handleRemoveNotification}
      />
    </div>
  );
};

export default Notification;
