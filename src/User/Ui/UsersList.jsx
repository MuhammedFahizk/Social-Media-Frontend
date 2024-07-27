import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import AvatarBtn from '../component/Avatar';
import { Link } from 'react-router-dom';
import { searchUsers } from '../auth/authUser';
import PropTypes from 'prop-types';

const ContainerHeight = 400;

const UsersList = ({ data, setOffset, searchTerm, offset, item, setSearchResults }) => {
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
                setSearchResults(prevResults => {
                    const newResults = [...prevResults, ...response.data.data];
                    const uniqueResults = Array.from(new Set(newResults.map(item => item.email)))
                        .map(email => newResults.find(item => item.email === email));
                    return uniqueResults;
                });
                message.success(`${response.data.data.length} more items loaded!`);
                setOffset(prev => prev + 10);
            }
        } catch (error) {
            console.error("Failed to fetch more users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setHasMore(true);
        setOffset(10);
        setSearchResults([]);
    }, [searchTerm, item, setOffset, setSearchResults]);

    const onScroll = (e) => {
        const threshold = 50; // Add a buffer to start loading earlier
        if (!loading && hasMore && e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight <= threshold) {
            appendData();
        }
    };

    return (
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
                        <Link to={`/profile/${item._id}`}>
                            <List.Item.Meta
                                avatar={<AvatarBtn src={item.profilePicture} spell={item.userName.charAt(0).toUpperCase()} image={item.profilePicture} />}
                                title={<p className='text-black dark:text-white'>{item.userName}</p>}
                                description={<p className='text-black dark:text-white'>{item.email}</p>}
                            />
                        </Link>
                        <div>Content</div>
                    </List.Item>
                )}
            </VirtualList>
            {!hasMore && (
                <div className='text-center py-4'>
                    <p className='text-black dark:text-white'>No more items to load.</p>
                </div>
            )}
        </List>
    );
};

UsersList.propTypes = {
    data: PropTypes.array.isRequired,
    setOffset: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    item: PropTypes.string.isRequired,
    setSearchResults: PropTypes.func.isRequired
};

export default UsersList;
