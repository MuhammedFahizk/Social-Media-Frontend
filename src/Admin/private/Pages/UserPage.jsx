import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, blockUser, unblockUser } from '../../api/getApi';
import { Card, message } from 'antd';
import ButtonModal from '../../../User/component/Button';
import Stores from '../Component/Specific/Stores';
import PostsUser from '../Component/Specific/PostsUser';
const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUser(id);
        setUser(response.user);
        setPosts(response.posts);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Column: Top Stories and Bottom Posts */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Stories Section */}
        
        <Stores user={user}/>
        {/* Posts Section */}
          <PostsUser posts={posts}/>
      </div>

      {/* Right Column: User Details */}
      <Card className="col-span-1 h-fit shadow-lg">
        {user ? (
          <div className="flex flex-col items-center">
            <img
              className="w-40 h-40 rounded-full object-cover mx-auto mt-4"
              alt="Profile Pic"
              src={user.profilePicture}
            />
            <h2 className="text-center text-2xl font-bold mt-4">{user.userName}</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Bio:</span> {user.bio || 'No bio provided'}
            </p>
           

            <div className="flex gap-4 justify-center mt-4">
              <ButtonModal
                list={user.following || []}
                item={<p>Following: {user.following.length}</p>}
              />
              <ButtonModal
                list={user.followers || []}
                item={<p>Followers: {user.followers.length}</p>}
              />
            </div>

            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-medium">Last Active:</span> {new Date(user.lastActive).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Signup Date:</span> {new Date(user.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Blocked:</span> {user.isBlocked.status ? 'Yes' : 'No'}
              </p>
            </div>

            {user.isBlocked.status ? (
              <button
                onClick={handleUnblock}
                className="px-3 py-1 bg-red-500 text-white shadow-lg rounded-md border mt-4"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={handleBlock}
                className="px-3 py-1 bg-green-500 text-white shadow-lg rounded-md border mt-4"
              >
                Block
              </button>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </div>
  );
};

export default UserPage;
