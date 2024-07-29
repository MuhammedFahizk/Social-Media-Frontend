import React from 'react';
import { List, Avatar } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const UserBlogs = ({ blogs }) => {
  console.log(blogs);
  return (
    <div className="list-container" style={{ maxHeight: '350px',  position: 'relative' }}>
      <List
        itemLayout="vertical"
        size='small'
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
          position: 'bottom',
          style: { bottom: 0, position: 'sticky', backgroundColor: 'white', zIndex: 10 },
        }}
        dataSource={blogs}
        renderItem={(blog) => (
        <Link to={`/blog/${blog._id}`}>
          <List.Item
            key={blog.title}
            actions={[
              <span><StarOutlined /> {blog.stars}</span>,
              <span><LikeOutlined /> {blog.likes ? blog.likes.length : 0}</span>,
              <span><MessageOutlined /> {blog.comments}</span>,
            ]}
            extra={
              <img
                className='w-40 h-40'
                alt='cover Image'
                src={blog.imageUrl}
                style={{ objectFit: 'cover' }} // Ensures the image covers the space without distortion
              />
            }
          >
            <List.Item.Meta
              title={<a href={blog.href} style={{ display: 'block', color: 'blue', fontWeight: 'bold' }}>{blog.title}</a>}
              description={<span>{blog.description}</span>}
            />
          </List.Item>
        </Link>
        )}
      />
    </div>
  );
};

export default UserBlogs;
