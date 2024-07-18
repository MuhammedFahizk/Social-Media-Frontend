import React, { useState } from 'react';
import { followUser } from '../auth/authUser';
import { Button } from 'antd';
import { GoPlus } from "react-icons/go";
import UnFollowBtn from './UnfollowBtn';
const FollowButton = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleFollow = async (userId) => {
    setLoading(true);
    try {
      const response = await followUser(userId);
      if (response.status === 200) {
        setFollowing(true);
      } else {
        console.log(response);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {following ? (
        <UnFollowBtn id={id} />
      ) : (
        <Button
        className="bg-blue-700 dark:bg-white text-white dark:text-black"
          onClick={() => handleFollow(id)}
          icon={<GoPlus />}
          disabled={loading}
          loading={loading}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
