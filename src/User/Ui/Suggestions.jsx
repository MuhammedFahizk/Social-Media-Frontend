import React from 'react'; // Import React explicitly if using JSX
import Avatar from "../component/Avatar";
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { GoPlus } from "react-icons/go";
import { followUser, verifyUser } from '../auth/authUser';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const Suggestions = ({ data }) => {
  const navigate = useNavigate();
  const handleFollow = async (userId) => {

    try {
      const res = await verifyUser();
      console.log('Verification response:', res);
    } catch (error) {
      console.error('Verification error:', error);
      console.log('Redirecting to login due to error');
      navigate('/login');
    }
    try {
      const response = await followUser(userId);
      if (response.status === 200) {
        toast.success('User followed successfully!');
      } else {
        toast.error('Failed to follow user.');
      }
      console.log(response);
    } catch (error) {
      toast.error('An error occurred while following the user.');
      console.error(error);
    }
  };

  return (
    <div className="px-5">
      <h2>Suggestions</h2>
      <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar h-[55vh] py-5">
        {data.map((user, index) => (
          <div className="flex items-center gap-3 justify-between" key={index}>
            <div className='flex gap-2'>
              <Avatar image={user.profilePicture} />
              <Link to={`/profile/${user._id}`}>{user.userName}</Link>
            </div>
            <Button 
              type="primary" 
              onClick={() => handleFollow(user._id)} 
              shape="round" 
              iconPosition='end' 
              icon={<GoPlus />} 
              size='small'
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define PropTypes for the component
Suggestions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    // Add more properties here as needed
  })).isRequired,
};

export default Suggestions;
