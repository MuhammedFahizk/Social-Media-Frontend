import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../specific/Message/ChatList';
import ChatArea from '../specific/Message/ChatArea';
import { ChooseUser } from '../Redux/chattingSlice';
import { SiGooglemessages } from "react-icons/si";

const MemoizedUserList = memo(UserList);
const MemoizedChatArea = memo(ChatArea);

const Message = () => {
  const dispatch = useDispatch();
  const { chatList, selectedChatUser } = useSelector((state) => state.chatting);

  // When the component mounts, set the first user as selected if not already selected
  useEffect(() => {
    if (chatList.length > 0 && !selectedChatUser) {
      const firstUser = chatList[0];
      dispatch(ChooseUser(firstUser));
    }

    // Cleanup on unmount
 return () => {
      dispatch(ChooseUser(null)); // Clear the selected user on unmount
    };
  }, [chatList, dispatch]);



  return (
    <div className='grid sm:grid-cols-9 justify-center m-0 gap-0 sm:gap-2 p-2 sm:mx-2'>
      <MemoizedUserList />

        <MemoizedChatArea />
     
        
    </div>
  );
};

export default Message;
