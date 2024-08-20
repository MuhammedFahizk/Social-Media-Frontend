import { Card } from 'antd';
import React from 'react';

const PostsUser = ({ posts }) => {
  return (
    <Card className="bg-white shadow-lg rounded-lg p-6 h-[500px] overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800">User Posts</h2>
      <p className="text-gray-600">
        <span className="font-medium">Total Posts:</span> {posts.length}
      </p>
      {posts.length > 0 ? (
        <ul className="mt-2 space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="flex items-start space-x-4">
              {/* Image */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              {/* Post Details */}
              <div>
                {/* Post Title */}
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                {/* Hashtags */}
                {post.hashTags && post.hashTags.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    {post.hashTags.map((tag, i) => (
                      <span key={i} className="mr-2">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </Card>
  );
};

export default PostsUser;
