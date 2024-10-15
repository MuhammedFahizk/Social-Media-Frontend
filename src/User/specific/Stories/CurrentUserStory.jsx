import { Modal } from 'antd';
import React, { useState } from 'react';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';
import AvatarBtn from '../../component/Avatar';
import { MdOutlineNavigateNext, MdKeyboardArrowDown } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { FaRegEye } from "react-icons/fa";
import { formatTimeDifference } from '../../../Services/formatTimeDifference';

const CurrentUserStory = ({ isVisible, onClose, stories, user }) => {
  console.log(stories);
  
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const [isViewSectionVisible, setIsViewSectionVisible] = useState(false);

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const toggleViewSection = () => {
    setIsViewSectionVisible(!isViewSectionVisible);
  };

  const currentStory = stories[currentStoryIndex];

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      className="p-0 m-0"
    >
      <div className="relative mx-auto flex justify-center w-[420px]">
        {/* Story header */}
        <div className="story-head z-40 absolute p-3 w-full">
          <div className="flex items-center justify-between gap-3 p-2 bg-black bg-opacity-50 px-2 rounded-lg w-full top-0 left-0">
            <div className="flex h-full items-center gap-3">
              <AvatarBtn
                image={user.profilePicture}
                spell={user.userName.charAt(0).toUpperCase()}
                size="medium"
              />
              <div className="flex flex-col justify-center py-1">
                <h2 className="text-sm text-white">{user.userName}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Story Image */}
        <img
          src={currentStory.imageUrl}
          className="w-[420px] mx-auto rounded-lg h-full object-cover mt-1 fade-in" // Added fade-in animation
          alt="Story"
        />

        {/* Toggleable view section */}
        {isViewSectionVisible && (
          <div className="story-head z-40 absolute p-3 bottom-10 text-white w-full animate-slide-up">
            <div className=" justify-between gap-3 p-2 h-56 bg-white px-2 rounded-lg w-full">
              <div className='flex  w-full bg-text-primary h-fit rounded-lg py-1 items-center px-3 justify-between'>
                <div className="flex gap-2 h-fit ">
                  <FaRegEye className="text-xl cursor-pointer" />
                  <h3>{currentStory.views.length} views</h3>
                </div>
                <MdKeyboardArrowDown
                  className="text-3xl  cursor-pointer transform  transition-transform duration-300 ease-in-out" // Rotation animation
                  onClick={toggleViewSection}
                />
              </div>
              <div className='flex flex-col gap-1 overflow-y-auto  no-scrollbar '>
                {
                    currentStory.views.map((view, index) => (
                        <div key={index} className='flex justify-between h-full items-center px-3'><div  className="flex gap-2 items-center  text-black py-1">
                            <AvatarBtn image={view.userId.profilePicture} spell={view.userId.userName.charAt(0).
                                toUpperCase()} size="small" />
                            <h3 className="text-sm">{view.userId.userName}</h3>
                        </div><h3 className='text-gray-400 '>
                                {formatTimeDifference(view.viewedAt)} Ago
                            </h3></div>
                            )
                    )
                }
              </div>
            </div>
          </div>
        )}

        {/* Eye icon to toggle view section */}
          <div className="story-head z-40 absolute p-3 bottom-0 text-white w-full">
            <div className="flex items-center justify-between gap-3 p-2 bg-black bg-opacity-50 px-2 rounded-lg w-full ">
              <div className="flex gap-2">
                <FaRegEye
                  className="text-xl cursor-pointer transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out"
                  onClick={toggleViewSection}
                />
                <h3>{currentStory.views.length}</h3>
              </div>
            </div>
          </div>

        {/* Navigation Icons */}
        <div className="absolute inset-0 flex justify-between items-center">
          <GrFormPrevious
            className={`cursor-pointer text-4xl text-white opacity-100 hover:opacity-100 transform transition-transform duration-300 ease-in-out hover:-translate-x-2 ${
              currentStoryIndex === 0 ? 'invisible' : 'visible'
            }`} // Slide animation for previous button
            onClick={handlePreviousStory}
          />
          <MdOutlineNavigateNext
            className={`cursor-pointer text-4xl text-white opacity-75 hover:opacity-100 transform transition-transform duration-300 ease-in-out hover:translate-x-2 ${
              currentStoryIndex === stories.length - 1 ? 'invisible' : 'visible'
            }`} // Slide animation for next button
            onClick={handleNextStory}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CurrentUserStory;
