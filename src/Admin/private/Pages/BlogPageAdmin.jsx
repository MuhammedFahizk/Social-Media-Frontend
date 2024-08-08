import { Link, useParams } from "react-router-dom";
import { formatTimeDifference } from "../../../Services/formatTimeDifference";
import { useEffect, useState } from "react";
import { fetchPost } from "../../api/getApi";
import AvatarBtn from "../../../User/component/Avatar";
import PostComments from "../../../User/Ui/PostComments";
const BlogPageAdmin = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const wrapContent = (htmlContent) => {
    return `<div>${htmlContent}</div>`;
  };

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
  return(
    <div className="flex justify-center">
    {post && (
      <div className="w-full max-w-4xl flex flex-col gap-4 mx-4 p-4 sm:p-0 sm:mx-6 lg:mx-8    my-10 text-black dark:text-white">
        <img src={post.imageUrl} className="w-full h-60 object-cover rounded-lg" alt="" />
        <h1 className="text-left text-2xl font-bold">{post.title}</h1>
        <p className="text-left text-lg">{post.description}</p>
        <div className="flex gap-4 items-center">
          <AvatarBtn
            image={post.author.profilePicture}
            spell={post.author.userName.charAt(0).toUpperCase()}
          />
          <Link to={`/admin/user/${post.author._id}`}>
            <div className="flex flex-col justify-center">
              <h2 className="text-left font-semibold">{post.author.userName}</h2>
              <h2 className="text-sm">{post.author.email}</h2>
            </div>
          </Link>
          <div className="flex items-center ml-auto gap-3">
            <h3 className="text-left">
              {formatTimeDifference(post.createdAt)} ago
            </h3>
            <h3>8 min read</h3>
          </div>
        </div>
        <div className="border gap-4 flex rounded-2xl p-4">
          <h3>Likes: {post.likes.length}</h3>
          <PostComments isAdmin={true} authorId={post.author._id} postId={post._id} initialComments={post.comments} />
        </div>
        <div className="text-black dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: wrapContent(post.body) }}></div>
        </div>
        <div>
          {
            post.hashTags && post.hashTags.map((item,  index)=> (
              <span className="text-gray-500 font-Righteous ms-2">{item}</span>
            ))
           }
           
        </div>
      </div>
    )}
  </div>
  )


 



};

export default BlogPageAdmin;
