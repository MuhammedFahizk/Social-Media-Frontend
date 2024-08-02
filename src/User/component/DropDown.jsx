import { Button, Dropdown } from "antd";
import PropTypes from "prop-types";


import React from "react";

const ProfileDropDown = ({item, items}) => {
  return (                               
    <div className="flex h-full  items-center  ">
      <Dropdown menu={{ items }} placement="bottomRight" className="  " arrow>
        <button className=" border-0    p-0 rounded-full">
         
        {item}
        
        </button>
        
      </Dropdown>
    </div>
  );
};
ProfileDropDown.propTypes = {
  item: PropTypes.element.isRequired
  };

export default ProfileDropDown;
