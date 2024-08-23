import React, { useEffect, useState } from "react";
import Title from "../component/Title";
import { IoIosNotificationsOutline } from "react-icons/io";
import DarkMode from "../component/DarkMode";
import { MessageOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { Avatar, Badge, Dropdown, Menu } from "antd";

import NotificationMenu from "./Notification/NotificationDropDown";
import { FaSearchMinus } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const NavBar = () => {
  return (
    <div className="flex h-[56px] top-0 sticky z-50 dark:bg-darkSecondary bg-secondary-light dark:bg-secondary-dark dark:text-white justify-between px-2 md:px-10 mx-2 rounded-lg shadow-lg">
      <Title />
      <div className="flex gap-3 h-full items-center">
        <Link to={'/search'} className="bg-text-primary rounded-full p-1">
          <IoSearch className="text-2xl  text-white" />
        </Link>
        <Link to={"/messages"}>
          <Badge count={2}>
            <Avatar
              className="bg-text-primary"
              count="1"
              icon={<MessageOutlined />}
            />
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
