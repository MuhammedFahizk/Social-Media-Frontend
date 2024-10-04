import React, { memo } from 'react';
import UserList from '../specific/Message/ChatList';
import ChatArea from '../specific/Message/ChatArea';
import useReceiveMessage from '../hooks/useReceiveMessage';

const MemoizedUserList = memo(UserList);
const MemoizedChatArea = memo(ChatArea);

const Message = () => {
  useReceiveMessage(); // Hook listens for incoming messages

  return (
    <div className='grid  sm:grid-cols-9 justify-center  m-0  gap-0 sm:gap-2 sm:mx-2 '>
      <MemoizedUserList />
      <MemoizedChatArea />
    </div>
  );
};

export default Message;
