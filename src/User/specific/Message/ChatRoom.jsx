import React from "react";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
const ChatRoom = () => {
  return <div
  className="col-span-3 bg-secondary-light flex flex-col   gap-2 dark:bg-ternary-dark rounded-xl p-2" 
  >
    <ChatHeader/>
    <ChatFooter/>
  </div>;
};

export default ChatRoom;
