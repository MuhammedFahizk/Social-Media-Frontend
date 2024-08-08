import React, { useEffect, useState } from "react";
import { Spin, Segmented } from "antd";
import { FetchPosts } from "../../api/getApi";
import SearchBar from "../Component/SearchBar";
import BlogList from "../Component/BlogList";
import ImageList from "../Component/ImageList";
const Posts = () => {
  const [value, setValue] = useState("blog");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(""); // Initialized as an empty string
  const options = ["blog", "image"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setPosts([]);
        const data = await FetchPosts(value, search); // Assuming FetchPosts takes a type and search parameter
        setPosts(data.data);
        setLoading(false);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [value, search]);

  return (
    <>
      <div className="flex gap-2">
        <SearchBar setSearch={setSearch} search={search} />
        <Segmented
          options={options}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      <Spin spinning={loading}>
        <div>
          {value === "blog" ? <BlogList posts={posts} /> : <ImageList posts={posts} />}
        </div>
      </Spin>
    </>
  );
};

export default Posts;
