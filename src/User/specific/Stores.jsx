import React, { useState, useEffect, useRef } from "react";
import { getFreshStories } from "../auth/getApi";
import { Link } from "react-router-dom";
import CurrentUserStory from "./Stories/CurrentUserStory";
import { AiOutlinePlus } from "react-icons/ai";

const Stores = () => {
  const [users, setUsers] = useState([]); // For other users' stories
  const [currentUserStories, setCurrentUserStories] = useState([]); // For current user's stories
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal open/close
  const hasFetchedData = useRef(false); // Track if the API has been called

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasFetchedData.current) {
          const response = await getFreshStories();
          const sortedUsers = response.data.user;
          setUsers(sortedUsers);
          setCurrentUserStories(response.data.userStories);
          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("Failed to load stories:", error);
      }
    };
    fetchData();
  }, []);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lg:h-[150px] lg:w-[270px] mt-4 md:mt-0 p-2 md:p-3 overflow-x-scroll no-scrollbar flex gap-4">
      {/* Current User's Story */}
      {currentUserStories.stories?.length > 0 ? (
        <div className="flex flex-col items-center">
          <div
            className="relative md:h-full h-fit w-[90px] flex-shrink-0 cursor-pointer"
            onClick={openModal}
          >
            <img
              src={currentUserStories.stories[currentUserStories.stories.length - 1]?.imageUrl}
              alt="Your Story"
              className="md:h-full h-[90px] w-full mt-1 rounded-full md:rounded-2xl blur-sm object-cover"
            />
            <img
              src={currentUserStories.user.profilePicture}
              alt="Profile"
              className="h-14 w-14 rounded-full absolute shadow-lg border border-white top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
          <p className="text-xs text-center mt-2 text-gray-600">Your Story</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative md:h-full h-fit w-[90px] flex-shrink-0">
            <Link
              to="/addPost"
              className="relative h-[90px] w-full mt-1 rounded-full md:rounded-2xl border-2 border-gray-400 flex items-center justify-center"
            >
              <AiOutlinePlus className="text-gray-500 text-4xl" />
            </Link>
          <p className="text-xs text-center mt-2 text-gray-600">Create Story</p>
          </div>
        </div>
      )}

      {/* Other Users' Stories */}
      {users.length > 0 ? (
        users.map((user, index) => (
          <Link
            to={`/stories/${user.userName}/${user?.story[0]?._id}`}
            key={index}
            className="relative md:h-full h-fit w-[90px] flex-shrink-0 cursor-pointer"
          >
            {user.story && user.story.length > 0 && (
              <img
                src={user?.story[0]?.imageUrl}
                alt="User Story"
                className="md:h-full h-[90px] w-full mt-1 rounded-full md:rounded-2xl blur-sm object-cover"
              />
            )}
            <img
              src={user.profilePicture}
              alt={user.userName}
              className="h-14 w-14 rounded-full absolute shadow-lg border border-white top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </Link>
        ))
      ) : (
        <div className="flex justify-center items-center border h-[90px] rounded-xl my-1 w-full">
          <p className="text-md font-medium text-gray-500">No stories found</p>
        </div>
      )}

      {/* Modal to display current user's story */}
      {isModalOpen && (
        <CurrentUserStory
          isVisible={isModalOpen}
          onClose={closeModal}
          stories={currentUserStories.stories}
          user={currentUserStories.user}
        />
      )}
    </div>
  );
};

export default Stores;
