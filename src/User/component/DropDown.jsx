import { Button, Dropdown } from "antd";
import Avatar from "./Avatar";
import React from "react";
import LogOutBtn from "./LogOutBtn";
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: <LogOutBtn />,
  },
];
const ProfileDropDown = () => {
  return (
    <div className="flex h-full  items-center">
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Button className="bg-inherit border-0 hover:bg-inherit p-0 rounded-full">
          <Avatar
            image={
              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          />
        </Button>
      </Dropdown>
    </div>
  );
};

export default ProfileDropDown;
