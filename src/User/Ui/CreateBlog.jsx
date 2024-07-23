import { message } from "antd";
import React, { useState, useEffect } from "react";
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { createPost, deleteImageCloud } from "../auth/authUser";
import UploadImage from "./UploadImage";

const CreateBlog = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [editorValue, setEditorValue] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [tempImage, setTempImage] = useState(null); // State for temporary image URL
  const [submitted, setSubmitted] = useState(false);

  const onEditorChange = (e) => {
    setEditorValue(e.target.value);
    setValue('body', e.target.value);
  };

  const onImageUpload = (url) => {
    setImageUrl(url);
    setTempImage(url); // Set temporary image URL
  };

  const deleteImage = async (url) => {
    try {
      await deleteImageCloud(url);
      message.success('Temporary image deleted');
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  useEffect(() => {
    return () => {
      if (!submitted && tempImage) {
        deleteImage(tempImage);
        setImageUrl(null);
        console.log('deleted');
      }
    };
  }, [submitted, tempImage]);

  const onSubmit = async (data) => {
    if (!imageUrl) {
      message.error('Please upload an image before submitting the blog');
      return;
    }

    data.body = editorValue;
    data.imageUrl = imageUrl;
    try {
      console.log('Form Data:', data);
      const response = await createPost(data, 'blog');
      message.success('Successfully Created Blog');
      reset();
      setEditorValue('');
      setTempImage(null);
      setSubmitted(true);
      console.log('Blog created successfully', response.data);
    } catch (error) {
      console.log('Error creating blog', error);
      message.error('Error creating blog');
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
        <UploadImage title={'Upload Cover Image'} onImageUpload={onImageUpload} setTempImage={setTempImage} />
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
