import { useEffect } from "react";
import { on, off } from "../../Utils/Socket"; 
import { useDispatch } from "react-redux";
import { addChat } from "../Redux/chattingSlice";

const useNewSender = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewSender = (senderInfo) => {
        console.log(senderInfo);
        
      dispatch(addChat(senderInfo));
    };

    on("newSender", handleNewSender);

    return () => {
      off("newSender", handleNewSender);
    };
  }, [dispatch]);

};

export default useNewSender;
