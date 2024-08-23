import { useForm } from "react-hook-form";
import { GoPaperAirplane } from "react-icons/go";

const SendChat = () => {
  const { register, handleSubmit, reset } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full items-center w-full gap-x-5">
      <input
        type="text"
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
