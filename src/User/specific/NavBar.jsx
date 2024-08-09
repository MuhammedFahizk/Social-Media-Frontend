import React from "react";
import Title from "../component/Title";
import SearchBer from "../component/SearchBer";
import Avatar from "../component/Avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import DarkMode from "../component/DarkMode";
import { MessageOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
const NavBar = () => {
  
  return (
    <div className="flex h-[56px]  top-0 sticky z-50 dark:bg-darkSecondary bg-secondary-light  dark:bg-secondary-dark    dark:text-white   justify-between px-2 md:px-10 mx-2 rounded-lg shadow-lg">
      <Title />
      <div className="flex gap-3">
        <Avatar count="1" icon={<MessageOutlined />} />
        <Avatar count="2" icon={<IoIosNotificationsOutline />} />

        <DarkMode />
        <ProfileButton/>
      </div>
    </div>
  );
};

export default NavBar;
