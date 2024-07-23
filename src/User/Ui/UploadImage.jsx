import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button,  message, Typography, Upload } from 'antd';
import PropTypes from 'prop-types'; // Import PropTypes
import { uploadImageCloud } from '../auth/authUser';
const { Text } = Typography;
const UploadImage = ({ onImageUpload, title, setTempImage }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadImageCloud(formData);
      const imageUrl = response.data.response.url;
      setUploadedImage(imageUrl); // Save the uploaded image URL
      onSuccess(response.data);
      onImageUpload(imageUrl); // Pass the URL to parent component
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const handleRemove = async (file) => {
    if (uploadedImage) {
      try {
        setTempImage(null); // Clear temporary image URL
        setUploadedImage(null); // Clear the uploaded image URL state
      } catch (error) {
        console.error('Error deleting image:', error);
        message.error(`${file.name} file removal failed.`);
      }
    }
  };

  const props = {
    name: 'file',
    customRequest: customUpload,
    maxCount: 1,
    onRemove: handleRemove,
    onChange(info) {
      if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>{title}</Button>
      {
        uploadedImage && 
        <><br /><Text type="warning">Please do not refresh the page, or the uploaded image will be lost.</Text></>

      }
    </Upload>
  );
};

UploadImage.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTempImage: PropTypes.func.isRequired,
};

export default UploadImage;
