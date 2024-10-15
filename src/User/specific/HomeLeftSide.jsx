import { Link, useNavigate } from "react-router-dom";
import Avatar from "../component/Avatar";
import PropTypes from "prop-types";
import { Badge } from "antd";

import { AiOutlineMessage, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addChat, ChooseUser } from "../Redux/chattingSlice";
import { useState } from "react";

const HomeLeftSide = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedChatUser } = useSelector((state) => state.chatting);
  const { messageCount } = useSelector((state) => state.message);

  // Function to handle clicking the message icon
  const handleClickMessage = (user) => {
    dispatch(ChooseUser(user._id));
    dispatch(addChat(user));
    navigate("/messages");
  };

  // Combine and get unique friends
  const combined = [...data.following, ...data.followers];
  const uniqueFriends = Array.from(
    new Map(combined.map((item) => [item._id, item])).values()
  );

  return (
    <div className="lg:flex z-10 sticky top-0 leftHomeSideBar flex-col col-span-2 shadow-md hidden gap-1 p-5 px-3 bg-secondary-light dark:bg-secondary-dark rounded-xl h-[88vh]">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Friends
      </h2>
      <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar">
        {uniqueFriends.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No friends found
          </p>
        ) : (
          uniqueFriends.map((friend) => (
            <div
              className="flex items-center justify-between gap-3 p-2 bg-white dark:bg-primary-dark hover:bg-gray-300 dark:hover:bg-ternary-dark rounded-lg transition-all duration-200"
              key={friend._id}
            >
              <div className="flex items-center gap-3 w-full ">
                <Badge dot={friend.online} color="green">
                  <Avatar
                    image={friend.profilePicture}
                    spell={friend.userName.charAt(0).toUpperCase()}
                    size="large"
                  />
                </Badge>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between w-full  gap-2">
                    <Link to={`/profile/${friend._id}`}>
                      <h2 className="text-md font-medium text-gray-800 dark:text-gray-100 overflow-hidden whitespace-nowrap text-ellipsis w-[150px]">
                        {friend.userName}
                      </h2>
                    </Link>
                    <div className="flex  justify-end  w-full">
                      
                      <button
                        onClick={() => handleClickMessage(friend)}
                        className="text-gray-500 hover:text-primary dark:hover:text-primary-light transition"
                        title="Send Message"
                      >
                        <Badge
                          size="small"
                          count={messageCount?.[friend._id] || 0}
                        >
                          <AiOutlineMessage size={20} className="text-gray-500" />
                        </Badge>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis w-[220px]">
                    {friend.bio || "Hey there! I am using Chat-Hive"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Define PropTypes for the component
HomeLeftSide.propTypes = {
  data: PropTypes.shape({
    followers: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        userName: PropTypes.string.isRequired,
        bio: PropTypes.string,
        online: PropTypes.bool,
      })
    ).isRequired,
    following: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
        userName: PropTypes.string.isRequired,
        bio: PropTypes.string,
        online: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
};

export default HomeLeftSide;
