import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BiSolidMessageDetail } from "react-icons/bi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { IoClose } from "react-icons/io5";
import CreateComment from './CreateComment';
import AvatarBtn from '../component/Avatar';
import { MessageOutlined } from '@ant-design/icons';
const PostComments = ({ id, initialComments }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [comments, setComments] = useState(initialComments || []) // Manage comments state

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleNewComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]) // Add new comment to state
  }

  return (
    <>
     <div className='flex gap-2'>
     <MessageOutlined onClick={toggleDrawer} className='  cursor-pointer' />
     <h3>{comments.length}</h3>
     </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='dark:bg-primary-dark text-black  dark:text-white'
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
                <div className='flex gap-2' key={item.id || item.content}>
                  <AvatarBtn image={item.author.profilePicture} /> {/* Assuming you have user profile picture */}
                  <p>{item.content}</p>
                </div>
              )) : <p>No comments yet.</p>
            }
          </div>
        </div>
      </Drawer>
    </>
  )
}

PostComments.propTypes = {
  id: PropTypes.string.isRequired,
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        profilePicture: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
}

export default PostComments
