import { useDispatch } from "react-redux";
import ProfileCard from "../specific/ProfileCard";
import UserFeeds from "../specific/UserFeeds";
import { useEffect, useState } from "react";
import { profilePage } from "../auth/authUser";
import { useParams, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/UserInformation";
import HomeLeftSide from "../specific/HomeLeftSide";
import Loading from "../component/Loading";
const ProfileLPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    return (
      <Loading/>

    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[88vh] dark:text-white grid-cols-1 gap-2 grid lg:grid-cols-9  md:px-4 p-3">
      <div className="col-span-7 overflow-y-scroll no-scrollbar">
        <ProfileCard profile={profile} />
        <UserFeeds posts={posts} profile={profile} />
      </div>
      <HomeLeftSide data={profile}/>
    </div>
  );
};

export default ProfileLPage;
