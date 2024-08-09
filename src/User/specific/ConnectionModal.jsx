import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarBtn from "../component/Avatar";
import UnFollowBtn from "../component/UnfollowBtn";
import { Divider, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchConnections } from "../auth/getApi";
import PropTypes from 'prop-types';

const ConnectionModal = ({ isModalOpen, setIsModalOpen,setOffset,offset, data, setData, totalCount, setTotalCount, id, type, length }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    console.log('Modal Open:', isModalOpen);
    console.log('Data:', data);
    console.log('Offset:', offset);
  
    if (isModalOpen) {
      // Reset loading state and fetch data when modal opens
      setOffset()
      setLoading(false);
      loadMoreData();
    } else {
      // Reset state when modal closes
      setOffset(0);
      setData([]);
      initialLoading()
    }
  
    
  }, [id, isModalOpen]);
  
  const initialLoading = async () => {
    try {
      const response = await fetchConnections(id, type, 0);
      setData([]);
      setOffset(0);
      const { totalCount: newTotalCount } = response.data;
      setTotalCount(newTotalCount);
    } catch (error) {
      console.error("Error fetching connections: ", error);
    }
  };

const loadMoreData = async () => {
  if (loading) return;
  setLoading(true);

  try {
    const response = await fetchConnections(id, type, offset);
    const { connections: newData, totalCount: newTotalCount } = response.data;
    setData((prevData) => [...prevData, ...newData]);
    setOffset((prevOffset) => prevOffset + 10);
    setTotalCount(newTotalCount);
    console.log('Loaded data:', newData);
  } catch (error) {
    console.error("Error fetching more connections: ", error);
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
        next={loadMoreData}
        endMessage={
          data.length < totalCount ? (
           <Divider plain>
             <p onClick={loadMoreData} className="text-text-gray font-semibold cursor-pointer">See More</p>
           </Divider>
         ) : (
           <Divider plain>It is all, nothing more 🤐</Divider>
         )}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(listItem) => (
            <List.Item key={listItem._id}>
              <List.Item.Meta
                avatar={<AvatarBtn image={listItem.profilePicture} spell={listItem.userName.charAt(0).toUpperCase()} />}
                title={<Link onClick={() => setIsModalOpen(false)} to={`/profile/${listItem._id}`}>{listItem.userName}</Link>}
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

ConnectionModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
};


export default ConnectionModal;
