import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AvatarBtn from '../component/Avatar';
import { Button, message } from 'antd';
import { commentPost } from '../auth/authUser';
import PropTypes from 'prop-types';

const CreateComment = ({ postId, onNewComment }) => {
  const { user } = useSelector((state) => state);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleSubmit = async () => {
    if (comment.trim() === '') {
      message.error('Comment cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const response = await commentPost(postId, comment);
      message.success('Comment posted successfully');
      setComment('');
      onNewComment(response.data.result.comments);
    } catch (error) {
      console.error('Failed to post comment', error);
      message.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setComment('');
  };

 
  return (
    <div className='p-2 gap-2 bg-white dark:bg-primary-dark flex flex-col border-0 shadow-2xl rounded-lg'>
      <div className='flex gap-2'>
        <AvatarBtn image={user.profilePicture} />
        <h2>{user.userName || 'Anonymous'}</h2>
      </div>
      <textarea
        ref={textareaRef}
        placeholder='What are your thoughts?'
        className='dark:bg-inherit dark:text-white pb-4 px-2 active:border-0 text-md font-Jakarta resize-none overflow-hidden'
        value={comment}
        onChange={handleCommentChange}
        rows={2}
        aria-label='Comment'
      />
      <div className='flex justify-end gap-2 h-full items-center'>
        <h3 className='cursor-pointer' onClick={handleCancel}>Cancel</h3>
        <Button
          className='rounded-full text-white shadow-xl bg-[#beefb6]'
          onClick={handleSubmit}
          loading={loading}
        >
          Respond
        </Button>
      </div>
    </div>
  );
};

CreateComment.propTypes = {
  postId: PropTypes.string.isRequired,
  onNewComment: PropTypes.func.isRequired,
};

export default CreateComment;
