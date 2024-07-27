import { Button, Dropdown } from "antd";
import PropTypes from "prop-types";


import React from "react";

const ProfileDropDown = ({item, items}) => {
  return (                               
    <div className="flex h-full  items-center ">
      <Dropdown menu={{ items }} placement="bottomRight" className="bg-white " arrow>
        <Button className=" border-0  hover:bg-inherit  p-0 rounded-full">
         
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
