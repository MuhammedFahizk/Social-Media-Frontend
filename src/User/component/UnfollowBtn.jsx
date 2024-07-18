import { Button, Modal } from "antd";
import React, { useState } from "react";
import { unFollowUser } from "../auth/authUser";
import FollowButton from "./FollowButton";

const UnFollowBtn = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setClick(false);
    setLoading(true);
    try {
      const response = await unFollowUser(id);
      console.log(response);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setLoading(false);
      setClick(!click);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    
    showModal();
  };

  return (
    <div className="gap-2 flex">
      {!click ? (
        <Button
          className="bg-blue-700 dark:bg-white text-white dark:text-black"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Following'}
        </Button>
      ) : (
        <FollowButton id={id} />
      )}
      <Modal
        title="Unfollow Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to unfollow?</p>
      </Modal>
    </div>
  );
};

export default UnFollowBtn;
