// components/ChatArea.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import ChatDetails from './ChatDetails';
const ChatArea = () => {
  const { userId } = useParams();
  

  return (
    <div className='col-span-7 grid grid-cols-4 gap-1 bg-primary-light dark:bg-secondary-dark shadow-2xl rounded-lg  p-3'>
          <ChatRoom/>
          <ChatDetails/>
    </div>
  );
};

export default ChatArea;
