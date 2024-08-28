import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import FollowButton from '../component/FollowButton';
import { useSelector } from 'react-redux';
import { fetchSuggestions } from '../auth/getApi';

const Suggestions = () => {
  const observerRef = useRef(null);
  const {user} = useSelector(state => state.user)
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (offset) => {
    setLoading(true);
    try {
      const response = await fetchSuggestions(offset);
      console.log('Fetch response:', response);
  
      if (response.data.length === 0) {
        setHasMore(false); // No more data to fetch
      }
  
      const filteredSuggestions = response.data.filter(
        (user) => !suggestions.some((existingUser) => existingUser._id === user._id)
      );
  
      setSuggestions((prev) => [...prev, ...filteredSuggestions]);
    } catch (err) {
      setError('Failed to load suggestions.');
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setOffset((prevOffset) => prevOffset + 6); // Increment offset for next fetch
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Adjust threshold if needed
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading]);

  if (loading && offset === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col overflow-y-scroll no-scrollbar h-[55vh] gap-6">
      <h2>Suggestions</h2>
      {suggestions.length === 0 ? (
        <div className="flex justify-center h-fit items-center">
          <img
            className="rounded-lg"
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=900&t=st=1721300159~exp=1721300759~hmac=3e469bc343d289d78c4ca87954a2b1eb2165535fdf1aef40995af6c463b0f8d7"
            alt="No data"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-1 py-1">
          {suggestions.map((user) => (
            <div
              className="flex flex-col items-center justify-between h-fit bg-primary-light dark:bg-ternary-dark col-span-1 gap-1 py-2 rounded-lg shadow-md"
              key={user._id}
            >
              <Link to={`/profile/${user._id}`} className="flex flex-col items-center gap-1">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.userName}
                    className="size-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center size-14 rounded-full bg-text-primary text-white text-xl font-bold">
                    <h2>{user.userName.charAt(0).toUpperCase()}</h2>
                  </div>
                )}
                <div className="dark:text-white-primary font-medium">
                  {user.userName}
                </div>
              </Link>
              <FollowButton id={user._id} />
            </div>
          ))}
          {hasMore ? (
            <div ref={observerRef} className="min-h-24 col-span-2 flex items-center justify-center">
              {loading && <Spin />}
            </div>
          ) : (
            <div className="flex justify-center py-4 col-span-2">No more suggestions</div>
          )}
        </div>
      )}
    </div>
  );
};

Suggestions.propTypes = {};

export default Suggestions;
