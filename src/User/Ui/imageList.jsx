import { useEffect, useState, useCallback } from 'react';
import { MessageOutlined } from "@ant-design/icons";
import LikePost from "./LikePost";
import { IoSettingsOutline } from "react-icons/io5";
import Modal from "./Modal";
import CreateComment from "./CreateComment";
import AvatarBtn from "../component/Avatar";

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
    // Update comments locally
    setComments((prevComments) => [...prevComments, newComment]);

    // Update the data array in the parent component
    if (selectedImage) {
        setSearchResults((prevData) =>
        prevData.map((item) =>
          item._id === selectedImage._id
            ? { ...item, comments: [...item.comments, newComment] }
            : item
        )
      );
    }
  }, [selectedImage, setSearchResults]);

  useEffect(() => {
    // Optional: Sync comments when selectedImage changes (if data updates outside this component)
    if (selectedImage) {
      setComments(selectedImage.comments);
    }
  }, [selectedImage]);

  return (
    <div className="grid grid-cols-2  overflow-y-scroll no-scrollbar">
      {data.map((item, index) => (
        <div key={index} className="relative group" onClick={() => handleOpenModal(item)}>
          <img alt="example" src={item.imageUrl} className="object-cover w-full" />
          <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center bg-black bg-opacity-50 z-10 text-white font-bold">
            <LikePost id={item._id} likes={item.likes} />
            <div className="flex gap-2 h-full items-center">
              <MessageOutlined className="text-xl ml-2 cursor-pointer" />
              <h3>{item.comments.length}</h3>
            </div>
            {owner && (
              <IoSettingsOutline className="text-2xl ml-2 cursor-pointer" />
            )}
          </div>
        </div>
      ))}
      {selectedImage && (
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="flex w-[800px] h-[500px]">
            <img alt="example" src={selectedImage.imageUrl} className="rounded-lg object-cover w-1/2" />
            <div className="w-[400px] p-3 bg-white dark:bg-primary-dark">
              <CreateComment id={selectedImage._id} onNewComment={handleNewComment} />
              <div className="p-3 my-2 rounded-lg bg-white dark:bg-primary-dark overflow-y-scroll no-scrollbar h-[300px] shadow-2xl flex flex-col">
                {comments.length > 0 ? comments.map((comment) => (
                  <div className="flex flex-col mx-auto w-full" key={comment.id || comment.content}>
                    <div className="flex gap-2 h-full items-center">
                      <AvatarBtn
                        image={comment.author.profilePicture}
                        spell={comment.author.userName.charAt(0).toUpperCase()}
                      />
                      <h3 className="font-semibold">{comment.author.userName}</h3>
                    </div>
                    <div className="my-1 mx-9 p-1 border px-5 w-fit rounded-lg">
                      <p className="text-base">{comment.content}</p>
                    </div>
                  </div>
                )) : <p>No comments yet.</p>}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageList;
