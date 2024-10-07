import { useForm } from "react-hook-form";
import { GoPaperAirplane } from "react-icons/go";
import { postChatMessage } from "../../auth/postApi";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeMessage } from "../../Redux/messageSlice";
import { Input, Button, Popconfirm, message } from "antd"; // Added message from Ant Design
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs"; // Emoji icon for toggling
import FileShare from "./FileShare";
import { IoIosTrash } from "react-icons/io";

const { TextArea } = Input;

const SendChat = () => {
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected file
  const [loading, setLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Check if there's no message and no selected image
    if (!data.message.trim() && !selectedImage) {
      message.error("Please enter a message or select a file to send."); // Show error message
      return; // Prevent submission
    }

    try {
      setLoading(true); // Set loading to true
      const formData = new FormData(); // Create a FormData object
      formData.append("message", data.message); // Append the message
      if (selectedImage) {
        formData.append("file", selectedImage); // Append the selected image if available
      }

      const response = await postChatMessage(selectedChatUser, formData); // Pass formData to API
      dispatch(addRealTimeMessage(response.response)); // Update the chat messages in Redux

      reset(); // Reset the form after successful submission
      setSelectedImage(null); // Reset the selected image after submission
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false); // Reset loading state
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
  const onEmojiClick = (event) => {
    const currentMessage = watch("message") || ""; // Get the current message
    setValue("message", currentMessage + event.emoji); // Append the selected emoji
  };

  // To sync react-hook-form with TextArea value
  const messageValue = watch("message"); // Watching message field

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null); // Reset the selected image
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full items-center w-full gap-x-5 relative">
      <div className="relative">
        <div className="flex gap-4">
          <FileShare setSelectedImage={setSelectedImage} />
          <button
            type="button"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)} // Toggle emoji picker
            className="text-xl"
          >
            <BsEmojiSmile />
          </button>
        </div>

        {emojiPickerOpen && (
          <div className="absolute bottom-12 left-0 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      {/* Selected Image Preview with Remove Button */}
      {selectedImage && (
        <div className="absolute bottom-full left-5 mb-2 z-50 bg-white p-2 shadow-lg rounded-md">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-[550px] h-[300px] object-cover" />
          <Popconfirm
            title="Are you sure you want to remove this image?"
            onConfirm={handleRemoveImage} // Call handleRemoveImage on confirmation
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className="absolute top-0 bg-red-400 shadow-xl rounded-full m-1 right-0 p-1">
              <IoIosTrash className="text-xl" /> {/* Trash icon */}
            </button>
          </Popconfirm>
        </div>
      )}

      <TextArea
        placeholder="Type a message..."
        value={messageValue} // Use the watched value here
        {...register("message")}
        onChange={(e) => setValue("message", e.target.value)} // Sync input with react-hook-form
        onKeyDown={handleKeyDown}
        className="bg-text-primary border-0 w-full mt-0 p-2 text-sm"
        autoSize={{ minRows: 1, maxRows: 3 }}
      />

      <Button 
        type="submit" 
        loading={loading} 
        disabled={loading} 
        className="bg-transparent hover:scale-110 border-0 p-2"
      >
        <GoPaperAirplane />
      </Button>
    </form>
  );
};

export default SendChat;
