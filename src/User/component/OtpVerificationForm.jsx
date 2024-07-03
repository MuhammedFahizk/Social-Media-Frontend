import { useForm, Controller } from "react-hook-form";
import Input from "../../CommonComponents/Input";
import { IoIosUnlock } from "react-icons/io";
import SubmitButton from "../../CommonComponents/SubmitButton";
import { SignUpUser } from "../../api/authUser";
import { useDispatch } from "react-redux";
import { setTokens } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerificationForm = ({ userData }) => {
  const { control, handleSubmit, } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const requestData = { ...data, ...userData };
    console.log("submitted", requestData);

    try {

      const response = await SignUpUser(requestData);
      console.log("response Sign page", response);
      if (response) {
        console.log(response.data);
        dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken }));
        navigate("/home");
        toast.success("OTP verification successful");
      } else {
        toast.dismiss

        toast.error("Failed to verify OTP");

      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Failed to verify OTP");
    }
  };

  return (
    <form className="z-50 border-2 p-10 rounded-2xl border-teal-500" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 w-[300px]">
        <Input
          name="Otp"
          placeholder="Enter OTP"
          type="text"
          icon={<IoIosUnlock />}
          control={control}
          rules={{
            required: "OTP is a required field",
            minLength: {
              value: 6,
              message: "OTP must be at least 6 characters long",
            },
          }}
        />
        <SubmitButton type="submit">Verify OTP</SubmitButton>
      </div>
    </form>
  );
};

export default OtpVerificationForm;
