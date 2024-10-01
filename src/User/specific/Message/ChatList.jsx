import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatList } from '../../auth/getApi';
import FriendDetails from './FriendDetails';
import { clearChatList } from '../../Redux/chattingSlice';
import SearchChat from './SearchChat';
import useNewSender from '../../hooks/useNewSender';
// Sample function to simulate fetching users from an API
const fetchUsers = async () => {
  const response = await fetchChatList();
  if (!response) {
    throw new Error('Failed to fetch users');
  }
  return response.data;
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatList = useSelector(state => state.chatting.chatList);
  const dispatch = useDispatch(); // Import and use dispatch
useNewSender()

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [dispatch]); 
  
 
console.log(users);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div className='col-span-2 bg-white h-[88vh] dark:bg-secondary-dark px-5 p-2 shadow-lg rounded-lg'>
      Error: {error}
    </div>
  );

  return (
    <div className='col-span-2 bg-white h-[88vh] dark:bg-secondary-dark px-2 p-2 shadow-lg rounded-lg'>
      <SearchChat />
      
      <ul className="list-none px-0 flex flex-col gap-1 my-4"> 
        {users.map((user) => (
          <FriendDetails key={user._id} friend={user}/>
        ))}
      </ul>
      
    </div>
  );
};

export default UserList;
