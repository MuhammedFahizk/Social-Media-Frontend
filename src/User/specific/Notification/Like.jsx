import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from 'antd';
import AvatarBtn from '../../component/Avatar';
import { formatTimeDifference } from '../../../Services/formatTimeDifference';

const Like = ({ notifications }) => {
  const separatePost = notifications.reduce((result, notification) => {
    const key = notification.notification.postId;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(notification);
    return result;
  }, {});

  return (
    <Menu.Item className='flex flex-col dark:bg-ternary-dark bg-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-dark'>
      {Object.entries(separatePost).map(([postId, eachPost], index) => (
        <div key={index} className='my-2'>
          <div className="flex h-full items-center gap-4 w-full dark:text-white">
            {eachPost.length === 1 ? (
              <>
                <AvatarBtn image={eachPost[0].senderDetails.profilePicture} />
                <div>
                  <Link
                    to={`/profile/${eachPost[0]?.notification.senderId}`}
                    className="text-text-primary dark:text-text-gray"
                  >
                    <h3>{eachPost[0].senderDetails.userName} Liked Your Post</h3>
                  </Link>
                  <h3 className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeDifference(eachPost[0]?.notification.createdAt)}
                  </h3>
                </div>
                <Link className='ml-auto'>
                  <img
                    src={eachPost[0].senderDetails.postImage}
                    className="text-2xl object-cover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 border size-14 text-text-primary border-text-primary ml-auto"
                  />
                </Link>
              </>
            ) : eachPost.length === 2 ? (
              <>
                <Avatar.Group>
                  <Avatar size="small" src={eachPost[0].senderDetails.profilePicture} />
                  <Avatar size="small" src={eachPost[1].senderDetails.profilePicture} />
                </Avatar.Group>
                <div>
                  <Link
                    to={`/profile/${eachPost[0]?.notification.senderId}`}
                    className="dark:text-text-gray text-text-primary"
                  >
                    {eachPost[0].senderDetails.userName}
                  </Link>, 
                  <Link
                    to={`/profile/${eachPost[1]?.notification.senderId}`}
                    className="dark:text-text-gray text-text-primary"
                  >
                    {eachPost[1].senderDetails.userName}
                  </Link>, 
                  <h3 className="text-xs text-gray-500 dark:text-gray-400">
                    &nbsp; liked your post
                  </h3>
                  <h3 className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeDifference(eachPost[0]?.notification.createdAt)}
                  </h3>
                </div>
                <Link className='ml-auto'>
                  <img
                    src={eachPost[0].senderDetails.postImage}
                    className="text-2xl object-cover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 border size-14 text-text-primary border-text-primary ml-auto"
                  />
                </Link>
              </>
            ) : (
              <>
                <Avatar.Group>
                  <Avatar size="small" src={eachPost[0].senderDetails.profilePicture} />
                  <Avatar size="small" src={eachPost[1].senderDetails.profilePicture} />
                </Avatar.Group>
                <div>
                  <h3>
                    <Link
                      to={`/profile/${eachPost[0]?.notification.senderId}`}
                      className="dark:text-text-gray text-text-primary"
                    >
                      {eachPost[0].senderDetails.userName}
                    </Link>, 
                    <Link
                      to={`/profile/${eachPost[1]?.notification.senderId}`}
                      className="dark:text-text-gray text-text-primary"
                    >
                      {eachPost[1].senderDetails.userName}
                    </Link>, 
                    and others liked your post
                  </h3>
                  <h3 className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeDifference(eachPost[0]?.notification.createdAt)}
                  </h3>
                </div>
                <Link className='ml-auto'>
                  <img
                    src={eachPost[0].senderDetails.postImage}
                    className="text-2xl object-cover rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 border size-14 text-text-primary border-text-primary"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      ))}
    </Menu.Item>
  );
};

export default Like;
