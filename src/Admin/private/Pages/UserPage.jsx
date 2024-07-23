import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../../api/auth';
import { Card } from 'antd';
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
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <div>
      {user ? (
        <div>
      <div className='grid grid-cols-3'>

      <Card
        className='col-span-1'
        cover={ <img
            className='w-40   object-cover h-80'
            alt="Profile Pic"
            src={user.profilePicture}
          />}
      title={user.userName}>
        <div className='flex gap-2 justify-center'>
        <ButtonModal list={user.following} item={<p>followings  &nbsp;  &nbsp; { user.following.length}</p>}/>
        <ButtonModal list={user.followers} item={<p>followers  &nbsp;  &nbsp; { user.followers.length}</p>}/>

        </div>
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
