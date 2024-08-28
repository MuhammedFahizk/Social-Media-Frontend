import React from 'react'

export const ChatReceiver = ({chat}) => {
  return (
    <div
    className='px-2 bg-primary-light w-fit rounded-full text-black rounded-tl-none' 
    >
        {chat.content}
    </div>
  )
}
