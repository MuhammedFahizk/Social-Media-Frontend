import { message } from "antd";
import React, { useState, useEffect } from "react";
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { createPost } from "../auth/authUser";
import UploadImage from "./UploadImage";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../auth/PutApi";

const CreateBlog = ({ onEdit, data }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [editorValue, setEditorValue] = useState(onEdit && data ? data.body : '');
  const [imageUrl, setImageUrl] = useState(onEdit && data ? data.imageUrl : null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (onEdit && data) {
      setValue('title', data.title);
      setValue('hashTag', data.hashTags.join(''));
      setEditorValue(data.body);
    }
  }, [onEdit, data, setValue]);

  const onEditorChange = (e) => {
    setEditorValue(e.target.value);
    setValue('body', <div className="text-black dark:text-white">${e.target.value}</div>);
  };

  const onImageUpload = (url) => {
    setImageUrl(url);
  };

  const onSubmit = async (formData) => {
    if (!imageUrl) {
      message.error('Please upload an image before submitting the blog');
      return;
    }

    formData.body = editorValue;
    formData.imageUrl = imageUrl;
    
    try {
      setSubmitted(true);
      if (onEdit) {
        await updatePost(data._id, formData);
        message.success('Successfully Updated Blog');
      } else {
        await createPost(formData, 'blog');
        message.success('Successfully Created Blog');
      }
      reset();
      setEditorValue('');
      setImageUrl(null);
      navigate('/profile');
    } catch (error) {
      console.log('Error creating/updating blog', error);
      message.error('Error creating/updating blog');
      setSubmitted(false);
    }
  };

  const editorStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    minHeight: '250px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
    maxWidth: '100%',
    width: '100%',
  };

  return (
    <div className="flex flex-col w-[370px] md:w-[700px] mx-auto lg:w-[900px] justify-center shadow-2xl rounded-lg items-center h-fit p-6 bg-gradient-to-r from-white to-gray-100 dark:from-secondary-dark dark:to-ternary-dark my-4 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-6 space-y-4">
          <input 
            placeholder="Title" 
            {...register("title", { required: true })} 
            className=" dark:bg-ternary-dark bg-secondary-light w-full shadow-2xl  rounded-lg p-3 focus:outline-none focus:border-blue-800 transition-all duration-300"
          />
          <input 
            placeholder="Hash Tag" 
            {...register("hashTag", { required: false })} 
            className=" dark:bg-ternary-dark shadow-2xl bg-secondary-light  w-full rounded-lg p-3 focus:outline-none focus:border-blue-800 transition-all duration-300"
          />
        </div>

        <div className="mb-6 bg-white rounded-lg">
          <Editor
        
            containerProps={{ style: { resize: 'vertical' } }}
            value={editorValue}
            onChange={onEditorChange}
            placeholder="Write your blog content here"
            style={editorStyles}

          />
        </div>
        
        {imageUrl ? (
          <div className="mb-6">
            <img src={imageUrl} alt="Cover" className="rounded-lg w-full h-[300px] object-cover shadow-md" />
          </div>
        ) : (
          <UploadImage 
            title={'Upload Cover Image'} 
            onImageUpload={onImageUpload} 
            ratio={16/6}
            imageUrl={imageUrl}
            submitted={submitted}
          />
        )}

        <button 
          type="submit" 
          className="mt-6 w-full bg-secondary-light text-black dark:text-text-primary dark:bg-secondary-dark rounded-lg p-3 hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-300 shadow-inner"
        >
          {onEdit ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
