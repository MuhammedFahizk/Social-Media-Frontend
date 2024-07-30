import React, { useState, useEffect } from 'react';
import { PiHandsClapping } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6";
import { likePost, unLikePost } from '../auth/authUser'; // Ensure this path is correct
import { useSelector } from 'react-redux';
const LikePost = ({ likes, id, }) => {
  const {_id} = useSelector(state => state.user)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);

  useEffect(() => {
    setLikeCount(likes ? likes.length : 0);
    setLiked(likes.includes(_id))
  }, [likes]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await unLikePost(id); // Fixed the function name to `unLikePost`
        setLiked(false);
        setLikeCount(prev => prev - 1); // Decrement the like count
      } else {
        await likePost(id);
        setLiked(true);
        setLikeCount(prev => prev+1); // Increment the like count
      }
    } catch (error) {
      console.error('Error handling like/unlike:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {liked ? (
        <FaHandsClapping 
          className={`text-xl cursor-pointer text-[#ffde6f] 
                     transform transition-transform duration-300 
                     ${liked ? 'scale-100 rotate-12' : 'scale-100 rotate-0'}`}
          onClick={handleLikeClick} 
        />
      ) : (
        <PiHandsClapping 
          className={`text-xl cursor-pointer text-gray-400 
                     transform transition-transform duration-300 
                     ${liked ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}
          onClick={handleLikeClick} 
        />
      )}
      <h3 className={`transition-all duration-400 ${liked ? 'text-blue-500' : 'text-gray-600'}`}>
        {likeCount}
      </h3> {/* Display the updated number of likes */}
    </div>
  );
};

export default LikePost;
