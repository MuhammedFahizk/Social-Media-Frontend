import React, { useState } from 'react';
import Segment from './Segment';
import { BsFilePost, BsTag, BsBook, BsBookmark } from "react-icons/bs";

const UserFeeds = () => {
  const [value, setValue] = useState("Post");
  const options = [
    { label: <div className="flex items-center"><BsFilePost className="mr-2" />Post</div>, value: "Post" },
    { label: <div className="flex items-center"><BsTag className="mr-2" />Tagged</div>, value: "Tagged" },
    { label: <div className="flex items-center"><BsBook className="mr-2" />Blogs</div>, value: "Blogs" },
    { label: <div className="flex items-center"><BsBookmark className="mr-2" />Saved</div>, value: "Saved" }
  ];

  return (
    <div className='col-span-7 p-10 flex h-fit justify-between '>
      <h2>{value}</h2>
      <Segment value={value} setValue={setValue} options={options} />
    </div>
  );
};

export default UserFeeds;
