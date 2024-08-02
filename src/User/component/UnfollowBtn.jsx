import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { unFollowUser } from "../auth/authUser";
import FollowButton from "./FollowButton";
import { useDispatch, useSelector } from "react-redux";
import { unfollowUserSuccess } from "../Redux/UserInformation";

const UnFollowBtn = ({ id, onUnfollow }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user?.following) {
      setIsFollowing(user.following.some((item) => item._id === id));
    }
  }, [user, id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await unFollowUser(id);
      onUnfollow(id);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalFooter = (
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button
        type="primary"
        onClick={handleOk}
        loading={loading}
      >
        Unfollow
      </Button>
    </>
  );

  return (
    <div className="gap-2 flex">
      {isFollowing ? (
        <>
          <Button
            className="bg-blue-700 dark:bg-white text-white dark:text-black"
            onClick={showModal}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Following'}
          </Button>
          <Modal
            title="Unfollow Confirmation"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={modalFooter} // Custom footer buttons
          >
            <p>Are you sure you want to unfollow?</p>
          </Modal>
        </>
      ) : (
        <FollowButton id={id} />
      )}
    </div>
  );
};

export default UnFollowBtn;
