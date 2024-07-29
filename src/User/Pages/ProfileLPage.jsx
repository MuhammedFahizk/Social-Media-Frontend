import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../Ui/ProfileCard";
import UserFeeds from "../Ui/UserFeeds";
import { useEffect, useState } from "react";
import { profilePage } from "../auth/authUser";
import { useParams, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/UserInformation";

const ProfileLPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profilePage(id);
        setProfile(response.data.profile);
        dispatch(setUser(response.data.user));
        console.log(response);
        setPosts(response.data.post);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, dispatch]);

  if (loading) {
    return <div className="w-full h-[90vh] flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[90vh] dark:text-white grid-cols-1 grid md:grid-cols-9 md:px-10 p-3">
      <ProfileCard profile={profile} />
      <UserFeeds  posts={ posts}  profile={profile} />
    </div>
  );
};

export default ProfileLPage;
