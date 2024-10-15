import React from 'react';
import StoryHead from './StoryHead';
import { formatTimeDifference } from '../../../Services/formatTimeDifference';
import StoryFooter from './StoryFooter';

const StoryView = ({ stories, user }) => {
  console.log('stories',stories);
  
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 p-4">
      <div className="relative w-[420px] rounded-lg">
        <StoryHead user={user} time={formatTimeDifference(stories.createdAt) } />
        <img
          src={stories.imageUrl}
          className="w-full rounded-lg h-full object-cover"
          alt="Story"
        />
        <StoryFooter/>
      </div>
    </div>
  );
};

export default StoryView;
