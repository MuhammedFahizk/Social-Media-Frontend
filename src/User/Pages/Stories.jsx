import React, { useEffect, useState } from 'react';
import { fetchStorie } from '../auth/getApi';
import { useParams, useNavigate } from 'react-router-dom';
import StoryView from '../specific/Stories/StoryView';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import Loading from '../component/Loading';

const Stories = () => {
  const [stories, setStories] = useState();
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [nextUser, setNextUser] = useState(null);
  const [previousUser, setPreviousUser] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const navigate = useNavigate();
  const { userName, storyId } = useParams();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetchStorie(userName, storyId);
        console.log(response);
        setUser(response.data.user)
        
        setStories(response.data.specificStory);
        setNextUser({
          nextUserId: response.data.nextUserId,
          nextUserName: response.data.nextUserName,
          nextStoryId: response.data.nextStoryId,
        });
        setPreviousUser({
          previousUserId: response.data.previousUserId,
          previousUserName: response.data.previousUserName,
          previousStoryId: response.data.previousStoryId,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userName) {
      fetchStories();
    }
  }, [userName, storyId]);

  const handleNextStory = () => {
    if (navigating) return;
    setNavigating(true);
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      setNavigating(false);
    } else if (nextUser && nextUser.nextStoryId) {
      navigate(`/stories/${nextUser.nextUserName}/${nextUser.nextStoryId}`);
      setNavigating(false);
    } else {
      navigate('/');
    }
  };

  const handlePreviousStory = () => {
    if (navigating) return;
    setNavigating(true);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
      setNavigating(false);
    } else if (previousUser && previousUser.previousStoryId) {
      navigate(`/stories/${previousUser.previousUserName}/${previousUser.previousStoryId}`);
      setNavigating(false);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center p-4">
        <GrFormPrevious
          size={40}
          className="cursor-pointer hover:bg-gray-300 rounded-full"
          onClick={handlePreviousStory}
          disabled={navigating}
        />
      </div>

      <div className="flex justify-center items-center">
        <StoryView stories={stories} user={user} />
      </div>

      <div className="flex justify-center items-center p-4">
        <MdOutlineNavigateNext
          size={40}
          className="cursor-pointer hover:bg-gray-300 rounded-full"
          onClick={handleNextStory}
          disabled={navigating}
        />
      </div>
    </div>
  );
};

export default Stories;
