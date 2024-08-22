import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Form, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const EditPassword = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    // Replace this with your API call to update the password
    try {
      if (data.newPassword !== data.confirmPassword) {
        notification.error({
          message: 'Password Mismatch',
          description: 'New password and confirm password do not match',
        });
        return;
      }

      // Call your API to update the password here
      // const response = await updatePassword(data);

      notification.success({
        message: 'Password Updated Successfully',
        description: 'Your password has been updated successfully',
      });
    } catch (error) {
      notification.error({
        message: 'Error Updating Password',
        description: 'There was an error updating your password',
      });
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="md:block col-span-3">
      <Form
        onFinish={handleSubmit(onSubmit)}
        className="bg-white dark:bg-secondary-dark p-4 h-[320px] flex flex-col justify-center items-center h-full shadow-lg rounded-md"
      >
        <Form.Item>
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: 'Current password is required' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Current Password"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: 'New password is required' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="New Password"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: 'Please confirm your new password' }}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Confirm New Password"
              />
            )}
          />
        </Form.Item>

        <Form.Item className='w-fit ms-auto'>
          <Button
            htmlType="submit"
            block
            className="bg-text-primary w-fit text-white font-Righteous"
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPassword;
