import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import React from 'react';
import PropTypes from "prop-types";

const AvatarBtn = ({ count, image, spell, size }) => {
  return (
    <div className='flex items-center h-full'>
      <Badge count={count}>
        <Avatar 
       size='small'
          src={image || undefined}
          className='bg-text-primary h-7 w-7'
          shape="circle"
        >
          {!image && (
            <h3 className='text-white'>{spell}</h3>
          )}
        </Avatar>
      </Badge>
    </div>
  );
}

AvatarBtn.propTypes = {
  count: PropTypes.number,
  image: PropTypes.string,
  spell: PropTypes.string.isRequired,
};

export default AvatarBtn;
