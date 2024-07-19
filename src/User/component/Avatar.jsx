import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, } from 'antd';
import React from 'react';
import PropTypes from "prop-types";
const AvatarBtn = ({ count, image, icon }) => {
  console.log(image);
  return (
    <div className='flex items-center h-full '>
      
      <Badge count={count}
      className=''
     >
      
        <Avatar 
          src={image || null} // Show the image if provided, otherwise null
          className='bg-light_Brown h-7 w-7'
          shape="circle"
          // icon={!image && icon ? icon : <UserOutlined />}
        />
      </Badge>
    </div>
  );
}

AvatarBtn.propTypes = {
  count: PropTypes.number,
  image: PropTypes.string,
  icon: PropTypes.element
} 
export default AvatarBtn;
