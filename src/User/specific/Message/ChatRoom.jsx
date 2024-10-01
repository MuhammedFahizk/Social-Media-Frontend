import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { useSelector, useDispatch } from 'react-redux';
import Chatings from "./Chatings";
import { fetchUserChat } from "../../auth/getApi";
// import { setChatMessages } from "../../Redux/chattingSlice"; // Import an action to update chat messages

const  ChatRoom = () => {
  const [user,setUser] = useState([])
  const [chats, setChats] = useState([])
  const dispatch = useDispatch();
  const { selectedChatUser } = useSelector((state) => state.chatting);
  
  
  useEffect(() => {
    const loadChatMessages = async () => {
      if (selectedChatUser) {
        try {
          const response = await fetchUserChat(selectedChatUser);
          console.log('response',response);
          
          setUser(response.data.user)
          setChats(response.data.chats)
          // dispatch(setChatMessages(response.data)); // Assuming setChatMessages is an action to update the chat messages in the Redux store
        } catch (error) {
          console.error("Failed to fetch user chat:", error);
        }
      }
    };

    loadChatMessages();
  }, [selectedChatUser, dispatch]);

  return (
    <div className="col-span-3 bg-secondary-light flex flex-col gap-2 dark:bg-ternary-dark rounded-xl p-2">
      <ChatHeader user={user} />
      <Chatings chats={chats}/>
      <ChatFooter />
    </div>
  );
};

export default ChatRoom;
