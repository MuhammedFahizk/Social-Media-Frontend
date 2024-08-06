import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AvatarBtn from '../component/Avatar';
import { incrementViewerCount } from '../auth/postApi';
import { FaRegEye } from "react-icons/fa";
import AvatarGroup from '../Ui/AvatarGroup';
import { useSelector } from 'react-redux';

const StoryView = ({ story, author, onNextUser, onReverse }) => {
  const [item, setItem] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { user } = useSelector(state => state);

  const updateViewers = useCallback(async () => {
    if (story[item]?._id && !story[item].views.includes(user._id)) {
      try {
        await incrementViewerCount(story[item]._id, author._id);
      } catch (error) {
        console.error('Failed to update viewers:', error);
      }
    }
  }, [item, story, author, user]);

  useEffect(() => {
    updateViewers();
  }, [updateViewers]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);
  
  useEffect(() => {
    const changeStoryInterval = setInterval(() => {
      handleChangeItem();
    }, 30000); // Change from 10000 to 30000 for a 30-second interval
    return () => clearInterval(changeStoryInterval);
  }, [item, story]);
  

  const handleChangeItem = () => {
    if (item < story.length - 1) {
      setItem(prev => prev + 1);
      setElapsedTime(0); // Reset elapsed time
    } else {
      setItem(0);
      onNextUser();
      setElapsedTime(0); // Also reset elapsed time when moving to the next user
    }
  };
  

  const handleReverse = () => {
    if (item > 0) {
      setItem(prev => prev - 1);
    } else {
      onReverse();
    }
  };

  return (
    <div className="relative no-scrollbar cursor-pointer">
      <div className="absolute z-50 p-2 flex gap-3 bg-[#06060662] text-white w-full shadow-md top-2 h-fit items-center">
        <AvatarBtn image={author.profilePicture} />
        <h3>{author.userName}</h3>
      </div>
      
      {/* Progress bar */}
      <div className='flex w-full absolute h-4'>
  {story.map((item, index) => {
    return (
      <div key={index} className={`relative h-1.5 z-50 bg-gray-200 rounded-full dark:bg-gray-700 w-1/${story.length}`}>
        <div
          className="absolute h-full bg-blue-600 rounded-full"
          style={{ width: `${(index / story.length) * 100}%` }}
        />
      </div>
    );
  })}
  {story.length > 0 && (
    <span className="ml-auto mr-2 text-black">Elapsed: {elapsedTime}s</span> // Display elapsed time
  )}
</div>



      
      {story.length > 0 && (
        <img
          src={story[item]?.imageUrl || ''}
          alt={`Story ${item + 1}`}
          className="relative z-30 w-[400px] h-full object-cover"
        />
      )}
      <div
        onClick={handleReverse}
        className="absolute w-1/2 h-full z-40 top-0 left-0"
      ></div>
      <div
        onClick={handleChangeItem}
        className="absolute w-1/2 h-full z-40 top-0 right-0"
      ></div>
      <div className="absolute z-40 w-full text-white flex gap-2 h-fit items-center bg-[#03030367] bottom-4">
        <FaRegEye className="text-white" />
        <AvatarGroup users={story[item]?.views.userDetails} />
      </div>
    </div>
  );
};

// Define prop types
StoryView.propTypes = {
  story: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      views: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
  }).isRequired,
  onNextUser: PropTypes.func.isRequired,
  onReverse: PropTypes.func.isRequired
};

export default StoryView;
