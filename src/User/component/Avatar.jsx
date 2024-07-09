import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, } from 'antd';
import React from 'react';
import PropTypes from "prop-types";
const AvatarBtn = ({ count, image, icon }) => {
  return (
    <div className='flex items-center h-full '>
      
      <Badge count={count}
      className=''
     >
      
        <Avatar 
        
        className='bg-light_Brown h-7 w-7'
          shape="circle"

          src={image ? <img src={image} alt="profile" /> : null}
          icon={!image && icon ? icon : <UserOutlined />}
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
