import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import ProfileDropDown from "../component/DropDown";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoIosTrash } from "react-icons/io";
import { message } from "antd";
import PropTypes from 'prop-types';
import { deletePosts } from "../auth/authUser";

const PostOwner = ({ id, onDelete }) => {
  const handleDeletePost = async () => {
    try {
      await deletePosts(id);
      message.success('Image deleted');
      onDelete(id); // Call the onDelete function to update the state in the parent component
    } catch (error) {
      message.error('Failed to delete image');
    }
  };

  const items = [
    { 
      label: (
        <div className="flex h-full items-center justify-between gap-2">
          <h3>Edit</h3>
          <HiOutlinePencilSquare className="text-2xl" />
        </div>
      ), 
      key: 'edit' 
    },
    { 
      label: (
        <div onClick={handleDeletePost} className="flex h-full items-center justify-center gap-2">
          <h3>Delete</h3>
          <IoIosTrash className="text-2xl text-red-500" />
        </div>
      ), 
      key: 'delete' 
    },
  ];

  return (
    <ProfileDropDown item={<IoSettingsOutline className="text-2xl mx-2 text-white cursor-pointer" />} items={items} />
  );
};

PostOwner.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostOwner;
