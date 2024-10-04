import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { useSelector, useDispatch } from "react-redux";
import Chatings from "./Chatting";
import { fetchUserChat } from "../../auth/getApi";
import { removeMessageCount } from "../../Redux/messageSlice";
// import { setChatMessages } from "../../Redux/chattingSlice"; // Import an action to update chat messages

const ChatRoom = () => {
  const [user, setUser] = useState([]);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const { selectedChatUser } = useSelector((state) => state.chatting);

  useEffect(() => {
    const loadChatMessages = async () => {
      if (selectedChatUser) {
        try {
          const response = await fetchUserChat(selectedChatUser);
          console.log("response", response);

          setUser(response.data.user);
          setChats(response.data.chats);
    dispatch(removeMessageCount(response.data.user._id))

          // dispatch(setChatMessages(response.data)); // Assuming setChatMessages is an action to update the chat messages in the Redux store
        } catch (error) {
          console.error("Failed to fetch user chat:", error);
        }
      }
    };

    loadChatMessages();
  }, [selectedChatUser, dispatch]);

  return (
    <div className=" bg-secondary-light flex flex-col gap-2 dark:bg-ternary-dark rounded-xl p-2">
      <ChatHeader user={user} setChats={setChats} />
      <Chatings setChats={setChats} chats={chats} />
      <ChatFooter />
    </div>
  );
};

export default ChatRoom;
