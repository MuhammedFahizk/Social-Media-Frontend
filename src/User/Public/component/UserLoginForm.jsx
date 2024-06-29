
import {  useForm } from 'react-hook-form'
import Input from '../../../CommonComponents/Input';
import { HiOutlineMail } from 'react-icons/hi';
import PasswordInput from '../../../CommonComponents/PasswordInput';
import { EyeOutlined } from '@ant-design/icons';
import SubmitButton from '../../../CommonComponents/SubmitButton';
const UserLoginForm = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
  return (

    <form action="" 
    onSubmit={handleSubmit((data) => console.log(data))}
     className=' border flex flex-col gap-2  shadow-2xl p-10 rounded-2xl'>
        <Input
        name="Email"
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
        >
        </Input>
        
        <PasswordInput
        name="password"
        type="password"
        placeholder="Password"
        control={control}
        rules={{
          required: "Password is a required field",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
        />
        < SubmitButton type={'submit'}   >Login</SubmitButton>
    </form>
   
  )
}

export default UserLoginForm