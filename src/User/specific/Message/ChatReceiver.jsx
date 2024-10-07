import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../../component/DropDown";
import { message, Popconfirm } from "antd";
import { deleteForMe } from "../../auth/deleteApi";
import ImageShow from "./Image";

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
    <div className='flex group  '>
   
      <div className="px-1 pt-1 dark:bg-chat-bubble-dark bg-chat-bubble-light  items-start  w-fit rounded-xl text-black rounded-tl-none rounded-br-lg  relative">
      {
            chat.mediaUrl && (
              <ImageShow file={chat.mediaUrl}  />
            )
          }
        <div className="flex justify-between items-start gap-2">
          <p
            className="text-sm break-words max-w-full dark:text-white sm:max-w-xs md:max-w-sm lg:max-w-md"
            style={{ whiteSpace: 'pre-line', margin: 0 }}
          >
            {chat.content}
          </p>


        </div>

        <div className="flex items-center gap-2 justify-end mt-1">
          <p
            className="text-xs text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200 ease-in-out"
            style={{ fontSize: '10px' }}
          >
            {new Date(chat.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </p>
        </div>
      </div>
      <ProfileDropDown
      items={items}
      item={<div className="opacity-0     group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        <MdOutlineKeyboardArrowDown className="text-2xl " />
      </div>} />
      </div>
  );
};
