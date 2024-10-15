import React from "react";
import Title from "../component/Title";
import DarkMode from "../component/DarkMode";
import { MessageOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { Avatar, Badge } from "antd";

import NotificationMenu from "./Notification/NotificationDropDown";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import useReceiveMessage from "../hooks/useReceiveMessage";

const NavBar = () => {
  // Select message count from Redux store
  const { messageCount } = useSelector((state) => state.message);
  
  // Calculate total unread message count
  const totalMessageCount = Object.values(messageCount).reduce((total, count) => total + count, 0);
  
  useReceiveMessage(); 

  return (
    <div className="flex h-[56px] top-0 sticky z-50 dark:bg-darkSecondary bg-secondary-light dark:bg-secondary-dark dark:text-white justify-between px-2 md:px-10 mx-2 rounded-lg shadow-lg">
      <Title />
      <div className="flex gap-3 h-full items-center">
        <Link to={'/search'} className="bg-text-primary rounded-full p-1">
          <IoSearch className="text-2xl text-white" />
        </Link>
        <Link to={"/messages"}>
          <Badge count={totalMessageCount} overflowCount={99}>
            <Avatar className="bg-text-primary" icon={<MessageOutlined />} />
          </Badge>
        </Link>
        <NotificationMenu />
        <DarkMode />
        <ProfileButton />
      </div>
    </div>
  );
};

export default NavBar;
