import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import UserList from '../specific/Message/ChatList';
import ChatArea from '../specific/Message/ChatArea';
const Message = () => {
  return (
    <div className='grid grid-cols-9 gap-2 mx-2 my-2 '>
      <UserList/>
      <ChatArea/>
  </div>
  );
};

export default Message;
