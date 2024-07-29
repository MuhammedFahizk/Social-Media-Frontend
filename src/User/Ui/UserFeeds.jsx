import React, { useState } from 'react';
import Segment from './Segment';
import { BsFilePost, BsTag, BsBook, BsBookmark } from "react-icons/bs";
import UserBlogs from './UserBlogs';
import UserPosts from './UserPosts';
import ProfileStores from './ProfileStores';
import PropTypes from 'prop-types';

// import UserTagged from './UserTagged'; // Import if you have a component for Tagged
// import UserSaved from './UserSaved'; // Import if you have a component for Saved

const UserFeeds = ({ posts, profile }) => {
  const [value, setValue] = useState("Post");

  const options = [
    { label: <div className="flex items-center"><BsFilePost className="mr-2" />Post</div>, value: "Post" },
    { label: <div className="flex items-center"><BsBook className="mr-2" />Blogs</div>, value: "Blogs" },
    { label: <div className="flex items-center"><BsTag className="mr-2" />Tagged</div>, value: "Tagged" },
    { label: <div className="flex items-center"><BsBookmark className="mr-2" />Saved</div>, value: "Saved" }
  ];

  return (
    <div className="col-span-7 overflow-y-scroll no-scrollbar px-5 ">
        <ProfileStores profile={profile}  />
      <div className=" w-full  items-center  sticky top-0 z-10 ">
        <Segment value={value} setValue={setValue} options={options} />
      </div>

      <div className="  ">
        {value === "Post" && <UserPosts />}
        {/* {value === "Tagged" && <UserTagged />} */}
        {value === "Blogs" && posts && <UserBlogs blogs={posts.filter((item) => item.content === 'blog')} />}
        {/* {value === "Saved" && <UserSaved />} */}
      </div>
    </div>
  );
};
UserFeeds.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
  })).isRequired,
  profile: PropTypes.object.isRequired,
};
export default UserFeeds;
