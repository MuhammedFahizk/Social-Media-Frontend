// components/UserList.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchChat from './SearchChat';
const UserList = () => {
  // Assume users is an array of user objects
  const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

  return (
    // <ul>
    //   {users.map(user => (
    //     <li key={user.id}>
    //         asdas
    //       <Link to={`/messages/${user.id}`}>{user.name}</Link>
    //     </li>
    //   ))} 
    // </ul>
    <div className='col-span-2 bg-white h-[88vh] dark:bg-secondary-dark px-5 p-2 shadow-lg  rounded-lg  ' >
<SearchChat/>
    

    </div>
  );
};

export default UserList;
