import React, { useState, useEffect } from "react";
import ProfilePic from "../component/ProfilePic";
import ButtonElem from "../component/ButtonElem";
import { useSelector } from "react-redux";

const ProfileCard = ({ profile }) => {
  const [follow, setFollow] = useState(false);
  const { user } = useSelector((state) => state);
  console.log('user',user);
  console.log('follow:',profile.following);
  useEffect(() => {
    if (profile.followers.includes(user._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [profile.following, user._id]);

  return (
    <div className="rounded-2xl flex flex-col items-center gap-4 justify-center h-full md:col-span-2 border border-text-primary">
      {/* <Stores/> */}
      <ProfilePic image={profile.profilePicture} />
      <div>
        <h2 className="text-sm text-center">{profile.userName}</h2>
        <p className="text-sm text-text-primary">{profile.email}</p>
      </div>
      <div className="flex gap-2">
        <ButtonElem item={`Followers ${profile.followers.length}`} />
        <ButtonElem item={`Followings ${profile.following.length}`} />
      </div>
      {follow ? <ButtonElem item="Following" /> : <ButtonElem item="Follow" />}
      <div className="px-10 col-span-2">
        <p className="text-right">Striving to dazzle myself. Work hard. Be kind.</p>
      </div>
      <div></div>
    </div>
  );
};

export default ProfileCard;
