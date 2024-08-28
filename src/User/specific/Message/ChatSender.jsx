import React from 'react'

export const ChatSender = ({chat}) => {
  return (
    <div
    className='px-2 bg-primary-light w-fit ms-auto rounded-full text-black rounded-tr-none' 
    >
        {chat.content}
    </div>
  )
}
