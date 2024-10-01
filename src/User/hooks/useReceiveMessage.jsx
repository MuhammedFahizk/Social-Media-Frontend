import { useEffect, useRef } from "react";
import { on, off } from "../../Utils/Socket"; 
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeMessage } from "../Redux/messageSlice";
import { messageRead } from "../auth/postApi";

const useReceiveMessage = () => {
  const dispatch = useDispatch();
  const selectedChatUser = useSelector((state) => state.chatting.selectedChatUser);
  const selectedChatUserRef = useRef(selectedChatUser);

  useEffect(() => {
    selectedChatUserRef.current = selectedChatUser;
  }, [selectedChatUser]);

  useEffect(() => {
    const handleReceiveMessage = async (message, callback) => {
      if (message.sender === selectedChatUserRef.current) {
        try {
          await messageRead(message._id);
        } catch (error) {
          console.error("Error updating message status:", error);
        }
        dispatch(addRealTimeMessage(message));
      }

        callback("Message received and processed");
    };

    on("receiveMessage", handleReceiveMessage);

    return () => {
      off("receiveMessage", handleReceiveMessage);
    };
  }, [dispatch]);

};

export default useReceiveMessage;
