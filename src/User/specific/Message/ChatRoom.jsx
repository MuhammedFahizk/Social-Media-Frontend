// components/ChatRoom.js
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { useSelector, useDispatch } from "react-redux";
import Chatings from "./Chatting";
import { fetchUserChat } from "../../auth/getApi";
import { removeMessageCount } from "../../Redux/messageSlice";
import { SiGooglemessages } from "react-icons/si";
import Loading from "../../component/Loading";
import { Spin } from "antd";

// Uncomment and import if you have this action
// import { setChatMessages } from "../../Redux/chattingSlice";

const ChatRoom = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadChatMessages = async () => {
      if (selectedChatUser) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetchUserChat(selectedChatUser);
          console.log("response", response);

          setUser(response.data.user);
          setChats(response.data.chats);
          dispatch(removeMessageCount(response.data.user._id));

          // If you have a Redux action to set chat messages, uncomment and use it
          // dispatch(setChatMessages(response.data));
        } catch (error) {
          console.error("Failed to fetch user chat:", error);
          setError("Failed to load chat data.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadChatMessages();
  }, [selectedChatUser, dispatch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spin/>
   </div>

    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary-light flex flex-col gap-2 dark:bg-ternary-dark rounded-xl p-2">
      {user ? (
        <>
          <ChatHeader user={user} setChats={setChats} />
          <Chatings setChats={setChats} chats={chats} />
          <ChatFooter />
        </>
      ) : (
        <div className='col-span-7 flex flex-col justify-center items-center rounded-lg h-full'>
          <SiGooglemessages className='text-primary text-6xl mb-4 mx-auto' />
          <p className='text-lg text-primary'>Select a user to start chatting</p>
          <p className='text-gray mt-2'>Your messages will appear here once you select a chat.</p>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
