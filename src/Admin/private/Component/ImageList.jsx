import React from 'react';
import { Avatar, Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const ImageList = ({ posts }) => {
  return (
    <div className='m-10'>
      <Row gutter={[16, 16]}>
        {posts.map((postItem, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt="example" className='h-40 object-cover' src={postItem.imageUrl} />}
            >
               <Meta
                avatar={<Link to={`/admin/user/${postItem.author._id}`}><Avatar src={postItem.author.profilePicture} /></Link>}
                title={postItem.author.userName}
                description={postItem.hashTags.join(' ')}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ImageList;
