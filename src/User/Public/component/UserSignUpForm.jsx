import { useForm, Controller } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import Input from "../../../CommonComponents/Input";
import PasswordInput from "../../../CommonComponents/PasswordInput";
import SubmitButton from "../../../CommonComponents/SubmitButton";
import { FaRegUser } from "react-icons/fa";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { Link, } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { SignUpUser } from "../../../api/authUser";
import { useState } from "react";
import { setTokens } from "../../../Redux/AuthSlice";
import { useDispatch } from "react-redux";
const UserSignUpForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    try {
      const response = await SignUpUser(data);
    response.data & setError(response.data);
    console.log(response,'fsd');
    dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken }));

    navigate("/home");

    
  } catch (error) {
    setError(error);
    console.error("Login failed:", error);
  }
  };

  const password = watch("password");

  return (
    <div className="relative px-20 z-50 w-full  flex flex-col justify-center bg-[#00000000] md:bg-[#f3f1f100] text-white h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-fit  justify-center  rounded-2xl   md:p-10"
      >
        <h3 className="text-end">Start For Free</h3>
        <h1 className="text-primary">Create New Account</h1>
        <h3>
          Already A Member{" "}
          <Link className=" text-secondary hover:underline" to={"/login"}>
            Sign In
          </Link>
        </h3>

        <div className="flex flex-col my-2 gap-2">
          <Input
            name="userName"
            placeholder="User Name"
            type="text"
            icon={<FaRegUser />}
            control={control}
            rules={{
              required: "Name is a required field",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Enter a valid name",
              },
            }}
          />
          <Input
            name="email"
            placeholder="Email"
            type="email"
            control={control}
            icon={<HiOutlineMail />}
            rules={{
              required: "Email is a required field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address",
              },
            }}
          />
          <PasswordInput
            name="password"
            type="password"
            placeholder="Password"
            icon={<IoIosLock />}
            control={control}
            rules={{
              required: "Password is a required field",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
          />
          <PasswordInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            icon={<IoIosUnlock />}
            control={control}
            rules={{
              required: "Confirm Password is a required field",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />
          <Controller
            name="terms"
            control={control}
            rules={{ required: "You must agree to the terms and conditions" }}
            render={({ field }) => (
              <Checkbox
                {...field}
                className="text-white"
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Terms And Condition
              </Checkbox>
            )}
          />
          {errors.terms && (
            <span className="text-red-500">{errors.terms.message}</span>
          )}
        <p className="text-red-500 ">{error}</p>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default UserSignUpForm;
