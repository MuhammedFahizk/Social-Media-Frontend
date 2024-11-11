import { useForm } from "react-hook-form";
import Input from "../../CommonComponents/Input";
import { IoIosUnlock } from "react-icons/io";
import SubmitButton from "../../CommonComponents/SubmitButton";
import { SignUpUser } from "../auth/authUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { setRole, setUser } from "../Redux/UserInformation";

const OtpVerificationForm = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const requestData = { ...data, ...userData };
    setLoading(true);

    try {
      const response = await SignUpUser(requestData);
      console.log(response);
      
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        dispatch(setRole('user'));
        toast.success("OTP verification successful");
        navigate("/home");
      } else {
        toast.error("Failed to verify OTP");
      }
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.error("OTP verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="z-50 border-2 p-10 rounded-2xl border-blue-200 bg-[#0000000c]">
        <div className="flex flex-col gap-2 w-[300px]">
          <h2 className="text-center text-primary">Enter Your OTP Here</h2>
          <Input
            name="otp"
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
          <SubmitButton type="submit" isLoading={loading}>Verify OTP</SubmitButton>
        </div>
      </form>
    </div>
  );
};

OtpVerificationForm.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default OtpVerificationForm;
