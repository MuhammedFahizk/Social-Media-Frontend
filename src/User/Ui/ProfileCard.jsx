import { Avatar } from "antd";
import React from "react";
import ProfilePic from "../component/ProfilePic";
import ButtonElem from "../component/ButtonElem";
const ProfileCard = () => {
  return (
    <div className="rounded-2xl flex flex-col   items-center gap-4   justify-center h-full md:col-span-2  border border-text-primary">
      <ProfilePic
        image={
          "https://images.pexels.com/photos/2340978/pexels-photo-2340978.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
      />
      <h2>Muhammed Fahiz k</h2>
      <div className="flex gap-2 ">
        <ButtonElem item={"Followes 342"} />
        <ButtonElem item={"Followes 342"} />
      </div>
      <div className="px-10 col-span-2">
        <p className="text-right">
          Striving to dazzle myself Work hard. Be kind{" "}
        </p>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default ProfileCard;
