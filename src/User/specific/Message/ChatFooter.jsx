import React from 'react'
import SendChat from './SendChat';

const ChatFooter = () => {
  return (
    <div className=' bg-selected-light dark:bg-text-primary  h-10 rounded-lg dark:text-white flex items-center  px-5 gap-x-4'>
     <SendChat/>
    </div>
  )
}

export default ChatFooter