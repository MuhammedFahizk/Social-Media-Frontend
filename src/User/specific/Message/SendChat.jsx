import { useForm } from "react-hook-form";
import { GoPaperAirplane } from "react-icons/go";
import { postChatMessage } from "../../auth/postApi";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeMessage } from "../../Redux/messageSlice";
const SendChat = () => {

  const { selectedChatUser } = useSelector(state => state.chatting);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch()
  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      console.log(data.message);

      const response = await postChatMessage(selectedChatUser, data.message);
      console.log(response);
      dispatch(addRealTimeMessage(response.response))
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally, you can add additional error handling here (e.g., show a notification)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full items-center w-full gap-x-5">
      <textarea
        type=''
        placeholder="Type a message..."
        {...register("message", { required: true })}
        className="bg-text-primary border-0 w-full h-full p-2 text-sm"
      />
      <button type="submit" className="bg-transparent border-0 p-2">
        <GoPaperAirplane />
      </button>
    </form>
  );
};

export default SendChat;
