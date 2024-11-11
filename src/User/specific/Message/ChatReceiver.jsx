import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../../component/DropDown";
import { message, Popconfirm } from "antd";
import { deleteForMe } from "../../auth/deleteApi";
import ImageShow from "./Image";

export const ChatReceiver = ({ chat, setChats }) => {
  const [loading, setLoading] = useState(false);
  console.log(chat);
  
  const handleDeleteForMe = async () => {
    setLoading(true);
    try {
      await deleteForMe(chat._id);
      message.success('Message deleted successfully!');
      setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
    } catch (error) {
      console.log(error);
      message.error('Failed to delete message.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(chat.content)
      .then(() => {
        message.success('Message copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy message: ', err);
        message.error('Failed to copy message.');
      });
  };

  const items = [
    {
      label: (
        <div onClick={handleCopyMessage} className="flex h-full items-center justify-center gap-2 cursor-pointer">
          <h3>Copy</h3>
        </div>
      ),
      key: "copy",
    },
    
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this message for yourself?"
          onConfirm={handleDeleteForMe}
          okText="Yes"
          cancelText="No"
        >
          <div className="flex h-full items-center justify-center gap-2 cursor-pointer">
            <h3>Delete for me</h3>
          </div>
        </Popconfirm>
      ),
      key: "deleteForMe",
    },
  ];

  return (
    <div className="flex flex-col gap-2 items-start group">
      <div className="flex">
      <div className="relative bg-chat-bubble-light dark:bg-chat-bubble-dark text-black dark:text-white px-1 py-1 rounded-xl rounded-tl-none max-w-md w-fit shadow-sm">
        {chat.mediaUrl && <ImageShow file={chat.mediaUrl} className="mb-1" />}
        <p className="text-sm break-words max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md" style={{ whiteSpace: 'pre-line', margin: 0 }}>
          {chat.content}
        </p>
        
       

        {/* Tail for the chat bubble */}
        <div className="absolute -bottom-1 left-2 transform rotate-45">
          <div className="w-3 h-3 bg-chat-bubble-light dark:bg-chat-bubble-dark"></div>
        </div>
      </div>

      <ProfileDropDown
        items={items}
        item={
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out ml-2">
            <MdOutlineKeyboardArrowDown className="text-2xl text-gray-500 hover:text-gray-800 cursor-pointer" />
          </div>
        }
      />
      </div>
       <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200 ease-in-out" style={{ fontSize: '10px' }}>
            {new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </p>
        </div>
    </div>
  );
};
