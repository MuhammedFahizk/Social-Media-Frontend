import { useEffect, useRef } from "react";
import { on, off } from "../../Utils/Socket"; 
import { useDispatch, useSelector } from "react-redux";
import { changeMessageStatus } from "../Redux/messageSlice";

const useReadMessageListener = () => {
  const dispatch = useDispatch();
  const selectedChatUser = useSelector((state) => state.chatting.selectedChatUser);
  const selectedChatUserRef = useRef(selectedChatUser);

  useEffect(() => {
    const readMessageListener = (data) => {
      if (data.receiver === selectedChatUser) {
        console.log('data', data);
        
        dispatch(changeMessageStatus({ messageId: data._id,  status: data.status }));

      }
    };

    on("readMessage", readMessageListener);

    return () => {
    };
  }, [dispatch, selectedChatUser]);

};

export default useReadMessageListener;
