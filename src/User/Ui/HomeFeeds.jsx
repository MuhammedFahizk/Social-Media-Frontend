import React from 'react';
import FeedHeadings from '../component/FeedHeadings';
import FeedCard from './FeedCard';
const HomeFeeds = () => {
  return (
    <div className='lg:col-span-5 h-[88vh] col-span-1 flex  flex-col gap-4  rounded-3xl px-2 md:px-10'>
      <FeedHeadings />
      <div className='h-fit  md:overflow-y-scroll no-scrollbar grid  grid-cols-1 gap-5 '>

      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />

      
      </div>
    </div>
  );
}

export default HomeFeeds;