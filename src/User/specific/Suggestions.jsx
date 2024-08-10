import React, { useState, useEffect } from 'react';
import Avatar from "../component/Avatar";
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import FollowButton from '../component/FollowButton';
import { useSelector } from 'react-redux';
import { fetchSuggestions } from '../auth/getApi';

const Suggestions = () => {
  const { user } = useSelector(state => state);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSuggestions();
        console.log(response);
        const filteredSuggestions = response.data.users.filter(item => item._id !== user._id);
        setSuggestions(filteredSuggestions);
      } catch (err) {
        setError('Failed to load suggestions.');
        console.error('Error fetching suggestions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-5 flex flex-col gap-6">
      <h2>Suggestions</h2>
      {suggestions.length === 0 ? (
        <div className='flex justify-center h-fit items-center'>
          <img
            className='rounded-lg'
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=900&t=st=1721300159~exp=1721300759~hmac=3e469bc343d289d78c4ca87954a2b1eb2165535fdf1aef40995af6c463b0f8d7"
            alt="No data"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar h-[55vh] py-5">
          {suggestions.map(user => (
            <div className="flex items-center gap-3 justify-between" key={user._id}>
              <div className='flex gap-2'>
                <Avatar image={user.profilePicture} spell={user.userName.charAt(0).toUpperCase()} />
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
  // data is no longer a prop, so remove PropTypes for it
};

export default Suggestions;
