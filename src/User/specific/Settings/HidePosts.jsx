import React, { useState, useEffect } from 'react';
import { fetchHidePosts } from '../../auth/getApi'; // Adjust the path as necessary
import { Card, Spin, Alert, Button } from 'antd';
import { Image } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import { unHideContent } from '../../auth/postApi';
const { Meta } = Card;

const HidePosts = () => {
  const [hidePosts, setHidePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHidePosts = async () => {
      try {
        const response = await fetchHidePosts();
        setHidePosts(response.data); // Adjust based on the structure of the response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadHidePosts();
  }, []);

  const handleUnhide = async (postId) => {
    try {
        const type = 'post'
        const data = {type , id:postId };

      await unHideContent(data);
      setHidePosts(hidePosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Failed to unhide post:', err);
      setError('Failed to unhide post');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Hidden Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hidePosts.map((post) => (
          <Card
            key={post._id}
            cover={<Image alt={post.title} src={post.imageUrl} className="object-cover" />}
            className="shadow-lg rounded-lg border-none dark:bg-gray-700"
            bodyStyle={{ padding: '16px' }}
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{post.content}</p>
              <p className="text-gray-500 dark:text-gray-300">By: {post.author.userName}</p>
            </div>
            <Button 
              className="mt-4 bg-text-primary text-white"
              
              icon={<EyeFilled />}
              onClick={() => handleUnhide(post._id)}
            >
              Unhide
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Add a handler for the unhide action
const handleUnhide = (postId) => {
  // Implement the unhide functionality
  console.log(`Unhide post with ID: ${postId}`);
};

export default HidePosts;
