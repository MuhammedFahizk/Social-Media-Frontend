import React from 'react';
import { useSelector } from 'react-redux';
const Stores = () => {

    const story = useSelector(state => state.user.story )
  return (
    <div className='lg:h-[100px] lg:w-full mt-4 md:mt-0     overflow-x-scroll no-scrollbar md:p-3 flex gap-2'>
      {story.map((store, index) => (
        <div key={index} className='relative md:h-full h-fit w-[85px] flex-shrink-0'>
          <img
            src={store.imageUrl}
            alt="profile"
            className='md:h-full h-[90px] w-full mt-1 md:rounded-2xl  rounded-full   object-cover'
          />
          
        </div>
      ))}
    </div>
  );
}

export default Stores;
