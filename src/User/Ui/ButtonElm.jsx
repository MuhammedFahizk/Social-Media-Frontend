import PropTypes from 'prop-types';
import { Button, Modal, Divider, List, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarBtn from "../component/Avatar";
import UnFollowBtn from "../component/UnfollowBtn";
import { fetchConnections } from "../auth/getAuth";

const ButtonElem = ({ type, id,  }) => {
  const { user } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      loadMoreData();
    }else {
      initialLoading()
    }
    
  }, [isModalOpen, id]);

  const showModal = () => setIsModalOpen(true);

  const handleOk = () => setIsModalOpen(false);

  const handleCancel = () => {
    setOffset(0);
    setData([]);
    setIsModalOpen(false);
  };
  const initialLoading = async() => {
    try {
      const response = await fetchConnections(id, type, offset);
      const { totalCount: newTotalCount } = response.data;

      setTotalCount(newTotalCount);
    } catch (error) {
      console.error("Error fetching more connections: ", error);
    } finally {
      setLoading(false);
    }
  }
  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetchConnections(id, type, offset);
      const { connections: newData, totalCount: newTotalCount } = response.data;

      setData((prevData) => [...prevData, ...newData]);
      setOffset((prevOffset) => prevOffset + 10);
      setTotalCount(newTotalCount);
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
    <>
      <Button
        onClick={showModal}
        className="bg-white px-2 text-xs font-Jakarta text-black p-1 rounded-md shadow-sm md:shadow-lg"
      >
        {type === "followers" ? `Followers ${totalCount}` : `Followings ${totalCount}`}
      </Button>
      <Modal
        title="Connections"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className="items-center justify-center w-full h-[300px] overflow-y-scroll p-4 bg-white rounded"
          id="scrollableDiv"
        >
          <InfiniteScroll
            dataLength={length}
            next={loadMoreData}
            hasMore={ totalCount < data.length}
            endMessage={
              data.length < totalCount ? (
                <Divider plain>
                  <p onClick={loadMoreData} className="text-text-gray font-semibold cursor-pointer">See All</p>
                </Divider>
              ) : (
                <Divider plain>It is all, nothing more 🤐</Divider>
              )
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(listItem) => (
                <List.Item key={listItem._id}>
                  <List.Item.Meta
                    avatar={<AvatarBtn image={listItem.profilePicture} spell={listItem.userName.charAt(0).toUpperCase()} />}
                    title={<Link onClick={() => setIsModalOpen(false)} to={`/profile/${listItem._id}`} >{listItem.userName}</Link>}
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
      </Modal>
    </>
  );
};

ButtonElem.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  initialLength: PropTypes.number.isRequired
};

export default ButtonElem;
