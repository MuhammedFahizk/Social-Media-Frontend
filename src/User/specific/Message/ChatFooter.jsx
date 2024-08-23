import React from 'react'
import { GoPaperclip } from "react-icons/go";
import SendChat from './SendChat';

const ChatFooter = () => {
  return (
    <div className='bg-text-primary h-10 rounded-lg text-white flex items-center  px-5 gap-x-4'>
      <GoPaperclip/>
     <SendChat/>
    </div>
  )
}

export default ChatFooter