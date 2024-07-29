import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AvatarBtn from '../component/Avatar'
import { Button, message } from 'antd'
import { commentPost } from '../auth/authUser'
import PropTypes from 'prop-types'

const CreateComment = ({ id, onNewComment }) => {
  const { user } = useSelector(state => state)
  const [comment, setComment] = useState('') // Manage input state
  const [loading, setLoading] = useState(false) // Manage loading state

  const handleCommentChange = (event) => {
    setComment(event.target.value) // Update comment state
  }

  const handleSubmit = async () => {
    if (comment.trim() === '') {
      message.error('Comment cannot be empty')
      return
    }

    setLoading(true) // Set loading state to true
    try {
      const response = await commentPost(id, comment)
      message.success('Comment posted successfully') // Show success message
      setComment('')
      onNewComment({
        content: comment,
        author:{
            profilePicture: user.profilePicture 
        }
      }) // Notify parent component
    } catch (error) {
      message.error('Failed to post comment')
    } finally {
      setLoading(false) // Set loading state back to false
    }
  }

  const handleCancel = () => {
    setComment('') // Clear the comment input
  }

  return (
    <div className='p-5 gap-4 flex flex-col border-0 shadow-2xl rounded-lg'>
      <div className='flex gap-2'>
        <AvatarBtn image={user.profilePicture} />
        <h2>{user.userName}</h2>
      </div>
      <input
        type="text"
        placeholder='What are your thoughts?'
        className='dark:bg-inherit dark:text-white p-2 active:border-0 text-md font-Jakarta'
        value={comment}
        onChange={handleCommentChange}
      />
      <div className='flex justify-end gap-2 h-full items-center'>
        <h3 className='cursor-pointer' onClick={handleCancel}>Cancel</h3>
        <Button
          className='rounded-full text-white shadow-xl bg-[#beefb6]'
          onClick={handleSubmit}
          loading={loading} // Show loading state
        >
          Respond
        </Button>
      </div>
    </div>
  )
}

CreateComment.propTypes = {
  id: PropTypes.string.isRequired,
  onNewComment: PropTypes.func.isRequired,
}

export default CreateComment
