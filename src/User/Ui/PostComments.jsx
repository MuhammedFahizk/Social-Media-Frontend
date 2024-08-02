import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BiSolidMessageDetail } from "react-icons/bi";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { IoClose } from "react-icons/io5";
import CreateComment from './CreateComment';
import AvatarBtn from '../component/Avatar';
import { MessageOutlined } from '@ant-design/icons';

const PostComments = ({ id, initialComments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState(initialComments || []);

  const toggleDrawer = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleNewComment = useCallback((newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
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
          <CreateComment id={id} onNewComment={handleNewComment} />
          <div className='flex-col flex gap-4 overflow-y-auto h-[300px] no-scrollbar shadow-2xl p-2 rounded-lg'>
            {
              comments.length > 0 ? comments.map((item) => (
                <div className='flex flex-col' key={item.id || item.content}>
                  <div className='flex gap-2 h-full items-center'>
                    <AvatarBtn 
                      image={item.author.profilePicture} 
                      // spell={item.author.userName.charAt(0).toUpperCase()} 
                    />
                    <h2>{item.author.userName }</h2>
                  </div>
                  <div className='my-1 mx-9 p-2 border rounded-lg'>
                    <p>{item.content}</p>
                  </div>
                </div>
              )) : <p>No comments yet.</p>
            }
          </div>
        </div>
      </Drawer>
    </>
  );
}

PostComments.propTypes = {
  id: PropTypes.string.isRequired,
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
