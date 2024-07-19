import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfilePic from "../component/ProfilePic";
import ButtonElem from "../component/ButtonElem";
import { useSelector } from "react-redux";
import FollowButton from "../component/FollowButton";
import UnFollowBtn from "../component/UnfollowBtn";

const ProfileCard = ({ profile }) => {
  const [follow, setFollow] = useState(false);
  const [owner, setOwner] = useState(false);
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (profile && user) {
      setOwner(user._id === profile._id);
      // setFollow(profile.followers.includes(user._id));set
      setFollow(profile.followers.some((item) => item._id === user._id))

    }
  }, [profile, user]);

  if (!profile) {
    return null; // or a loading indicator, or some default content
  }
console.log('followers',profile.followers);
  return (
    <div className="rounded-2xl flex flex-col items-center gap-4 justify-center h-full md:col-span-2 border border-text-primary">
       <ProfilePic image={profile.profilePicture} />
      <div>
        <h2 className="text-sm text-center">{profile.userName}</h2>
        <p className="text-sm text-text-primary">{profile.email}</p>
      </div>
      <div className="flex gap-2">
        <ButtonElem list={profile.followers}  item={`Followers ${profile.followers.length}`} />
        <ButtonElem  list={profile.following}  item={`Followings ${profile.following.length}`} />
      </div>
      {!owner && (
        follow ? <UnFollowBtn id={profile._id} /> : <FollowButton id={profile._id} />
      )}
      <div className="px-10 col-span-2">
        <p className="text-right">Striving to dazzle myself. Work hard. Be kind.</p>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

ProfileCard.defaultProps = {
  profile: null,
};

export default ProfileCard
