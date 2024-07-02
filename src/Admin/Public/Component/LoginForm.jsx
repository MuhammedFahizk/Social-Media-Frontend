import { useForm } from "react-hook-form";
import Input from "../../../CommonComponents/Input";
import SubmitButton from "../../../CommonComponents/SubmitButton";
import { HiOutlineMail } from "react-icons/hi";
import { EyeOutlined } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { loginAdmin } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../../../Redux/AuthSlice";

import { useDispatch } from "react-redux";

import { useState } from "react";
const LoginForm = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await loginAdmin(data);
      console.log(response);
      dispatch(setTokens({ accessToken: response.accessToken, refreshToken: response.refreshToken, isAdmin: true }));
      navigate("/admin");
    } catch (error) {
      setError(error.message);
      console.log("axios Error", error);
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 shadow-2xl p-10 rounded-t-3xl sm:border border-black">
      <form
        className={`flex ${
          Object.keys(errors).length > 0 ? "gap-1" : "gap-4"
        } flex-col`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h2>WELCOME BACK</h2>
          <h1>Log In to your Account</h1>
        </div>
        <Input
          name="email"
          type="text"
          placeholder="Email"
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

        <Input
          name="password"
          type="password"
          placeholder="Password"
          control={control}
          icon={<EyeOutlined />}
          rules={{
            required: "Password is a required field",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        <p className="text-red-500">{error}</p>

        <SubmitButton type="submit">Sign In</SubmitButton>
      </form>
      <SubmitButton>
        <FcGoogle className="text-2xl mx-2" />
        Login with Google
      </SubmitButton>
    </div>
  );
};

export default LoginForm;
