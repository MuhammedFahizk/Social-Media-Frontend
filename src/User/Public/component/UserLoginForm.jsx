import { useForm, Controller } from "react-hook-form";
import Input from "../../../CommonComponents/Input";
import { HiOutlineMail } from "react-icons/hi";
import PasswordInput from "../../../CommonComponents/PasswordInput";
import { IoIosLock } from "react-icons/io";
import SubmitButton from "../../../CommonComponents/SubmitButton";
import { Link, useNavigate,  } from "react-router-dom";
import { Checkbox } from "antd";
import { loginUser } from "../../../api/authUser";
import { useState } from "react";
const UserLoginForm = () => {
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await loginUser(data);
      console.log(response);
      response.data & setError(response.data);
      console.log(response,'fsd');
      // dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken }));

     navigate('/home')
    } catch (error) {
      setError(error);
      console.log("axios Error", error);
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="     h-full flex justify-center items-center relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col ${
          errors.Input ? "gap-2" : "gap-1"
        } text-white p-10 rounded-2xl`}
      >
        <h1 className="text-primary">Welcome Back</h1>
        <h3>
          Create New Account?
          <Link to="/signup" className="text-secondary mx-2">
            Sign Up
          </Link>
        </h3>
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
        <div className="flex   justify-between">
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
          <Link className="hover:text-primary hover:underline">
            Forgot Password
          </Link>
        </div>
        {errors.terms && (
          <span className="text-red-500">{errors.terms.message}</span>
        )}
        {error ? <span className="text-red-500">{error}</span> : null}
        <SubmitButton type="submit">Login</SubmitButton>
      </form>
    </div>
  );
};

export default UserLoginForm;
