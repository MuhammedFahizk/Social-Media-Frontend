import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, blockUser, unblockUser } from '../../api/getApi';
import { Card, message } from 'antd';
import ButtonModal from '../../../User/component/Button';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUser(id);
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        message.error('Failed to fetch user.');
      }
    };

    fetchUserData();
  }, [id]);

  const handleBlock = async () => {
    try {
      const response = await blockUser(id);
      setUser(response.data.data); // Update user data with new blocked status
      message.success('User blocked successfully.');
    } catch (error) {
      console.error('Failed to block user:', error);
      message.error('Failed to block user.');
    }
  };

  const handleUnblock = async () => {
    try {
      const response = await unblockUser(id);
      setUser(response.data.data); // Update user data with new unblocked status
      message.success('User unblocked successfully.');
    } catch (error) {
      console.error('Failed to unblock user:', error);
      message.error('Failed to unblock user.');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div className='grid grid-cols-3 gap-2'>
            <Card
              className='col-span-1'
              cover={
                <img
                  className='w-40 object-cover h-80'
                  alt="Profile Pic"
                  src={user.profilePicture}
                />
              }
              title={user.userName}
            >
              <div className='flex gap-2 justify-center'>
                <ButtonModal list={user.following || []} item={<p>followings &nbsp; &nbsp; {user.following ? user.following.length : 0}</p>} />
                <ButtonModal list={user.followers || []} item={<p>followers &nbsp; &nbsp; {user.followers ? user.followers.length : 0}</p>} />
                {user.isBlocked ? (
                  <button onClick={handleUnblock} className='px-3 bg-white shadow-lg rounded-md border'>
                    Unblock
                  </button>
                ) : (
                  <button onClick={handleBlock} className='px-3 bg-white shadow-lg rounded-md border'>
                    Block
                  </button>
                )}
              </div>
            </Card>
            <Card>

            </Card>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserPage;
