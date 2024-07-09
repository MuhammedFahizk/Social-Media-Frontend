import { Button, Dropdown } from "antd";
import PropTypes from "prop-types";


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
const ProfileDropDown = ({item}) => {
  return (                               
    <div className="flex h-full  items-center ">
      <Dropdown menu={{ items }} placement="bottomRight" className="bg-white" arrow>
        <Button className=" border-0  hover:bg-inherit p-0 rounded-full">
         
        {item}
        </Button>
        
      </Dropdown>
    </div>
  );
};
ProfileDropDown.propTypes = {
  item: PropTypes.element.isRequired
  };

export default ProfileDropDown;
