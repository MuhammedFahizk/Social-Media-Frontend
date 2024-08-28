import React from 'react'
import {  ChatSender } from './ChatSender'
import { ChatReceiver } from './ChatReceiver'
import { useSelector } from 'react-redux'
const Chatings = ({chats}) => {
  const {user} = useSelector(state => state.user)
  return (
    <div
    className=' border-text-primary border flex flex-col gap-2   p-2 px-6  justify-end rounded-2xl rounded-tl-sm h-full' 
    >{
        chats.map((chat, index) => (
            chat.sender === user._id ? (

                <ChatSender key={index} chat={chat}/>
            ): (

                <ChatReceiver key={index} chat={chat}/>
            )
        ))
    }
        
    </div>
  )
}

export default Chatings