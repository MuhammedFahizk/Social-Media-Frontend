import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AvatarBtn from '../component/Avatar';
import { incrementViewerCount } from '../auth/postApi';
import AvatarGroup from '../specific/AvatarGroup';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StoryView = ({ story, author, users, onNextUser, onReverse, viewUpdate }) => {
  const [item, setItem] = useState(0);
  const {user} = useSelector(state => state.user)

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

  const handleChangeItem = () => {
    if (item < story.length - 1) {
      setItem(prev => prev + 1);
    } else {
      setItem(0);
      onNextUser();
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
    <div
    className="no-scrollbar cursor-pointer "
  >
    <div className="absolute z-50 p-2  flex gap-3 bg-[#06060662] text-white w-full shadow-md top-2 h-fit items-center">
      <AvatarBtn image={author.profilePicture} />
      <h3>{author.userName}</h3>
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
    className=' absolute w-1/2 h-full  z-40 top-0'>

</div>
<div 
    onClick={handleChangeItem}

className=' absolute w-1/2 h-full right-0  z-40 top-0'>

</div>
    {/* <div className=' absolute  z-40 w-full p-2 text bg-[#ffffff36] bottom-4'>
    </div> */}
  </div>
);
};


// Define prop types
StoryView.propTypes = {
  story: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      views: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userName: PropTypes.string,
        profilePicture: PropTypes.string,
      })).isRequired,
    })
  ).isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      story: PropTypes.arrayOf(
        PropTypes.shape({
          imageUrl: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onNextUser: PropTypes.func.isRequired,
  onReverse: PropTypes.func.isRequired,
  viewUpdate: PropTypes.bool,
};

export default StoryView;
