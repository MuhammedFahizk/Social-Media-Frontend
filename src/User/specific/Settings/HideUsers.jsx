import React, { useState, useEffect } from "react";
import { fetchHideUsers } from "../../auth/getApi";
import FollowButton from "../../component/FollowButton";
import { Button, notification } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { unHideContent } from "../../auth/postApi";

const HideUsers = () => {
  const [hideUsers, setHideUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHideUsers = async () => {
      try {
        const response = await fetchHideUsers();
        setHideUsers(response.data); // Adjust based on the structure of the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadHideUsers();
  }, []);

  const handleUnhide = async (userId) => {
    try {
      const type = 'user';
      const data = { type, id: userId };

      await unHideContent(data);
      setHideUsers(hideUsers.filter(user => user._id !== userId));
      notification.success({
        message: 'Success',
        description: 'User has been successfully unhid.',
      });
    } catch (err) {
      console.error('Failed to unhide user:', err);
      notification.error({
        message: 'Error',
        description: 'Failed to unhide user.',
      });
      setError('Failed to unhide user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Hidden Users</h2>
      {hideUsers.length === 0 ? (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-gray-600 dark:text-gray-300">No hidden users.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hideUsers.map((user) => (
            <div key={user._id} className="flex items-center p-4 rounded-lg shadow-md dark:bg-secondary-dark">
              <img
                src={user.profilePicture}
                alt={user.userName}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{user.userName}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="flex gap-2 ms-auto">
                <FollowButton id={user._id} />
                <Button 
                  className="bg-text-primary text-white"
                  icon={<EyeFilled />}
                  onClick={() => handleUnhide(user._id)}
                >
                  Unhide
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HideUsers;
