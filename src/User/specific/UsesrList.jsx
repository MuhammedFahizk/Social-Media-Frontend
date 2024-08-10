// components/UserList.js
import React from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  // Assume users is an array of user objects
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
            asdas
          <Link to={`/messages/${user.id}`}>{user.name}</Link>
        </li>
      ))} 
    </ul>
  );
};

export default UserList;
