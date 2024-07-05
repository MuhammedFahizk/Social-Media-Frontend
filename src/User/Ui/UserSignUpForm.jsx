import { useForm, Controller } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import Input from "../../CommonComponents/Input";
import PasswordInput from "../../CommonComponents/PasswordInput";
import SubmitButton from "../../CommonComponents/SubmitButton";
import { FaRegUser } from "react-icons/fa";
import { IoIosLock, IoIosUnlock } from "react-icons/io";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import PropTypes from 'prop-types';

const UserSignUpForm = ({ onSubmit, btnType }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  return (
    <div className="relative md:px-5 px-2 md:h-fit border-blue-200 h-screen md:h-fi z-50 rounded-xl flex flex-col items-center justify-center bg-[#2f2d2d0a] md:border-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-fit justify-center rounded-2xl md:p-10"
      >
        <h3 className="">Start For Free</h3>
        <h1 className="text-primary">Create New Account</h1>
        <h3>
          Already A Member{" "}
          <Link className="text-secondary hover:underline" to={"/login"}>
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
                checked={field.value}
                className=""
                onChange={(e) => field.onChange(e.target.checked)}
              >
                Terms And Condition
              </Checkbox>
            )}
          />

          {errors.terms && (
            <span className="text-red-500">{errors.terms.message}</span>
          )}

          {btnType ? (
            <SubmitButton type='submit'>Sign Up</SubmitButton>
          ) : (
            <SubmitButton type='submit' isLoading={true}>Sign Up</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
};

UserSignUpForm.propTypes = {
  btnType: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default UserSignUpForm;
