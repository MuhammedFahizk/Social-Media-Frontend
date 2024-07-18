import React from 'react';
import Avatar from "../component/Avatar";
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import FollowButton from '../component/FollowButton';

const Suggestions = ({ data }) => {
  return (
    <div className="px-5 flex flex-col gap-6">
      <h2>Suggestions</h2>
      {data.length === 0 ? (
        <div className='flex justify-center h-fit items-center '>
          <img className='rounded-lg' src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=900&t=st=1721300159~exp=1721300759~hmac=3e469bc343d289d78c4ca87954a2b1eb2165535fdf1aef40995af6c463b0f8d7" alt="" />
          {/* <Empty description="No suggestions available" className='text-black dark:text-white' /> */}
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar h-[55vh] py-5">
          {data.map((user, index) => (
            <div className="flex items-center gap-3 justify-between" key={index}>
              <div className='flex gap-2'>
                <Avatar image={user.profilePicture} />
                <Link to={`/profile/${user._id}`}>{user.userName}</Link>
              </div>
              <FollowButton id={user._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Define PropTypes for the component
Suggestions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Suggestions;
