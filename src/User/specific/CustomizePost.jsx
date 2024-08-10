import React, { useState } from 'react';
import SelectPostMethod from './SelectPostMethod';
import CreateStory from './CreateStory';
import CreateBlog from './CreateBlog';
import CreateImage from './CreateImage';

const CustomizePost = () => {
  const [value, setValue] = useState('story');

  const options = [
    {
      label: 'Blog',
      value: 'blog',
    },
    {
      label: 'Story',
      value: 'story',
    },
    {
      label: 'Image',
      value: 'image',
    },
  ];

  return (
    <div className="col-span-9 p-1 md:px-8 dark:text-white h-fit flex-col ">
      <SelectPostMethod options={options} setValue={setValue} value={value} />
      {value === 'story' && <CreateStory />}
      {value === 'blog' && <CreateBlog />}
      {value === 'image' && <CreateImage />}
    </div>
  );
};

export default CustomizePost;
