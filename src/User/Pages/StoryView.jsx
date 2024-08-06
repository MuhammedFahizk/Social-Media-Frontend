import React, { useState } from 'react';
import AvatarBtn from '../component/Avatar';

const StoryView = ({ story, author, onNextUser, onReverse }) => {
  const [item, setItem] = useState(0);

  const handleChangeItem = () => {
    if (item < story.length - 1) {
      setItem((prev) => prev + 1);
    } else {
        setItem(0)
      onNextUser();
    }
  };
  const handleRevere = () => {
    if (item > 0) {
        setItem((prev) => prev  -  1);
      } else {
          onReverse();
          setItem(story.length-1)
      }
  }

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
      onClick={handleRevere}
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

export default StoryView;
