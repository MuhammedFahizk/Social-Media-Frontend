import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge,Space } from 'antd';
import React from 'react';

const ProfileBtn = ({ count, image, icon }) => {
  return (
    <div className='flex items-center h-full'>
      
      <Badge count={count}>
        <Avatar 
        
        className='bg-light_Brown'
          shape="circle"

          src={image ? <img src={image} alt="profile" /> : null}
          icon={!image && icon ? icon : <UserOutlined />}
        />
      </Badge>
    </div>
  );
}

export default ProfileBtn;
