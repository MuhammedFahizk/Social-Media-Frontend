import React from "react";
import DropDown from "../component/DropDown";
import Avatar from "../component/Avatar";
import LogOutBtn from "../component/LogOutBtn";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
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
          image={
            "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        />
      }
    />
  );
};

export default ProfileButton;
