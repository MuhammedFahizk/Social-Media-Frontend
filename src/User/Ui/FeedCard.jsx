import { BsThreeDotsVertical } from "react-icons/bs";
import AvatarBtn from "../component/Avatar";
import ProfileDropDown from "../component/DropDown";
import FeedDetails from "./FeedDetails";
import CommentBox from "./commentBox";
import FeedComments from "./FeedComments";
import { useState } from "react";
const FeedCard = () => {
  const [openComments, setOpenComments] = useState(false);
  return (
    <div className="border  dark:border-text-primary rounded-2xl md:px-10 md:py-5 p-2 grid gap-4 ">
      <div className="flex gap-3 h-fit items-center w-full ">
        <AvatarBtn image="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&" />
        <div>
          <h3 className="font-bold text-sm">John Doe</h3>
          <p className="text-sm text-text-gray">Lorem ipsum dolor sit </p>
        </div>
        <div className="w-fit  items-end ml-auto ">
          <ProfileDropDown
            item={<BsThreeDotsVertical className="text-black text-2xl  w-4" />}
          />
        </div>
      </div>
      <img
        className="w-full h-[300px] object-cover rounded-2xl"
        src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        alt=""
      />
      <div className="flex flex-col md:flex-row gap-3  md:justify-between">
        <FeedDetails />
        <CommentBox
          openComments={openComments}
          setOpenComments={setOpenComments}
        />
      </div>
      <FeedComments openComments={openComments} />
    </div>
  );
};

export default FeedCard;
