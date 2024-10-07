import { Avatar, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseUser } from '../../Redux/chattingSlice';
import AvatarBtn from '../../component/Avatar';
import { PiUser } from "react-icons/pi";

const FriendDetails = ({ friend }) => {
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { messageCount } = useSelector((state) => state.message);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  // Update the count when messageCount or friend._id changes
  useEffect(() => {
    if (messageCount && friend._id) {
      const unreadCount = messageCount[friend._id] || 0; // Default to 0 if undefined
      const initialUnread = friend.unreadMessagesCount || 0; // Default to 0 if undefined
      setCount(unreadCount + initialUnread); // Sum the two values
    }
  }, [messageCount, friend._id]);

  return (
    <div
      className={`bg-secondary-light gap-2 h-12 justify-between dark:bg-primary-dark dark:hover:bg-ternary-dark items-center flex px-4 rounded-md cursor-pointer hover:bg-ternary-light ${
        friend._id === selectedChatUser ? 'dark:bg-ternary-dark' : ''
      }`}
      onClick={() => dispatch(ChooseUser(friend._id))}
    >
      {/* Avatar section */}
      <div className='flex items-center w-12'>
        <Badge dot={friend.online} status='success'>
          <Avatar shape='square' src={friend.profilePicture}  icon={<PiUser/>}/>
        </Badge>
      </div>

      {/* User details section */}
      <div className='flex-1 overflow-hidden'>
        <h3 className='text-sm font-semibold truncate'>{friend.userName}</h3>
        <p className='text-xs text-gray-500 truncate'>
          {friend?.latestChat?.content}
        </p>
      </div>

      {/* Unread message count */}
      {count > 0 && (
        <Badge
          count={count}
          style={{ backgroundColor: '#0f9bab' }}
          className='ml-2'
        />
      )}
    </div>
  );
};

export default FriendDetails;
