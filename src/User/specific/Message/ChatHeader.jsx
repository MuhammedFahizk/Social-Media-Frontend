import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
const ChatHeader = ({user}) => {

  
  return (
    <div className="bg-text-primary rounded-lg p-2 text-white min-h-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-sm">{user.userName}</h2>
        <h3 className="text-gray-400 text-xs">Online</h3>
      </div>
      <div className="ms-auto cursor-pointer">
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default ChatHeader;
