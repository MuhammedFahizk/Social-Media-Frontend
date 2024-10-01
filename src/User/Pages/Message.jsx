import React, { memo } from 'react';
import UserList from '../specific/Message/ChatList';
import ChatArea from '../specific/Message/ChatArea';
import useReceiveMessage from '../hooks/useReceiveMessage';

const MemoizedUserList = memo(UserList);
const MemoizedChatArea = memo(ChatArea);

const Message = () => {
  useReceiveMessage(); // Hook listens for incoming messages

  return (
    <div className='grid grid-cols-9 gap-2 mx-2 my-2'>
      <MemoizedUserList />
      <MemoizedChatArea />
    </div>
  );
};

export default Message;
