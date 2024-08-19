import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import AvatarBtn from '../../component/Avatar';
import { formatTimeDifference } from '../../../Services/formatTimeDifference';
import { Avatar, Menu } from 'antd';

export const Lists = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return null; // Return nothing if there are no notifications
  }

  const handleRemoveNotification = (id) => {
    // Implement the logic to remove notification
  };

  const renderNotificationMessage = () => {
    if (notifications.length === 1) {
      return (
        <>
          <AvatarBtn image={notifications[0].senderDetails.profilePicture} />
          <div>
            <Link
              to={`/profile/${notifications[0]?.notification.userId}`}
              className="text-text-primary"
            >
              <h3>{notifications[0].notification.message}</h3>
            </Link>
          </div>
        </>
      );
    } else if (notifications.length === 2) {
      return (
        <>
          <Avatar.Group>
            <Avatar size="small" src={notifications[0].senderDetails.profilePicture} />
            <Avatar size="small" src={notifications[1].senderDetails.profilePicture} />
          </Avatar.Group>
          <div>
            <Link
              to={`/profile/${notifications[0]?.notification.userId}`}
              className=""
            >
              <h3>
                <span className="dark:text-text-gray text-text-primary">
                  {notifications[0].senderDetails.userName}
                </span> 
                and 
                <span className="dark:text-text-gray text-text-primary">
                  {notifications[1].senderDetails.userName}
                </span> 
                liked your post
              </h3>
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Avatar.Group>
            <Avatar size="small" src={notifications[0].senderDetails.profilePicture} />
            <Avatar size="small" src={notifications[1].senderDetails.profilePicture} />
          </Avatar.Group>
          <div>
            <Link
              to={`/profile/${notifications[0]?.notification.userId}`}
              className=""
            >
              <h3>
                <span className="dark:text-text-gray text-text-primary">
                  {notifications[0].senderDetails.userName}
                </span>, 
                <span className="dark:text-text-gray text-text-primary">
                  {notifications[1].senderDetails.userName}
                </span>, 
                and others liked your post
              </h3>
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <Menu.Item
      key="notification-item"
      className="dark:bg-ternary-dark  dark:text-white text-black"
    >
      <div className="flex h-full items-center gap-4 w-full  dark:text-white">
        {renderNotificationMessage()}
        <h3 className="text-xs text-gray-500">
          {formatTimeDifference(notifications[0]?.notification.createdAt)}
        </h3>
        <IoIosClose
          className="text-2xl rounded-full hover:bg-text-gray border text-text-primary border-text-primary ms-auto"
          onClick={() => handleRemoveNotification(notifications[0]._id)}
        />
      </div>
    </Menu.Item>
  );
};
