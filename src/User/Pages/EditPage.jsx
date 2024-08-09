import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../auth/getApi';
import CreateStory from '../specific/CreateStory';
import CreateBlog from '../specific/CreateBlog';
import CreateImage from '../specific/CreateImage';
import { data } from 'autoprefixer';

const EditPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [contentType, setContentType] = useState('');

  useEffect(() => {
    const fetchEditPost = async () => {
      try {
        const response = await fetchPost(id);
        setPost(response.data);
        setContentType(response.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchEditPost();
  }, [id]);

  return (
    <div>
      {contentType === 'story' && <CreateStory  />}
      {contentType === 'blog' && <CreateBlog data={post} onEdit={true} />}
      {contentType === 'image' && <CreateImage data={post} onEdit={true} />}
    </div>
  );
};

export default EditPage;
