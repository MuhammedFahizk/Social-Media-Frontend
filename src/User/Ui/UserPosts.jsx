import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState, useEffect } from "react";
import { SettingOutlined, EllipsisOutlined } from "@ant-design/icons";
import LikePost from "./LikePost";
import PostComments from "./PostComments";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const UserPosts = ({ images, id }) => {
  const { _id } = useSelector((state) => state.user);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    setOwner(id === _id);
  }, [id, _id]);

  return (
    <div className="grid grid-cols-3 gap-2 p-10">
      {images.map((item, index) => (
        <Card
          key={index}
          cover={
            <img alt="example" src={item.imageUrl} className="object-cover" />
          }
          actions={[
            owner && <SettingOutlined key="setting" />,
            <EllipsisOutlined key="ellipsis" />,
            <span className="flex justify-center" key="like">
              <LikePost likes={item.likes} id={item._id} />
            </span>,
            <span className="flex justify-center" key="comments">
              <PostComments id={item._id} initialComments={item.comments} />
            </span>,
          ].filter(Boolean)} // Filter out undefined values
        >
          <Meta title="Card title" description={item.hashTag} />
        </Card>
      ))}
    </div>
  );
};

UserPosts.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      likes: PropTypes.array.isRequired,
      comments: PropTypes.array.isRequired,
      _id: PropTypes.string.isRequired,
      hashTag: PropTypes.string.isRequired,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
};

export default UserPosts;
