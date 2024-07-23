import React from "react";
import DropDown from "../component/DropDown";
import Avatar from "../component/Avatar";
import LogOutBtn from "../component/LogOutBtn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileButton = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <><Link to={'/addPost'} /><h3>Add Post</h3></>
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
          Profile 
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
