import React, { useState, useEffect } from 'react';
import { followUser } from '../auth/authUser';
import { Button } from 'antd';
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import UnFollowBtn from './UnfollowBtn';
import { followUserSuccess } from '../Redux/UserInformation';

const FollowButton = ({ id }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.following) {
      setFollowing(user.following.some((item) => item._id === id));
    }
  }, []);

  const handleFollow = async (userId) => {
    setLoading(true);
    try {
      const response = await followUser(userId);
      if (response.status === 200) {
        console.log('response',response);
        dispatch(followUserSuccess(userId));
        setFollowing(true);
      } else {
        console.error('Error following user:', response);
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {following ? (
        <UnFollowBtn id={id}   />
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
