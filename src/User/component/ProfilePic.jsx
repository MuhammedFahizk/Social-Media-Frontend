
const ProfilePic = ({image, className}) => {
  return (
    <img className={`rounded-full h-28  object-cover items-center flex justify-center w-28 bg-red-300 ${className}`}
         src={image} alt="profile"  >
    </img>
  )
}

export default ProfilePic