import React from 'react';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';
import CheckIcon from '../../../CommonComponents/CheckIcon';

export const ChatSender = ({ chat }) => {
  // Determine which icon to display based on the message status
  const getStatusIcon = () => {
    switch (chat.status) {
      case 'sent':
        return <FaCheck className='text-sm mt-auto' style={{ fontSize: '10px', color: 'gray' }} />; // Single tick in gray
      case 'delivered':
        return <CheckIcon className='w-4 text-gray-500'/>
      case 'read':
        return <CheckIcon className='w-4 text-blue-600'/>; // Double tick with blue (read)
      default:
        return null;
    }
  };

  return (
    <div
      className='px-1 ps-4 bg-primary-light flex  items-center ms-auto w-fit py-1 rounded-xl text-black rounded-tr-none rounded-br-lg'
    >
      <p
      className='text-sm '
        style={{
          whiteSpace: 'pre-line',
          margin: 0 
        }}
      >
      
        {chat.content}
      </p>
      <div className='flex'>
      <p className='text-sm mt-auto mx-1' style={{ fontSize: '8px' }}>
        {new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
      </p>
      {getStatusIcon()}
      </div>
    </div>
  );
};
