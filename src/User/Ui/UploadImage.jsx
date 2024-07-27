
import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Typography, Upload } from 'antd';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import { uploadImageCloud, deleteImageCloud } from '../auth/authUser';

const { Text } = Typography;
const { Dragger } = Upload;

const UploadImage = ({ onImageUpload, imageUrl, ratio, submitted }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    let timer;
    if (uploadedImage && !submitted) {
      timer = setTimeout(async () => {
        
      }, 5000); // 5 seconds
    }
    return () => clearTimeout(timer);
  }, [uploadedImage, submitted, onImageUpload]);

  const customUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(imageUrl);
    if (imageUrl) {
      try {
        await deleteImageCloud(imageUrl);
        message.success("Previous image has been deleted.");
        setUploadedImage(null);
      } catch (error) {
        console.error('Error deleting image:', error);
        // message.error(`Failed to remove previous image.`);
      }
    }
    try {
      const response = await uploadImageCloud(formData);
      const imageUrl = response.data.response.secure_url;
      setUploadedImage(imageUrl);
      onSuccess(response.data);
      onImageUpload(imageUrl);
      message.success(`${file.name} has been uploaded successfully.`);
    } catch (error) {
      onError(error);
      message.error(`Failed to upload ${file.name}.`);
    }
  };

  const handleRemove = async (file) => {
    if (uploadedImage) {
      try {
        await deleteImageCloud(uploadedImage);
        message.success("Image has been deleted.");
        setUploadedImage(null);
      } catch (error) {
        console.error('Error deleting image:', error);
        message.error(`Failed to remove image.`);
      }
    }
  };

  const onPreview = async (file) => {
    const src = file.url || (await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }));
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" alt="image preview" />`);
  };

  const props = {
    name: 'file',
    customRequest: customUpload,
    maxCount: 1,
    onRemove: handleRemove,
    onChange(info) {
      if (info.file.status === 'error') {
        message.error(`Failed to upload ${info.file.name}.`);
      }
    },
    onPreview,
  };

  return (
    <ImgCrop
      rotationSlider
      aspect={ratio}
      showGrid={true}
      gridGap={1}
      cropperProps={{ objectFit: 'contain' }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
        {uploadedImage && (
          <>
            <br />
            <Text type="warning" className="text-xs">
              Please do not refresh the page, or the uploaded image will be lost.
            </Text>
          </>
        )}
      </Dragger>
    </ImgCrop>
  );
};

UploadImage.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  ratio: PropTypes.number.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default UploadImage;