import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "antd";
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

  const handleNewComment = useCallback(
    (newComment) => {
      setComments(newComment);
      setFilteredPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === selectedImage._id ? { ...post, comments: newComment } : post
        )
      );
    },
    [selectedImage, setFilteredPosts]
  );

  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setSelectedImage(null);
  }, []);

  const handleDelete = useCallback(
    (deletedId) => {
      setFilteredPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedId));
    },
    [setFilteredPosts]
  );

  return (
    <>
      <Row gutter={[16, 16]} className="p-5">
        {images.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <Card
            className="bg-white dark:bg-secondary-dark dark:border-0"
              hoverable
              cover={
                <img
                  alt={item.hashTag}
                  src={item.imageUrl}
                  className="object-cover w-full h-48 rounded-md"
                  onClick={() => handleOpenModal(item)}
                />
              }
            >
              <div className="flex justify-between items-center ">
                <LikePost id={item._id} likes={item.likes} />
                <div className="flex gap-2 items-center">
                  <MessageOutlined className="text-md dark:text-white cursor-pointer" />
                  <h3 className="dark:text-white">{item.comments.length>0 & item.comments.length}</h3>
                </div>
                {owner && <PostOwner id={item._id} onDelete={handleDelete} />}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedImage && (
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="flex flex-col md:flex-row w-full max-w-4xl h-[500px]">
            <div className="md:w-1/2 flex flex-col items-start bg-gray-50 dark:bg-gray-800">
              <img
                alt={selectedImage.hashTag}
                src={selectedImage.imageUrl}
                className="rounded-lg object-cover mb-4 w-full"
              />
              <div className="flex flex-wrap gap-2">
                {selectedImage.hashTags &&
                  selectedImage.hashTags.map((item, index) => (
                    <span key={index} className="text-gray-500 font-Righteous font-light py-1 rounded">
                      {item}
                    </span>
                  ))}
              </div>
            </div>
            <div className="md:w-1/2 p-4 gap-2 flex flex-col bg-white dark:bg-primary-dark overflow-y-auto">
              <div className="flex justify-end">
                {owner && <PostOwner id={selectedImage._id} onDelete={handleDelete} />}
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
