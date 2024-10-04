import { useEffect } from "react";
import { on, off } from "../../Utils/Socket"; 
import { useDispatch, useSelector } from "react-redux";
import { changeMessageStatus, updateMessageCount } from "../Redux/messageSlice";

const useReadMessageListener = () => {
  const dispatch = useDispatch();
  const selectedChatUser = useSelector((state) => state.chatting.selectedChatUser);

  useEffect(() => {
    const readMessageListener = (data) => {
      console.log("Incoming message:", data);

      // Check if the message is for the currently selected chat user
      if (selectedChatUser && data.receiver === selectedChatUser) {
        console.log("Message for selected chat user:", data);
        dispatch(changeMessageStatus({ messageId: data._id, status: data.status }));
      } 
    };

    // Attach the listener for all messages
    on("readMessage", readMessageListener);

    // Clean up the listener when the component unmounts
    return () => {
      off("readMessage", readMessageListener);
    };
  }, [dispatch, selectedChatUser,]);

};

export default useReadMessageListener;
