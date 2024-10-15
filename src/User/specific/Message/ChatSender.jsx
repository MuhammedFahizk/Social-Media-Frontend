import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CheckIcon from "../../../CommonComponents/CheckIcon";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProfileDropDown from "../../component/DropDown";
import { deleteForEveryone, deleteForMe } from "../../auth/deleteApi";
import { Popconfirm, message } from "antd";
import ImageShow from "./Image";

export const ChatSender = ({ chat, onDelete, setChats }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteForMe = async () => {
    setLoading(true);
    try {
      await deleteForMe(chat._id);
      message.success("Message deleted successfully!");
      setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
    } catch (error) {
      console.log(error);
      message.error("Failed to delete message.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteForEveryone = async () => {
    setLoading(true);
    try {
      await deleteForEveryone(chat._id);
      message.success("Message deleted for everyone!");
      setChats((prevChats) => prevChats.filter((c) => c._id !== chat._id));
    } catch (error) {
      message.error("Failed to delete message for everyone.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(chat.content)
      .then(() => {
        message.success("Message copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy message: ", err);
        message.error("Failed to copy message.");
      });
  };

  const items = [
    {
      label: (
        <div onClick={handleCopyMessage} className="flex items-center gap-2 cursor-pointer">
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
          <div className="flex items-center gap-2 cursor-pointer">
            <h3>Delete for me</h3>
          </div>
        </Popconfirm>
      ),
      key: "deleteForMe",
    },
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this message for everyone?"
          onConfirm={handleDeleteForEveryone}
          okText="Yes"
          cancelText="No"
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <h3>Delete for everyone</h3>
          </div>
        </Popconfirm>
      ),
      key: "deleteForEveryone",
    },
  ];

  const getStatusIcon = () => {
    switch (chat.status) {
      case "sent":
        return <FaCheck className="text-sm" style={{ fontSize: "8px", color: "black" }} />;
      case "delivered":
        return <CheckIcon className="w-4 text-[#7c7c7c]" />;
      case "read":
        return <CheckIcon className="w-4 text-[#4130f9]" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-end group ms-auto relative">
      <div className="flex gap-1">
        <ProfileDropDown
          items={items}
          item={
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <MdOutlineKeyboardArrowDown className="text-2xl" />
            </div>
          }
        />
        <div className="relative bg-chat-bubble-light text-black dark:bg-chat-bubble-dark dark:text-white px-1 py-1 rounded-xl rounded-tr-none rounded-br-lg max-w-md w-fit">
          {chat.mediaUrl && <ImageShow file={chat.mediaUrl} />}
          <div className="flex justify-end items-start gap-2">
            {chat.content && (
              <p className="text-sm break-words" style={{ whiteSpace: "pre-line", margin: 0 }}>
                {chat.content}
              </p>
            )}
          </div>
          <div className="absolute -bottom-1 right-1 transform rotate-45">
            <div className="w-3 h-3 dark:bg-chat-bubble-dark rounded-sm bg-chat-bubble-light dark:bg-opacity-70"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end mt-1">
        <p
          className="text-xs text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200 ease-in-out"
          style={{ fontSize: "9px" }}
        >
          {new Date(chat.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        {getStatusIcon()}
      </div>
    </div>
  );
};
