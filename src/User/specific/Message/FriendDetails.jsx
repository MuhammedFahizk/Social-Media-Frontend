import { Avatar, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseUser } from '../../Redux/chattingSlice';
import AvatarBtn from '../../component/Avatar';

const FriendDetails = ({ friend }) => {
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { messageCount } = useSelector((state) => state.message);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(messageCount[friend._id]);
  }, [messageCount, friend._id]);

  const dispatch = useDispatch();

  return (
    <div
      className={`bg-secondary-light gap-2 h-12 justify-between dark:bg-primary-dark dark:hover:bg-ternary-dark items-center flex px-4 rounded-md cursor-pointer hover:bg-ternary-light ${
        friend._id === selectedChatUser ? 'dark:bg-ternary-dark' : ''
      }`}
      onClick={() => dispatch(ChooseUser(friend._id))}
    >
      <div className='flex items-center'>
        <Badge dot={friend.online}
        status='success'
        >
          <Avatar
            shape='square'
            src={friend.profilePicture} 
          />
        </Badge>
      </div>
      <div className='  w-full flex justify-between'>
      <h3>{friend.userName}</h3>
      {count > 0 && (
        <Badge 
          count={count} 
          style={{ backgroundColor: '#0f9bab' }} 
        />
      )}
      </div>
    </div>
  );
};

export default FriendDetails;
