import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AvatarBtn from '../component/Avatar';
import { incrementViewerCount } from '../auth/postApi';
import AvatarGroup from '../specific/AvatarGroup';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const StoryView = ({ story, author, onNextUser, onReverse, viewUpdate }) => {
  const [item, setItem] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { user } = useSelector(state => state);

  const updateViewers = useCallback(async () => {
    const currentStory = story[item];
    const hasViewed = currentStory.views.userDetails.some(view => view._id === user._id);
    if (!hasViewed) {
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
    }, 10000);

    return () => clearInterval(changeStoryInterval);
  }, [item, story, ]);

  const handleChangeItem = () => {
    if (item < story.length - 1) {
      setItem(prev => prev + 1);
    } else {
      setItem(0);
      onNextUser();
    }
    setElapsedTime(0); // Reset elapsed time when the story changes
  };

  const handleReverse = () => {
    if (item > 0) {
      setItem(prev => prev - 1);
      setElapsedTime(0);
    } else {
      onReverse();
    }
  };

  return (
    <div 
    className="relative w-full h-full  rounded-lg bg-white  dark:bg-primary-dark  overflow-hidden flex flex-col items-center justify-center">
      {/* Header with Avatar and Username */}
       
       <Link 
      className=" top-0 left-0 z-50 p-2 flex items-center gap-3 bg-white dark:bg-secondary-dark w-full h-fit"
       to={`/profile/${author._id}`}>
       <AvatarBtn image={author.profilePicture} />
       <h3 className="font-semibold">{author.userName}</h3>
       </Link>
  

     

      {/* Story Image */}
      {story.length > 0 && (
        <img
          src={story[item]?.imageUrl || ''}
          alt={`Story ${item + 1}`}
          className="z-30 w-[400px] m-2 rounded-lg h-full lg:h-[450px]  object-cover "
        />
      )}

      {/* Clickable areas for navigation */}
      <div
        onClick={handleReverse}
        className="absolute w-1/2 h-full z-40 top-0 left-0 cursor-pointer"
      ></div>
      <div
        onClick={handleChangeItem}
        className="absolute w-1/2 h-full z-40 top-0 right-0 cursor-pointer"
      ></div>

      {/* Viewer avatars */}
      {author._id === user._id && viewUpdate && (
        <div className=" bottom-4 left-0 z-50 w-full px-4 flex items-center dark:bg-secondary-dark  bg-white h-fit p-2">
          <AvatarGroup users={story[item]?.views} />
        </div>
      )}
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
  onReverse: PropTypes.func.isRequired,
  viewUpdate: PropTypes.bool,
};

export default StoryView;
