import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "./UploadImage";
import { createPost } from "../auth/authUser";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const CreateImage = () => {
  const navigate = useNavigate()

  const [imageUrl, setImageUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit,reset , formState: { errors } } = useForm();

  const onImageUpload = (url) => {
    setImageUrl(url);
  };

  const onSubmit =async (data) => {
    data.imageUrl = imageUrl
    try {
      setSubmitted(true); // Set submitted to true when the form is submitted
      const response = await createPost(data, 'image');
      message.success('Successfully Created Blog');
      reset();
      setImageUrl(null);
      navigate('/profile')
    } catch (error) {
      console.log('Error creating blog', error);
      message.error('Error creating blog');
      setSubmitted(false); // Reset submitted to false in case of an error
    }

    // Handle form submission, e.g., send data to the backend
  };

  return (
    <div className="flex justify-center border-dotted border rounded-lg h-full p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input 
            type="text"
            placeholder="Hash tag"
            {...register("hashTag")}
            className="border p-2 rounded w-full"
          />
          {errors.hashTag && (
            <p className="text-red-500 text-sm mt-1">{errors.hashTag.message}</p>
          )}
        </div>
        <UploadImage 
          title="Upload Cover Image" 
          onImageUpload={onImageUpload} 
          ratio={1/1}
          imageUrl={imageUrl}
          submitted={submitted}
        />
        <button type="submit" className="mt-4 bg-blue-500  w-full text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateImage;
