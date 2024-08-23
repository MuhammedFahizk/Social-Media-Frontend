import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { resetPassword } from "../../auth/postApi";

const EditPassword = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      return "weak";
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[^A-Za-z0-9]/)
    ) {
      return "strong";
    }
    return "medium";
  };

  const onSubmit = async (data) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        notification.error({
          message: "Password Mismatch",
          description: "New password and confirm password do not match.",
        });
        return;
      }

      const response = await resetPassword({ currentPassword, newPassword });

      notification.success({
        message: "Password Updated Successfully",
        description:
          response?.message || "Your password has been updated successfully.",
      });

      // Optionally, reset form fields or redirect the user
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    } catch (error) {
      // Extract and display error message
      const errorMessage =
        error?.error || "Failed to update password. Please try again later.";
      notification.error({
        message: "Error Updating Password",
        description: errorMessage,
      });
      console.error("Error updating password:", errorMessage);
    }
  };

  return (
    <div className="settings-password max-w-md p-4 bg-white dark:bg-secondary-dark rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-black dark:text-white">
        Change Password
      </h2>
      <Form onFinish={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Item
          label={
            <span className="text-gray-600 dark:text-gray-200">
              Current Password
            </span>
          }
          className="flex flex-col space-y-2"
        >
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: "Current password is required" }}
            render={({ field }) => (
              <>
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Current Password"
                  className="border border-gray-300 rounded-md p-2 w-[250px] ms-auto flex"
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1 w-[250px] ms-auto flex">
                    {errors.currentPassword.message}
                  </p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-gray-600 dark:text-gray-200">
              New Password
            </span>
          }
          className="flex flex-col space-y-2"
        >
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            }}
            render={({ field }) => (
              <>
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="New Password"
                  className="border border-gray-300 rounded-md p-2 w-[250px] ms-auto flex"
                  aria-label="New Password"
                  onChange={(e) => {
                    field.onChange(e);
                    setPasswordStrength(checkPasswordStrength(e.target.value));
                  }}
                />
                <div
                  className={`password-strength text-sm mt-1 ${passwordStrength}`}
                >
                  {passwordStrength && (
                    <p
                      className={`font-semibold w-[250px] ms-auto flex ${
                        passwordStrength === "weak"
                          ? "text-red-500"
                          : passwordStrength === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength === "weak" && "Weak password"}
                      {passwordStrength === "medium" &&
                        "Medium strength password"}
                      {passwordStrength === "strong" && "Strong password"}
                    </p>
                  )}
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1 w-[250px] ms-auto flex">
                    {errors.newPassword.message}
                  </p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-gray-600 dark:text-gray-200">
              Confirm New Password
            </span>
          }
          className="flex flex-col space-y-2"
        >
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            }}
            render={({ field }) => (
              <>
                <Input.Password
                  {...field}
                  prefix={<LockOutlined />}
                  placeholder="Confirm New Password"
                  className="border border-gray-300 rounded-md p-2 w-[250px] ms-auto flex"
                  aria-label="Confirm New Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 w-[250px] ms-auto flex">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </>
            )}
          />
        </Form.Item>

        <Form.Item className="mt-4 w-[250px] ms-auto ">
          <Button
            htmlType="submit"
            block
            className="bg-text-primary text-white font-bold border-0 px-5 ms-auto rounded-md py-2"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
      <h3 className="text-sm text-gray-600 dark:text-gray-300  w-fit m-4  flex ms-auto">
        Forgot password?
      </h3>
    </div>
  );
};

export default EditPassword;
