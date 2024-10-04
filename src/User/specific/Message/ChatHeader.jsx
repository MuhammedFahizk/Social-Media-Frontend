import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PropTypes from "prop-types";  // Import PropTypes
import AvatarBtn from "../../component/Avatar";
import { formatLastSeen } from "../../../Services/formatLastSeen";
import ProfileDropDown from "../../component/DropDown";
import { IoIosTrash } from "react-icons/io";
import { Popconfirm, message } from "antd"; 
import { clearChat } from "../../auth/deleteApi";

const ChatHeader = ({ user, setChats }) => {
  const handleClearChat = async () => {
    try {
      await clearChat(user._id);
      setChats([]);  
      message.success("Chat cleared successfully"); 
    } catch (error) {
      message.error("Failed to clear chat"); 
    }
  };

  const items = [
    {
      label: (
        <Popconfirm
          title="Are you sure you want to clear the chat?"
          onConfirm={handleClearChat} 
          okText="Yes"
          cancelText="No"
        >
          <div className="flex items-center gap-2">
            <h3>Clear Chat</h3>
          </div>
        </Popconfirm>
      ),
      key: "clearChat",
    },
    {
      label: (
        <div className="flex h-full items-center justify-center gap-2">
          <h3>Delete</h3>
          <IoIosTrash className="text-2xl text-red-500" />
        </div>
      ),
      key: "delete",
    },
  ];

  return (
    <div className="bg-text-primary rounded-lg p-2 text-white min-h-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AvatarBtn image={user.profilePicture} size="medium" />

        <div>
          <h2 className="text-sm">{user.userName}</h2>
          {user.online ? (
            <h3 className="text-gray-600 text-xs">Online</h3>
          ) : (
            <h3 className="text-gray-600 text-xs">
              last seen {formatLastSeen(user.lastSeen)}
            </h3>
          )}
        </div>
      </div>
      <div className="ms-auto flex h-full items-center cursor-pointer">
        <ProfileDropDown
          item={
            <BsThreeDotsVertical className="text-xl mx-2 dark:text-white cursor-pointer" />
          }
          items={items}
        />
      </div>
    </div>
  );
};

// Define prop types for the component
ChatHeader.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    online: PropTypes.bool,
    lastSeen: PropTypes.string,
  }).isRequired,  // Validate the user prop with shape
  setChats: PropTypes.func.isRequired,  // Ensure setChats is a function and required
};

export default ChatHeader;
