// import ProfileBtn from "../component/ProfileBtn";
import Avatar from '../component/Avatar'

const HomeLeftSide = () => {
  const friends = [1, 2, 3, 4, 5,6,7,8,9,0, 2, 3, 4, 5,6,7,8,9,0];
  return (

    <div  className="  lg:flex leftHomeSideBar flex-col col-span-2  shadow-md    hidden gap-4 p-5 px-3 bg-secondary-light dark:bg-secondary-dark   rounded-3xl h-[88vh] ">
      <h2 className="  ">Friends</h2>
      <div className="flex flex-col gap-4 overflow-y-scroll no-scrollbar">
{
  friends.map((friend, index) => (
    <div className='flex gap-3 ' key={index}>
      <Avatar image='https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600' />
      {friend}
    </div>
  )

)}
        </div>
    </div>
  );
};

export default HomeLeftSide;
