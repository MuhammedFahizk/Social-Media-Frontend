import { useForm } from "react-hook-form";
import { GoPaperAirplane } from "react-icons/go";
import { postChatMessage } from "../../auth/postApi";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeMessage } from "../../Redux/messageSlice";
import { Input } from "antd"; // Importing TextArea from Ant Design
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs"; // Emoji icon for toggling

const { TextArea } = Input;

const SendChat = () => {
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false); // State to control emoji picker
  const dispatch = useDispatch();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await postChatMessage(selectedChatUser, data.message);
      dispatch(addRealTimeMessage(response.response));
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Custom handler to detect Enter and Shift + Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)(); // Trigger form submission
    }
  };

  // Function to handle emoji selection
  const onEmojiClick = (event, ) => {
    
    const currentMessage = watch("message") || ""; // Get the current message
    setValue("message", currentMessage + event.emoji); // Append the selected emoji
  };

  // To sync react-hook-form with TextArea value
  const messageValue = watch("message"); // Watching message field

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full items-center w-full gap-x-5">
      <div className="relative">
        <button
          type="button"
          onClick={() => setEmojiPickerOpen(!emojiPickerOpen)} // Toggle emoji picker
          className="p-2 text-xl"
        >
          <BsEmojiSmile />
        </button>
        {emojiPickerOpen && (
          <div className="absolute bottom-12 left-0 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <TextArea
        placeholder="Type a message..."
        value={messageValue} // Use the watched value here
        {...register("message", { required: true })}
        onChange={(e) => setValue("message", e.target.value)} // Sync input with react-hook-form
        onKeyDown={handleKeyDown} // Handle Enter/Shift+Enter behavior
        className="bg-text-primary border-0 w-full mt-0 p-2 text-sm"
        autoSize={{ minRows: 1, maxRows: 3 }} // Auto adjust height based on content
      />

      <button type="submit" className="bg-transparent hover:scale-110 border-0 p-2">
        <GoPaperAirplane />
      </button>
    </form>
  );
};

export default SendChat;
