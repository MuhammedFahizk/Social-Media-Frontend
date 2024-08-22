import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, notification } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { editProfile } from '../../auth/postApi';
const EditProfileForm = () => {
  const user = useSelector((state) => state.user);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await editProfile(data);
      notification.success({
        message: "Profile updated successfully",
        description: "Your profile has been updated successfully",
      });
      // Handle success (e.g., show a notification, update the state, etc.)
    } catch (error) {
      notification.error({
        message: "Error updating profile",
        description: "There was an error updating your profile",
      });
      console.error("Error updating profile:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <Form
    onFinish={handleSubmit(onSubmit)}
    className="col-span-1 md:col-span-3 bg-white dark:bg-secondary-dark p-4 shadow-lg rounded-md"
  >
    <Form.Item>
      <Controller
        name="userName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        )}
      />
    </Form.Item>

    <Form.Item>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            prefix={<MailOutlined />}
            placeholder="Email"
            type="email"
          />
        )}
      />
    </Form.Item>

    <Form.Item>
      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <Input.TextArea
            {...field}
            placeholder="Bio"
            rows={4}
          />
        )}
      />
    </Form.Item>

    <Form.Item className="w-fit ms-auto">
      <Button htmlType="submit" block className="bg-text-primary text-white font-Righteous">
        Save Changes
      </Button>
    </Form.Item>
  </Form>
  )
}

export default EditProfileForm