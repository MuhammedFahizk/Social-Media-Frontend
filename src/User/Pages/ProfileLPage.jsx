import ProfileCard from "../Ui/ProfileCard"
import UserFeeds from "../Ui/UserFeeds"
const ProfileLPage = () => {
  return (
    <div className=" w-full h-[90vh] dark:text-white grid-cols-1  grid md:grid-cols-9 md:p-10 p-5    ">
    <ProfileCard />
    <UserFeeds />
    </div>
  )
}

export default ProfileLPage