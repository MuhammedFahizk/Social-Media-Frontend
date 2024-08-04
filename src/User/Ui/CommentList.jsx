import React from "react";
import PropTypes from 'prop-types';
import AvatarBtn from "../component/Avatar";
import { IoIosTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { deleteComment } from "../auth/deleteApi";
import { message } from "antd";

const CommentList = ({ comments, authorId, postId, onNewComment }) => {
  const { user } = useSelector((state) => state);

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
    <div className="flex-col flex gap-4 overflow-y-auto h-[300px] no-scrollbar shadow-2xl p-2 rounded-lg">
      {comments.length > 0 ? (
        comments.map((item) => (
          <div className="flex flex-col" key={item.id || item.content}>
            <div className="flex gap-3 h-full items-center">
              <AvatarBtn
                image={item.author.profilePicture && item.author.profilePicture}
                spell={item.author.userName.charAt(0).toUpperCase()}
              />
              <h3>{item.author.userName}</h3>
            </div>
            <div className="my-1 mx-9 p-2 flex items-start h-full justify-between border rounded-lg">
              <p>{item.content}</p>
              {(item.author._id === user._id || authorId === user._id) && (
                <IoIosTrash
                  onClick={() => handleDeleteComment(item._id)}
                  className="text-red-500 cursor-pointer"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
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
