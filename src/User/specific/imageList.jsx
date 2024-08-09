import { useEffect, useState, useCallback } from 'react';
import { MessageOutlined } from "@ant-design/icons";
import LikePost from "./LikePost";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "./Modal";
import CreateComment from "./CreateComment";
import AvatarBtn from "../component/Avatar";
import CommentList from './CommentList';

const ImageList = ({ data, setSearchResults }) => { // Assume `setData` is passed from parent to update `data`
  const [owner, setOwner] = useState(false);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (item) => {
    setComments(item.comments); // Set comments for the selected image
    setSelectedImage(item);    // Set the selected image
    setOpen(true);             // Open the modal
  };

  const handleCloseModal = () => {
    setOpen(false);          // Close the modal
    setSelectedImage(null); // Clear selected image
    console.log('Modal closed, open state:', open);
  };

  const handleNewComment = useCallback((newComment) => {
    setComments( newComment);

    if (selectedImage) {
        setSearchResults((prevPosts) =>
          prevPosts.map((post) =>
            post._id === selectedImage._id
              ? { ...post, comments: newComment }
              : post
          )
          );
    }
  }, [selectedImage]);

  useEffect(() => {
    // Optional: Sync comments when selectedImage changes (if data updates outside this component)
    if (selectedImage) {
      setComments(selectedImage.comments);
    }
  }, [selectedImage]);

  return (
    <div className="grid grid-cols-3 gap-2  overflow-y-scroll no-scrollbar">
        {data.map((item) => (
          <div key={item._id}><div  className="relative group cursor-pointer" onClick={() => handleOpenModal(item)}>
            <img alt={item.hashTag} src={item.imageUrl} className="object-cover w-full rounded-md" />
            <div className="absolute top-0 left-0 rounded-md w-full h-full hidden group-hover:flex items-center justify-center bg-black bg-opacity-50 z-10 text-white font-bold">

            </div>
          </div>
          <div className="flex  gap-2 p-2">
              <LikePost id={item._id} likes={item.likes} />
              <div className="flex gap-2 h-full items-center">
                <MessageOutlined className="text-md ml-2 cursor-pointer" />
                <h3>{item.comments.length}</h3>
              </div>
              
            </div></div>
        ))}
      {selectedImage && (
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="flex w-[800px] h-[500px]">
            <img alt="example" src={selectedImage.imageUrl} className="rounded-lg object-cover w-1/2" />
            <div className="w-[400px] p-3 bg-white dark:bg-primary-dark">
              <CreateComment postId={selectedImage._id} onNewComment={handleNewComment} />
            
              <CommentList comments={comments} authorId={selectedImage.author._id} postId={selectedImage._id} onNewComment={handleNewComment} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageList;
