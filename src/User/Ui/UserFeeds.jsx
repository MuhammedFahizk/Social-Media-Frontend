import React, { useState, useEffect } from 'react';
import Segment from './Segment';
import { BsFilePost, BsTag, BsBook, BsBookmark } from "react-icons/bs";
import UserBlogs from './UserBlogs';
import UserPosts from './UserPosts';
import ProfileStores from './ProfileStores';
import PropTypes from 'prop-types';

// import UserTagged from './UserTagged'; // Import if you have a component for Tagged
// import UserSaved from './UserSaved'; // Import if you have a component for Saved

const UserFeeds = ({ posts, profile }) => {
  const [value, setValue] = useState("Image");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Effect to filter posts based on selected value
  useEffect(() => {
    switch (value) {
      case "Image":
        setFilteredPosts(posts.filter(item => item.content === 'image'));
        break;
      case "Blogs":
        setFilteredPosts(posts.filter(item => item.content === 'blog'));
        break;
      case "Tagged":
        // Set filteredPosts based on tagged posts logic
        // setFilteredPosts(posts.filter(item => /* logic for tagged */));
        break;
      case "Saved":
        // Set filteredPosts based on saved posts logic
        // setFilteredPosts(posts.filter(item => /* logic for saved */));
        break;
      default:
        setFilteredPosts([]);
    }
  }, [value, posts]);

  const options = [
    { label: <div className="flex items-center"><BsFilePost className="mr-2" />Post</div>, value: "Image" },
    { label: <div className="flex items-center"><BsBook className="mr-2" />Blogs</div>, value: "Blogs" },
    { label: <div className="flex items-center"><BsTag className="mr-2" />Tagged</div>, value: "Tagged" },
    { label: <div className="flex items-center"><BsBookmark className="mr-2" />Saved</div>, value: "Saved" }
  ];

  return (
    <div className="col-span-7   ">
      {/* <ProfileStores profile={profile} /> */}
      <div className="w-full items-center sticky bg-white  shadow-xl dark:bg-secondary-dark top-2  rounded-lg  z-10">
        <Segment value={value} setValue={setValue} options={options} />
      </div>

      <div>
        {value === "Image" && <UserPosts setFilteredPosts={setFilteredPosts} id={profile._id} images={filteredPosts} />}
        {/* {value === "Tagged" && <UserTagged />} */}
        {value === "Blogs" && <UserBlogs blogs={filteredPosts} />}
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
