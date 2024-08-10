import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import UserList from '../specific/UsesrList';
import ChatArea from '../specific/ChatArea';
const Message = () => {
  return (
    <div style={{ display: 'flex' }}>
    <aside>
      <nav>
        <ul>
          <li><Link to="/messages/userList">User List</Link></li>
        </ul>
      </nav>
    </aside>
    <main>
        
      <Routes>
        <Route path="/messages/userList" element={<UserList />} />
        <Route path="/messages/:userId" element={<ChatArea />} />
      </Routes>
    </main>
  </div>
  );
};

export default Message;
