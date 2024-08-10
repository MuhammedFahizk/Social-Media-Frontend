import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import UploadImage from './UploadImage';
import { createStory } from "../auth/authUser";
import { useNavigate } from 'react-router-dom';

const CreateStory = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  const onImageUpload = (url) => {
    setImageUrl(url);
  };



  const onSubmit = async () => {
    if (!imageUrl) {
      message.error('Please upload an image before submitting the story');
      return;
    }

    const data = { imageUrl };
    try {
      console.log('Form Data:', data);
      const response = await createStory(data, 'story');
      message.success('Successfully Created Story');
      reset();
      setImageUrl(null);
      setSubmitted(true);
      navigate('/profile');
      console.log('Story created successfully', response.data);
    } catch (error) {
      console.log('Error creating story', error);
      message.error('Error creating story');
    }
  };

  return (
    <div className='flex justify-center  bg-secondary-light dark:bg-secondary-dark w-fit mx-auto rounded-lg h-full'>
      <form className='flex-col gap-2 flex w-full p-10' onSubmit={handleSubmit(onSubmit)}>
        <UploadImage 
          title="Upload Story Image" 
          onImageUpload={onImageUpload}
          ratio={9 / 12}
          imageUrl={imageUrl}
          submitted={submitted}
        />
        <button 
          type="submit" 
          className="mt-4 w-full  rounded-lg p-2 bg-ternary-dark  hover:text-white hover:scale-105 transition-all duration-300"
          size="large"
        >
          Create Story
        </button>
      </form>
    </div>
  );
};

export default CreateStory;
