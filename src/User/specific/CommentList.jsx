import React from "react";
import PropTypes from 'prop-types';
import AvatarBtn from "../component/Avatar";
import { IoIosTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { deleteComment } from "../auth/deleteApi";
import { message } from "antd";
import { formatTimeDifference } from "../../Services/formatTimeDifference";

const CommentList = ({ comments, authorId, postId, onNewComment }) => {
  const {user} = useSelector(state => state.user)

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteComment(commentId, postId);
      if (response.status === 200) {
        onNewComment(response.data.result.comments);
        message.success('Comment deleted successfully');
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      message.error('Failed to delete comment');
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-[300px] no-scrollbar shadow-2xl p-4 rounded-lg bg-white dark:bg-primary-dark">
      {comments.length > 0 ? (
        comments.map((item) => (
          <div className="flex flex-col p-4 rounded-lg shadow-inner bg-gray-100 dark:bg-gray-800" key={item.id || item.content}>
            <div className="flex items-center gap-3 mb-2">
              <AvatarBtn
                image={item.author.profilePicture && item.author.profilePicture}
                spell={item.author.userName.charAt(0).toUpperCase()}
              />
              <div className="flex justify-between w-full">
                <h3 className="font-medium">{item.author.userName}</h3>
                <h3 className="text-xs text-gray-500 dark:text-gray-400 font-light">
                  {formatTimeDifference(item.createdAt)} ago
                </h3>
              </div>
            </div>
            <div className="relative">
              <p className="w-56 text-balance break-words whitespace-pre-wrap mb-2">{item.content}</p>
              {(item.author._id === user._id || authorId === user._id) && (
                <IoIosTrash
                  onClick={() => handleDeleteComment(item._id)}
                  className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

// Define propTypes
CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  authorId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  onNewComment: PropTypes.func.isRequired,
};

export default CommentList;
