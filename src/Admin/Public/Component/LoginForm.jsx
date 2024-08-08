import { useForm } from "react-hook-form";
import Input from "../../../CommonComponents/Input";
import SubmitButton from "../../../CommonComponents/SubmitButton";
import { HiOutlineMail } from "react-icons/hi";
import { EyeOutlined } from "@ant-design/icons";
import { loginAdmin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

import {  toast } from 'react-toastify';


import GoogleLoginBtn from "./GoogleLoginBtn";
const LoginForm = () => {

  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');
    console.log(data);
    try {
      const response = await loginAdmin(data);
      console.log(response);
      toast.update(toastId, { render: "Login successful", type: "success", isLoading: false, autoClose: 4000 });
      navigate("/admin");
    } catch (error) {
      console.log("axios Error", error);
      toast.update(toastId, { render: "Login failed: " + error.message, type: "error", isLoading: false, autoClose: 4000 });
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

        <SubmitButton type="submit">Sign In</SubmitButton>
      </form>
     <GoogleLoginBtn/>
    </div>
    
  );
};

export default LoginForm;
