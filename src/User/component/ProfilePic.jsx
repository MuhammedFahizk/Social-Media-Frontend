import { useState } from 'react';
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Modal, Upload } from "antd";
import { FaRegEdit } from "react-icons/fa";
import ImageCrop from './ImageCrop';

const ProfilePic = ({ image, className, owner }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null); // Clear the selected image when closing the modal
  };

  const handleImageChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsModalVisible(true); // Show the modal after selecting an image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <img
          src={image}
          alt="Profile"
          className="rounded-2xl z-30 h-32  w-32 object-cover border border-text-primary"
        />
      ) : (
        <Avatar
          size={160}
          icon={<UserOutlined />}
        />
      )}
      {owner && isHovered && (
        <>
          <Upload
          className="absolute bottom-0 right-0  z-10 inset-0 flex items-center justify-center rounded-lg bg-[#00000090] text-white cursor-pointer"
            id="fileInput"
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageChange}
            style={{ display: 'none' }}
           >
            <div
              className="absolute z-10 inset-0 flex items-center justify-center rounded-lg bg-[#00000090] text-white cursor-pointer"
              aria-label="Edit Profile Picture"
            >
              <FaRegEdit className='text-3xl' />
            </div>
          </Upload>
          
          <Modal
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            centered
            width={800}
          >
            {selectedImage && <ImageCrop image={selectedImage} />}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ProfilePic;
