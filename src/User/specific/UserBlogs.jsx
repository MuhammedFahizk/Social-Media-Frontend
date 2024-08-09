import React, { useState } from 'react';
import { List, Card, Row, Col } from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostOwner from './PostOwner';
import LikePost from './LikePost';
const UserBlogs = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
    const { _id } = useSelector((state) => state.user);
  const [owner, setOwner] = useState(false);
  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the blogs array to get only the blogs for the current page
  const paginatedBlogs = blogs.slice(startIndex, endIndex);

  return (
    <div className="list-container">
      <Row gutter={[16, 16]}>
        {paginatedBlogs.map((blog) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blog._id}>
            <Link to={`/blog/${blog._id}`}>
              <Card
              className='bg-white dark:bg-secondary-dark dark:border-primary-dark'
                hoverable
                cover={
                  <img
                    alt="cover"
                    src={blog.imageUrl}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                
                
              >
                <Card.Meta
                  title={<a style={{ color: 'blue', fontWeight: 'bold' }}>{blog.title}</a>}
                />
                <div className="flex justify-between items-center my-2 ">
                <LikePost id={blog._id} likes={blog.likes} />
                <div className="flex gap-2 items-center">
                  <MessageOutlined className="text-md dark:text-white cursor-pointer" />
                  <h3 className="dark:text-white">{blog.comments.length > 0 && blog.comments.length}</h3>
                </div>
                {_id === blog.author._id && <PostOwner id={blog._id} />}
              </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <List
        pagination={{
          current: currentPage,
          total: blogs.length,
          pageSize,
          onChange: handlePageChange,
          position: 'bottom',
          style: { position: 'sticky', bottom: 0, zIndex: 10, backgroundColor: 'white' },
        }}
        renderItem={() => null} // Prevent rendering of list items as they're now rendered using Card components
      />
    </div>
  );
};

export default UserBlogs;
