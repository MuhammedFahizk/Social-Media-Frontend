// components/ChatArea.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import ChatDetails from './ChatDetails';
const ChatArea = () => {
  const { userId } = useParams();
  

  return (
    <div className='col-span-7 grid  gap-1 bg-primary-light dark:bg-secondary-dark shadow-2xl rounded-lg  p-1 sm:p-2 md:p-3'>
          <ChatRoom/>
    </div>
  );
};

export default ChatArea;
