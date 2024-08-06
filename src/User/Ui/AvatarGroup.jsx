import React from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import AvatarBtn from '../component/Avatar';
const AvatarGroup = ({ users}) => {
  return (<>
    <Avatar.Group
    size={'small'}
    max={{
        count: 2,
        style: {
            color: '#f56a00',
            
            backgroundColor: '#ffff',
          }
    }}
    >
     {
        users?.map((item, index) => (
                <AvatarBtn
                key={index}
                image={item.profilePicture}
                spell={item.userName.charAt(0).toUpperCase}
                />
        ))
     }
      
      
    </Avatar.Group>
    <Divider />
 
  </>)
}
export default AvatarGroup;