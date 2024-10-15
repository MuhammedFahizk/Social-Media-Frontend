import { BsThreeDotsVertical } from "react-icons/bs";
import AvatarBtn from "../component/Avatar";
import ProfileDropDown from "../component/DropDown";
import FeedComments from "./FeedComments";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikePost from "./LikePost";
import PostComments from "./PostComments";
import { formatTimeDifference } from "../../Services/formatTimeDifference";
import MoreOptionFeed from "./MoreOptionFeed";
import { useSelector } from "react-redux";
formatTimeDifference;
const FeedCard = ({ post }) => {
  const { _id } = useSelector((state) => state.user.user);

  const [openComments, setOpenComments] = useState(false);

  const toggleComments = () => {
    setOpenComments(!openComments);
  };

  return (
    <div className="dark:border-text-primary rounded-2xl p-4 md:p-6 grid gap-4">
      <div className="flex gap-3 items-center w-full">
        <AvatarBtn
          image={post.author.profilePicture}
          spell={post.author.userName.charAt(0).toUpperCase()}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-sm">{post.author.userName}</h3>
          <p className="text-sm text-text-gray">{post.location}</p>
        </div>
        <div className="ml-auto flex h-full items-center gap-2">
          <h3 className="text-left ">
            {formatTimeDifference(post.createdAt)} ago
          </h3>
          {_id !== post.author._id ? (
            <MoreOptionFeed postId={post._id} userId={post.author} />
          ) : (
            <></>
          )}
        </div>
      </div>

      {post.content === "blog" && (
        <Link to={`/blog/${post._id}`}>
          <div className="relative">
            <img
              className="w-full h-fit object-cover rounded-2xl"
              src={post.imageUrl}
              alt=""
            />
            <div className="absolute p-2 inset-x-0 bottom-0 h-fit text-center flex items-center justify-center bg-black bg-opacity-50 rounded-b-2xl">
              <h2 className="text-white min-h-20 text-lg md:text-2xl font-bold">
                {post.title}
              </h2>
            </div>
          </div>
        </Link>
      )}

      {post.content === "image" && (
        <div className="w-full">
          <img
            className="w-full h-[400px] object-cover rounded-2xl"
            src={post.imageUrl}
            alt=""
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 md:justify-between w-full">
        <div className="flex gap-4 h-full items-center">
          <LikePost likes={post.likes} id={post._id} />
          <PostComments
            postId={post._id}
            authorId={post.author._id}
            initialComments={post.comments}
          />
        </div>
      </div>

      <FeedComments openComments={openComments} />
    </div>
  );
};

export default FeedCard;
