import React from "react";
import DropDown from "../component/DropDown";
import Avatar from "../component/Avatar";
import LogOutBtn from "../component/LogOutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileButton = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: (
        <a
        onClick={(e) => {
          e.preventDefault();
          navigate('/Post');
        }}
        >
          Add Post
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/profile');
          }}
        >
          Muhammed 
        </a>
      ),
    },
    {
      key: "3",
      label: <LogOutBtn />,
    },
  ];

  return (
    <DropDown
      items={items}
      item={
        <Avatar
          image={user.profilePicture}
        />
      }
    />
  );
};

export default ProfileButton;
