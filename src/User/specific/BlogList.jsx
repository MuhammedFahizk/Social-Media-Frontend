import { List, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VirtualList from "rc-virtual-list";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import AvatarBtn from "../component/Avatar";
import { searchUsers } from "../auth/authUser";
const ContainerHeight = 400;

const BlogList = ({ data, setOffset, setSearchResults, searchTerm, item, offset }) => {
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const appendData = async () => {
        setLoading(true);
        try {
            const response = await searchUsers(searchTerm, item, offset);
            if (response.data.data.length === 0) {
                setHasMore(false);
                message.info('No more items to load.');
            } else {
                setSearchResults(prevResults => [...prevResults, ...response.data.data]);
                message.success(`${response.data.data.length} more items loaded!`);
                setOffset(prev => prev + 10);
            }
        } catch (error) {
            console.error("Failed to fetch more users:", error);
            message.error("Failed to fetch more users.");
        } finally {
            setLoading(false);
        }
    };

    const onScroll = (e) => {
        const threshold = 50; // Buffer to start loading earlier
        if (!loading && hasMore && e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight <= threshold) {
            appendData();
        }
    };

    return (
        <div className="blog-list text-black dark:text-white">
            <List>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={47}
                    itemKey="email"
                    onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                className="w-full"
                                avatar={
                                    <AvatarBtn
                                        src={item.author.profilePicture}
                                        spell={item.author.userName.charAt(0).toUpperCase()}
                                        image={item.profilePicture}
                                    />
                                }
                            />
                            <div className="flex gap-3 w-full justify-between h-full items-center">
                                <div className="text-start">
                                    <Link to={`/blog/${item._id}`}>
                                        <h2>{item.title}</h2>
                                    </Link>
                                    <p>{item.description}</p>
                                </div>
                                <img
                                    className="w-40 h-20 object-cover"
                                    alt="logo"
                                    src={item.imageUrl}
                                />
                            </div>
                        </List.Item>
                    )}
                </VirtualList>
               
            </List>
        </div>
    );
};

export default BlogList;
