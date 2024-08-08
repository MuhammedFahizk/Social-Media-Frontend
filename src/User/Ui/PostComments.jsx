import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { IoClose } from "react-icons/io5";
import CreateComment from './CreateComment';
import { MessageOutlined } from '@ant-design/icons';
import CommentList from './CommentList';
const PostComments = ({ postId, initialComments, authorId, isAdmin  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState(initialComments || []);
  const toggleDrawer = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleNewComment = useCallback((newComment) => {
    setComments(newComment);
  }, []);

  return (
    <>
      <div className='flex gap-2'>
        <MessageOutlined onClick={toggleDrawer} className='cursor-pointer' />
        <h3>{comments.length}</h3>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='dark:bg-primary-dark text-black dark:text-white'
        size='350px'
        enableOverlay
      >
        <div className='p-5 flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h2>Responses</h2>
            <IoClose className='text-4xl cursor-pointer' onClick={toggleDrawer} />
          </div>
          {
            isAdmin ? (
''
            ):(
            <CreateComment postId={postId} onNewComment={handleNewComment} />
          
          )}
          <CommentList authorId={authorId} postId={postId} onNewComment={handleNewComment}  comments={comments} />
        </div>
      </Drawer>
    </>
  );
}

PostComments.propTypes = {
  postId: PropTypes.string.isRequired,
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        profilePicture: PropTypes.string,
        userName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
}

export default PostComments;
