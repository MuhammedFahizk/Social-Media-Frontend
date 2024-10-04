import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import CheckIcon from '../../../CommonComponents/CheckIcon';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from '../../component/DropDown';
import { deleteForEveryone, deleteForMe } from '../../auth/deleteApi';
import { Popconfirm, message } from 'antd';

export const ChatSender = ({ chat, onDelete, setChats }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteForMe = async () => {
    setLoading(true);
    try {
      await deleteForMe(chat._id);
      message.success('Message deleted successfully!');
      setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
    } catch (error) {
      console.log(error);
      message.error('Failed to delete message.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForEveryone = async () => {
    setLoading(true);
    try {
      await deleteForEveryone(chat._id);
      message.success('Message deleted for everyone!');
      setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
    } catch (error) {
      message.error('Failed to delete message for everyone.');
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this message for yourself?"
          onConfirm={handleDeleteForMe}
          okText="Yes"
          cancelText="No"
        >
          <div className="flex h-full items-center justify-center gap-2 cursor-pointer">
            <h3>Delete for me</h3>
          </div>
        </Popconfirm>
      ),
      key: "deleteForMe",
    },
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this message for everyone?"
          onConfirm={handleDeleteForEveryone}
          okText="Yes"
          cancelText="No"
        >
          <div className="flex h-full items-center justify-center gap-2 cursor-pointer">
            <h3>Delete for everyone</h3>
          </div>
        </Popconfirm>
      ),
      key: "deleteForEveryone",
    },
  ];

  const getStatusIcon = () => {
    switch (chat.status) {
      case 'sent':
        return <FaCheck className='text-sm mt-auto' style={{ fontSize: '10px', color: 'gray' }} />;
      case 'delivered':
        return <CheckIcon className='w-4 text-gray-500' />;
      case 'read':
        return <CheckIcon className='w-4 text-blue-600' />;
      default:
        return null;
    }
  };

  return (
    <div className='px-1 ps-1 bg-primary-light flex items-center ms-auto w-fit py-1 rounded-xl text-black rounded-tr-none rounded-br-lg group'>
      <ProfileDropDown items={items} item={
        <div className='ms-auto opacity-100 hidden group-hover:block'>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
      }>
      </ProfileDropDown>
      <p className='text-sm' style={{ whiteSpace: 'pre-line', margin: 0 }}>
        {chat.content}
      </p>
      <div className='flex items-center'>
        <p 
          className='text-sm mt-auto mx-1 text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200 ease-in-out' 
          style={{ fontSize: '8px' }}
        >
          {new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </p>
        {getStatusIcon()}
      </div>
    </div>
  );
};
