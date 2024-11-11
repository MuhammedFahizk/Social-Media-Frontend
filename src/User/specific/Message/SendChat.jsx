import { useForm } from "react-hook-form";
import { GoPaperAirplane } from "react-icons/go";
import { postChatMessage } from "../../auth/postApi";
import { useDispatch, useSelector } from "react-redux";
import { addRealTimeMessage } from "../../Redux/messageSlice";
import { Input, Button, Popconfirm, message } from "antd";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import FileShare from "./FileShare";
import { IoIosTrash } from "react-icons/io";
const { TextArea } = Input;

const SendChat = () => {
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const messageText = data.message ? data.message.trim() : "";

    // Check if both message and image are empty
    if (!messageText && !selectedImage) {
      message.error("Please enter a message or select a file to send.");
      return;
    }

    try {
      setLoading(true); // Disable further submissions
      const formData = new FormData();
      formData.append("message", messageText);
      if (selectedImage) {
        formData.append("file", selectedImage);
      }

      const response = await postChatMessage(selectedChatUser, formData);
      dispatch(addRealTimeMessage(response.response));

      // Reset the form
      reset();
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false); // Re-enable submissions
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !loading) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onEmojiClick = (event) => {
    const currentMessage = watch("message") || ""; 
    setValue("message", currentMessage + event.emoji);
  };

  const messageValue = watch("message");

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full items-center w-full gap-x-5 relative">
      <div className="relative">
        <div className="flex gap-4">
          <FileShare setSelectedImage={setSelectedImage} />
          <button
            type="button"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
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

      {selectedImage && (
        <div className="absolute bottom-full left-5 mb-2 z-50 bg-white p-2 shadow-lg rounded-md">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-[550px] h-[300px] object-cover" />
          <Popconfirm
            title="Are you sure you want to remove this image?"
            onConfirm={handleRemoveImage}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className="absolute top-0 bg-red-400 shadow-xl rounded-full m-1 right-0 p-1">
              <IoIosTrash className="text-xl" />
            </button>
          </Popconfirm>
        </div>
      )}

      <TextArea
        placeholder="Type a message..."
        value={messageValue}
        {...register("message")}
        onChange={(e) => setValue("message", e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-text-primary border-0 w-full mt-0 p-2 text-sm"
        autoSize={{ minRows: 1, maxRows: 3 }}
      />

      <button
        type="submit"
        disabled={loading} // Disable button when loading
        className={`bg-transparent hover:scale-110 border-0 p-2 ${loading ? "opacity-50" : ""}`}
      >
        <GoPaperAirplane className="text-white text-xl" />
      </button>
    </form>
  );
};

export default SendChat;
