import { message } from "antd";
import React, { useState, useEffect } from "react";
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { createPost, deleteImageCloud } from "../auth/authUser";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [editorValue, setEditorValue] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const onEditorChange = (e) => {
    setEditorValue(e.target.value);
    setValue('body', <div className="text-black dark:text-white">${e.target.value}</div>);
  };

  const onImageUpload = (url) => {
    setImageUrl(url);
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      message.error('Please upload an image before submitting the blog');
      return;
    }

    data.body = editorValue;
    data.imageUrl = imageUrl;
    try {
      setSubmitted(true); // Set submitted to true when the form is submitted
      const response = await createPost(data, 'blog');
      message.success('Successfully Created Blog');
      reset();
      setEditorValue('');
      setImageUrl(null);
      navigate('/profile')
    } catch (error) {
      console.log('Error creating blog', error);
      message.error('Error creating blog');
      setSubmitted(false); // Reset submitted to false in case of an error
    }
  };

  const editorStyles = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    minHeight: '200px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    maxWidth: '100%',
    width: '100%',
  };

  return (
    <div className="flex flex-col w-[370px] md:w-full justify-center border-dotted border rounded-lg items-center h-fit p-4 md:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <div className="mb-4">
          <input 
            placeholder="Title" 
            {...register("title", { required: true })} 
            className="border border-blue-600 w-full rounded-lg p-2 "
          />
        </div>

        <div className="mb-4">
          <Editor
            containerProps={{ style: { resize: 'vertical' } }}
            value={editorValue}
            onChange={onEditorChange}
            placeholder="Write your blog content here"
            style={editorStyles}
          />
        </div>
        <UploadImage 
          title={'Upload Cover Image'} 
          onImageUpload={onImageUpload} 
          ratio={16/6}
          imageUrl={imageUrl}
          submitted={submitted}
        />
        <button 
          type="submit" 
          className="mt-4 w-full border rounded-lg p-2 border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
          size="large"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;