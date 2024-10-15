import React from 'react';
import SendChat from '../Message/SendChat';

const StoryFooter = () => {
  return (
    <div className="absolute bottom-2 px-2  left-0 w-full  z-50 ">
      <div className=' bg-black bg-opacity-50 rounded-lg px-2'>
      <SendChat />
      </div>
    </div>
  );
};

export default StoryFooter;
