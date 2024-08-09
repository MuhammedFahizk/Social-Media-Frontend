import React, { useState, useEffect } from 'react';
import { Input, List, Divider, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchConnections } from "../auth/getApi";
import AvatarBtn from "../component/Avatar";
import UnFollowBtn from "../component/UnfollowBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const ConnectionSearch = ({ search, setIsSearchOpen, offset, setOffset, type,length, id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isNewSearch, setIsNewSearch] = useState(true);

  const { user } = useSelector((state) => state);

  useEffect(() => {
    
    if (search) {
      setIsNewSearch(true);
      setData([]);
      loadSearchResults();
    }
    console.log(search);
  }, [search, type, id]);

  const loadSearchResults = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchConnections(id, type, offset, search);
      const { connections: newData, totalCount: newTotalCount } = response.data;
      console.log('response', response);
      setData((prevData) => isNewSearch ? [...newData] : [...prevData, ...newData]);
      setTotalCount(newTotalCount);
      setOffset((prevOffset) => prevOffset + 10);
      setIsNewSearch(false);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = (unfollowedUserId) => {
    setData((prevData) => prevData.filter((user) => user._id !== unfollowedUserId));
    setTotalCount((prevCount) => prevCount - 1);
  };

  return (
    <div
      className="items-center justify-center w-full h-[300px] overflow-y-scroll p-4 bg-white rounded"
      id="scrollableDiv"
    >
      <InfiniteScroll
           dataLength={length}
           next={loadSearchResults}
           hasMore={ totalCount < data.length}
           endMessage={
             data.length < totalCount ? (
              <Divider plain>
                <p onClick={loadSearchResults} className="text-text-gray font-semibold cursor-pointer">See More</p>
              </Divider>
            ) : (
              <Divider plain>It is all, nothing more 🤐</Divider>
            )}
      >
        <List
          dataSource={data}
          renderItem={(listItem) => (
            <List.Item key={listItem._id}>
              <List.Item.Meta
                avatar={<AvatarBtn image={listItem.profilePicture} spell={listItem.userName.charAt(0).toUpperCase()} />}
                title={<Link to={`/profile/${listItem._id}`}>{listItem.userName}</Link>}
                description={listItem.email}
              />
              {user._id !== listItem._id && (
                <UnFollowBtn id={listItem._id} onUnfollow={handleUnfollow} />
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

ConnectionSearch.propTypes = {
  search: PropTypes.string.isRequired,
  setIsSearchOpen: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConnectionSearch;
