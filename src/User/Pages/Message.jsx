import React from 'react';
import UserList from '../specific/Message/ChatList';
import ChatArea from '../specific/Message/ChatArea';
import useReceiveMessage from '../hooks/useReceiveMessage';

const Message = () => {
  useReceiveMessage();

  return (
    <div className='grid grid-cols-9 gap-2 mx-2 my-2'>
      <UserList />
      <ChatArea />
    </div>
  );
};

export default Message;
