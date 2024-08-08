import React, { useState } from 'react';
import { Card, Col, Row, Pagination, Avatar, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const BlogList = ({ posts, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Calculate the posts to display on the current page
  const currentPosts = posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='m-10'>
      <Row gutter={[16, 16]}>
        {currentPosts.map((postItem, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
           <Link to={`/admin/blog/${postItem._id}`}>
           <Card
              hoverable
              cover={<img alt="example" className='h-40 object-cover' src={postItem.imageUrl} />}
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(postItem._id)}
                />
              ]}
            >
              <Meta
                avatar={<Link to={`/admin/user/${postItem.author._id}`}><Avatar src={postItem.author.profilePicture} /></Link>}
                title={postItem.author.userName}
                description={<p className='h-10'>{postItem.title}</p>}

              />
            </Card></Link>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={posts.length}
        onChange={handlePageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </div>
  );
};

export default BlogList;
