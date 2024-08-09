import React, { useEffect, useState } from "react";
import { fetchProfileStores } from "../auth/getApi";
import Modal from "./Modal";
import StoryView from "../Pages/StoryView";
const ProfileStory = ({ profile }) => {
  const [profileStores, setProfileStores] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  console.log('profileStores',profileStores);

  const [open, setOpen] = useState(false);

  const handleOpenModal = (userIndex) => {
    const story = profileStores[userIndex].story;
    setSelectedStory(story);
    setSelectedUserIndex(userIndex);
    setOpen(true);
  };
  const handleNextUser = () => {
    if (selectedUserIndex < profileStores.length - 1) {
      handleOpenModal(selectedUserIndex + 1);
    } else {
      handleCloseModal();
    }
  };
  const handleReverseUser = () => {
    if (selectedUserIndex > 0) {
      handleOpenModal(selectedUserIndex - 1);
    } else {
      handleCloseModal();
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetchProfileStores(profile._id);
        // Assuming fetchProfileStores returns JSON directly
        setProfileStores(response.data);
      } catch (error) {
        console.error("Failed to fetch profile stores:", error);
      }
    };

    fetchStory();
  }, [profile]); // Added empty dependency array

  return (
    <div className="flex md:w-[500px] w-[350px]  overflow-x-scroll gap-2 h-34 no-scrollbar"

    >
      {profileStores.map((story, index) => (
        <div
        onClick={() => handleOpenModal(index)}
          key={index} // Added key prop
          className="relative md:h-full h-fit  w-[95px] flex-shrink-0 cursor-pointer"
        >
          <img
            src={story.story[0].imageUrl} // Uncomment and replace with actual path
            alt="story"
            className="md:h-full h-[60px] w-full mt-1 md:rounded-2xl rounded-lg  object-cover"
          />
        </div>
      ))}

<Modal isOpen={open} onClose={handleCloseModal}>
        {selectedStory && (
          <StoryView
            story={selectedStory}
            author={profile}
            onNextUser={handleNextUser}
            onReverse={handleReverseUser}
            viewUpdate={false}
          />
        )}
      </Modal>
    </div>

  );
};

export default ProfileStory;
