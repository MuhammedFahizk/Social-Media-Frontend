import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../../component/DropDown";
import { message, Popconfirm } from "antd";
import { deleteForMe } from "../../auth/deleteApi";

export const ChatReceiver = ({ chat, setChats }) => {
  const [loading, setLoading] = useState(false);

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
        <div className="flex h-full items-center justify-center gap-2">
          <h3>Forward</h3>
        </div>
      ),
      key: "forward",
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
    <div className="px-1 ps-4 bg-primary-light flex items-center w-fit py-1 rounded-xl text-black rounded-tl-none group">
      <p
        style={{
          whiteSpace: "pre-line", 
          margin: 0,
        }}
      >
        {chat.content}
      </p>
      <p className="text-sm mt-auto mx-2" style={{ fontSize: "8px" }}>
        {new Date(chat.timestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
      <ProfileDropDown 
        items={items} 
        item={
          <div className='ms-auto opacity-100 hidden group-hover:block'>
            <MdOutlineKeyboardArrowDown className="text-xl" />
          </div>
        }
      />
    </div>
  );
};
