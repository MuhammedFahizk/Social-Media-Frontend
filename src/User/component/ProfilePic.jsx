import UploadProfile from "../Ui/Upload"

const ProfilePic = ({image, className}) => {
  return (
    image?<img className={`rounded-full h-28  object-cover items-center flex justify-center w-28 bg-red-300 ${className}`}
    src={image} alt=""  >
</img>: 
''

  )
}

export default ProfilePic