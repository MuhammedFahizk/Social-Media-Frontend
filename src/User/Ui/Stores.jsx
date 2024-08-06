import React, { useState, useEffect } from "react";
import Modal from "../Ui/Modal";
import StoryView from "../Pages/StoryView";
import { getFreshStories } from "../auth/getApi";

const Stores = () => {
  const [users, setUsers] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFreshStories();
        const sortedUsers = response.data.user.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort users by createdAt descending
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Failed to load stories:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (userIndex) => {
    const story = users[userIndex].story;
    setSelectedStory(story);
    setSelectedUserIndex(userIndex);
    setOpen(true);
    setAuthor(users[userIndex]);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleNextUser = () => {
    if (selectedUserIndex < users.length - 1) {
      const nextIndex = selectedUserIndex + 1;
      handleOpenModal(nextIndex);
    } else {
      handleCloseModal();
    }
  };

  const handleReverseUser = () => {
    if (selectedUserIndex > 0) {
      const prevIndex = selectedUserIndex - 1;
      handleOpenModal(prevIndex);
    } else {
      handleCloseModal();
    }
  };

  return (
    <div className="lg:h-[150px] lg:w-[270px] mt-4 md:mt-0 p-2 overflow-x-scroll no-scrollbar md:p-3 flex gap-2">
      {users.map((story, index) => (
        <div
          onClick={() => handleOpenModal(index)}
          key={index}
          className="relative md:h-full h-fit w-[95px] flex-shrink-0 cursor-pointer"
        >
          <img
            src={story.story[0].imageUrl}
            alt="story"
            className="md:h-full h-[90px] w-full mt-1 md:rounded-2xl rounded-full blur-sm object-cover"
          />
          <img
            src={story.profilePicture}
            alt="author"
            className="h-14 w-14 rounded-full absolute shadow-3xl border-s-fuchsia-200 md:top-2/3 top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      ))}

      <Modal isOpen={open} onClose={handleCloseModal}>
        {selectedStory && (
          <StoryView
            story={selectedStory}
            author={author}
            onNextUser={handleNextUser}
            onReverse={handleReverseUser}
          />
        )}
      </Modal>
    </div>
  );
};

export default Stores;
