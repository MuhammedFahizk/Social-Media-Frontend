import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../auth/authUser";
import moment from "moment";
import AvatarBtn from "../component/Avatar";
import LikePost from "../Ui/LikePost";
import PostComments from "../Ui/PostComments";

const BlogPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPost(id);
        if (response) {
          setPost(response.data);
        } else {
          console.error("Failed to fetch post:", response.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchData();
  }, [id]);

  const getTimeDifference = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diffYears = now.diff(created, "years");
    created.add(diffYears, "years");
    const diffMonths = now.diff(created, "months");
    created.add(diffMonths, "months");
    const diffDays = now.diff(created, "days");
    created.add(diffDays, "days");
    const diffHours = now.diff(created, "hours");
    created.add(diffHours, "hours");
    const diffMinutes = now.diff(created, "minutes");

    return { diffYears, diffMonths, diffDays, diffHours, diffMinutes };
  };

  const formatTimeDifference = (timeDiff) => {
    const { diffYears, diffMonths, diffDays, diffHours, diffMinutes } = timeDiff;

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? "s" : ""}`;
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;

    return "just now";
  };

  const wrapContent = (htmlContent) => {
    return `<div >${htmlContent}</div>`;
  };

  return (
    <div>
      {post && (
        <div className="w-2/3 flex flex-col gap-4 mx-auto my-10 text-black dark:text-white">
          <img src={post.imageUrl} className="h-[200px] object-cover rounded-lg" alt="" />
          <h1 className="text-left">{post.title}</h1>
          <p className="text-left">{post.description}</p>
          <div className="flex gap-4 h-full items-center">
            <AvatarBtn
              image={post.author.profilePicture}
              spell={post.author.userName.charAt(0).toUpperCase()}
            />
            <Link to={`/profile/${post.author._id}`}>
              <div className="flex h-full flex-col justify-center">
                <h2 className="text-left">{post.author.userName}</h2>
                <h2 className="text-sm">{post.author.email}</h2>
              </div>
            </Link>
            <div className="h-full items-bottom justify-end gap-3 flex ml-auto">
              <h3 className="text-left">
                {formatTimeDifference(getTimeDifference(post.createdAt))} ago
              </h3>
              <h3>8 min read</h3>
            </div>
          </div>
          <div className="border gap-4 flex rounded-2xl px-10 p-2">
            <LikePost likes={post.likes} id={post._id}  />
            <PostComments />
          </div>
          <div className="text-black dark:text-white">
            <div dangerouslySetInnerHTML={{ __html: wrapContent(post.body) }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
