import { useForm, Controller } from "react-hook-form";
import Input from "../../CommonComponents/Input";
import { HiOutlineMail } from "react-icons/hi";
import PasswordInput from "../../CommonComponents/PasswordInput";
import { IoIosLock } from "react-icons/io";
import SubmitButton from "../../CommonComponents/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { loginUser } from "../auth/authUser";
import { useDispatch } from "react-redux";
import { setTokens } from "../../Redux/AuthSlice";
import { toast } from "react-toastify";

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Please wait while we are checking your credentials..");

    try {
      const response = await loginUser(data);
      console.log(response.message);

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        dispatch(setTokens({ accessToken, refreshToken }));
        toast.update(toastId, {
          render: "Login successful",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        return navigate("/home");
      } else {
        toast.update(toastId, {
          render: "Login failed: " + response.data || "An error occurred",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Login failed: " + error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-2 flex justify-center items-center relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col ${errors.Input ? "gap-2" : "gap-1"} rounded-2xl`}
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
        <div className="flex gap-6 my-2 justify-between">
          <Controller
            name="terms"
            control={control}
            rules={{ required: "You must agree to the terms and conditions" }}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                className="text-xs"
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Terms And Condition
              </Checkbox>
            )}
          />
          <Link className="hover:text-primary text-xs hover:underline">
            Forgot Password
          </Link>
        </div>
        {errors.terms && <span className="text-red-500">{errors.terms.message}</span>}
        <SubmitButton type="submit">Login</SubmitButton>
        <div>

        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;
