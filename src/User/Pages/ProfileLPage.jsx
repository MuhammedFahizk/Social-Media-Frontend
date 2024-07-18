import { useSelector } from "react-redux";
import ProfileCard from "../Ui/ProfileCard";
import UserFeeds from "../Ui/UserFeeds";
import { useEffect, useState } from "react";
import { profilePage } from "../auth/authUser";
import { useParams, useNavigate } from "react-router-dom";

const ProfileLPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profilePage(id);
        setProfile(response.data); // Assuming your API response contains the user data in `data` property
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  console.log(profile);

  return (
    <div className="w-full h-[90vh] dark:text-white grid-cols-1 grid md:grid-cols-9 md:p-10 p-5">
     <ProfileCard profile={profile} /> 
      <UserFeeds />
    </div>
  );
};

export default ProfileLPage;
