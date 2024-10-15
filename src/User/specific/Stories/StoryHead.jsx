import React from "react";
import AvatarBtn from "../../component/Avatar";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import ProfileDropDown from "../../component/DropDown";
import { useNavigate } from "react-router-dom";
import { addChat, ChooseUser } from "../../Redux/chattingSlice";
import { useDispatch } from "react-redux";

const StoryHead = ({ user, time }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = [
    {
      key: "1",
      label: "Profile",
      onClick: () => navigate(`/profile/${user._id}`), // Navigate to profile
    },
    {
      key: "2",
      label: "Message",
      onClick: () => {
        dispatch(ChooseUser(user._id));
        dispatch(addChat(user));       
        navigate("/messages");         
      },
    },
    {
      key: "3",
      label: "Share",
      onClick: () => {
        console.log("Share clicked");
        // Implement share logic
      },
    },
  ];

  return (
    <div className="story-head z-40 p-3 absolute w-full">
      <div className="flex items-center justify-between gap-3 bg-black bg-opacity-50 px-2 rounded-lg w-full top-0 left-0">
        <div className="flex h-full items-center gap-3">
          <AvatarBtn
            image={user.profilePicture}
            spell={user.userName.charAt(0).toUpperCase()}
            size="medium"
          />

          <div className="flex flex-col justify-center py-1">
            <h2 className="text-sm text-white">{user.userName}</h2>
            <span className="text-xs text-gray-300">{time} ago</span>
          </div>
        </div>

        <ProfileDropDown
          items={items}
          item={<IoEllipsisVerticalCircle className="text-2xl text-white" />}
        />
      </div>
    </div>
  );
};

export default StoryHead;
