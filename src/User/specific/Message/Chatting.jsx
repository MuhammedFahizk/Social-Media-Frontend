import React, { useEffect, useRef, useState } from 'react';
import { ChatSender } from './ChatSender';
import { ChatReceiver } from './ChatReceiver';
import { useSelector, useDispatch } from 'react-redux';
import { removeRealTimeMessages, removeMessageStatus, removeMessageCount } from '../../Redux/messageSlice';
import useReadMessageListener from '../../hooks/useReadMessageListener';
import useMessageDelivered from '../../hooks/useMessageDelivered';

const Chatting = ({ chats ,setChats }) => {
  const { user } = useSelector(state => state.user);
  const { realTimeMessages } = useSelector(state => state.message);
  const { selectedChatUser } = useSelector(state => state.chatting);
  const { messageStatusChanges } = useSelector(state => state.message);

  const dispatch = useDispatch();
  useMessageDelivered();
  useReadMessageListener();
  const [messages, setMessages] = useState(chats);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const newMessages = realTimeMessages.filter(chat => chat.sender === selectedChatUser || chat.sender === user._id);

    if (newMessages.length > 0) {
      setMessages(prevMessages => [...prevMessages, ...newMessages]);

      dispatch(removeRealTimeMessages(newMessages.map(message => message._id)));
    }
  }, [realTimeMessages, selectedChatUser, user._id, dispatch]);

  useEffect(() => {
    setMessages(chats);
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    const updatedMessages = messages.map(chat => {
      const statusChange = messageStatusChanges.find(change => change.messageId === chat._id);
      if (statusChange) {
        if (
          (chat.status === 'delivered' && statusChange.status === 'read') || 
          (chat.status !== 'read')
        ) {
          dispatch(removeMessageStatus({ messageId: chat._id }));
          return { ...chat, status: statusChange.status };
        }
      }
      return chat;
    });

    if (JSON.stringify(messages) !== JSON.stringify(updatedMessages)) {
      setMessages(updatedMessages);
    }
    
    
    scrollToBottom();
  }, [messageStatusChanges, messages, dispatch]);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return (
    <div className='border-text-primary border flex flex-col justify-end h-full gap-2 p-2 px-6 rounded-2xl rounded-tl-sm'>
  <div
    className='h-[64vh] sm:h-[60vh] md:h-[78vh] lg:h-[65vh] xl:h-[60vh] overflow-y-scroll no-scrollbar flex flex-col gap-2'
    ref={chatContainerRef}
  >
    {messages.map((chat) => (
      chat.sender === user._id ? (
        <ChatSender key={chat._id || chat.timestamp}  setChats={setChats} chat={chat} />
      ) : (
        <ChatReceiver key={chat._id || chat.timestamp} setChats={setChats} chat={chat} />
      )
    ))}
  </div>
</div>

  );
};

export default Chatting;
