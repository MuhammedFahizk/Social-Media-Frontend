import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import LikePost from "./LikePost";
import { MessageOutlined } from "@ant-design/icons";
import Modal from "./Modal";
import CreateComment from "./CreateComment";
import PostOwner from "./PostOwner";
import CommentList from "./CommentList";

const UserPosts = ({ images, id, setFilteredPosts }) => {
  const { _id } = useSelector((state) => state.user);
  const [owner, setOwner] = useState(false);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setOwner(id === _id);
  }, [id, _id]);

  const handleOpenModal = useCallback((item) => {
    setComments(item.comments);
    setSelectedImage(item);
    setOpen(true);
  }, []);

  const handleNewComment = useCallback((newComment) => {
    setComments(newComment);
    setFilteredPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === selectedImage._id
          ? { ...post, comments: newComment }
          : post
      )
    );
  }, [selectedImage]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSelectedImage(null);
  }, []);

  const handleDelete = useCallback((deletedId) => {
    setFilteredPosts((prevPosts) => prevPosts.filter(post => post._id !== deletedId));
  }, [setFilteredPosts]);

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-10">
        {images.map((item) => (
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
              {owner && (
                <PostOwner id={item._id} onDelete={handleDelete} />
              )}
            </div></div>
        ))}
      </div>

      {selectedImage && (
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="flex w-[800px] h-[500px]">
            <img alt={selectedImage.hashTag} src={selectedImage.imageUrl} className="rounded-lg object-cover w-1/2" />
            <div className="w-[400px] p-3 bg-white dark:bg-primary-dark">
            <div className="w-full justify-end flex ">
            {owner && (
                <PostOwner id={selectedImage._id} onDelete={handleDelete} />
              )}
            </div>
              <CreateComment postId={selectedImage._id} onNewComment={handleNewComment} />
              <CommentList
                comments={comments}
                authorId={selectedImage.author._id}
                postId={selectedImage._id}
                onNewComment={handleNewComment}
              />
              
              
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

UserPosts.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      _id: PropTypes.string.isRequired,
      hashTag: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  setFilteredPosts: PropTypes.func.isRequired,
};

export default UserPosts;
