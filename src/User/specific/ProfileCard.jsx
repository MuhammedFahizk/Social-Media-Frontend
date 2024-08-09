import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfilePic from "../component/ProfilePic";
import ButtonElem from "./ButtonElm";
import { useSelector } from "react-redux";
import FollowButton from "../component/FollowButton";
import UnFollowBtn from "../component/UnfollowBtn";
import ProfileStory from "./ProfileStory";
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
  return (
    <div className="rounded-xl md:flex  justify-between items-center gap-4 justify md:h-40   md:col-span-2 shadow-2xl dark:bg-secondary-dark p-2 ">
      <div className="flex gap-2">
      <ProfilePic owner={owner} image={profile.profilePicture} />
      <div className="flex  flex-col  ">
      <div>

       <div className="flex gap-3 h-full items-center">

<h2 className="text-sm text-center ">{profile.userName}</h2>
        <p className="text-sm text-start  text-text-primary">{profile.email}</p>
       </div> 
      </div>
      <div className="flex flex-col sm:flex-row   gap-2">
       <div className="flex gap-2">
       <ButtonElem length={profile.followers.length} id={profile._id}  type={'followers'} />
       <ButtonElem  length={profile.following.length}   id={profile._id}  type={'followings'}   />
       </div>
        {!owner && (
        follow ? <UnFollowBtn id={profile._id} /> : <FollowButton id={profile._id} />
      )}
      </div>
      <p className="text-left text-sm w-60">Striving to dazzle myself. Work hard. Be kind.</p>

      </div>
      </div>
      
      <ProfileStory profile={profile}/>
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
