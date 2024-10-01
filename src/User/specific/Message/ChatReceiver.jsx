import React from 'react';

export const ChatReceiver = ({ chat }) => {
  return (
    <div
      className='px-1 ps-4 bg-primary-light flex items-center w-fit py-1 rounded-xl text-black rounded-tl-none'
    >
      <p
        style={{
          whiteSpace: 'pre-line', // Preserve line breaks and white space
          margin: 0 // Remove default margin
        }}
      >
        {chat.content}
      </p>
      <p className='text-sm mt-auto mx-2' style={{ fontSize: '8px' }}>
        {new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
      </p>
    </div>
  );
};
