import { useEffect, useRef } from "react";
import { on, off } from "../../Utils/Socket"; 
import { useDispatch, useSelector } from "react-redux";
import { changeMessageStatus } from "../Redux/messageSlice";

const useMessageDelivered = () => {
  const dispatch = useDispatch();
  const selectedChatUser = useSelector((state) => state.chatting.selectedChatUser);
  const selectedChatUserRef = useRef(selectedChatUser);

  useEffect(() => {
    selectedChatUserRef.current = selectedChatUser;
  }, [selectedChatUser]);

  useEffect(() => {
    const handleDeliveredMessage = (data) => {
      if (data.receiverId === selectedChatUserRef.current) {
        dispatch(changeMessageStatus(data));
      }
    };

    on('messageDelivered', handleDeliveredMessage);

    return () => {
      off('messageDelivered', handleDeliveredMessage);
    };
  }, [dispatch]);

};

export default useMessageDelivered;
