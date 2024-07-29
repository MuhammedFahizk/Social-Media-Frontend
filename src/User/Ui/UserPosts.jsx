import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import LikePost from './LikePost';
import PostComments from './PostComments';
const UserPosts = ({images}) => {
    
  return (
    <div className='grid grid-cols-3  gap-2 p-10'>
       {
        images.map((item,index) => (
          <Card
          key={index}
    style={{
      
    }}
    cover={
      <img
        alt="example"
        src={item.imageUrl}
        className=' object-cover'
      />
    }
    actions={[
      // <SettingOutlined key="setting" />,
      // <EditOutlined key="edit" />,
      // <EllipsisOutlined key="ellipsis" />,
      <span className='flex justify-center'><LikePost likes={item.likes} id={item._id} /> </span>,
      <span className='flex justify-center'><PostComments id={item._id}  initialComments={item.comments}  /> </span>,
    ]}
  >
    <Meta
      title="Card title"
      description={item.hashTag}
    />
  </Card>
        ))
       }
    </div>
  )
}

export default UserPosts