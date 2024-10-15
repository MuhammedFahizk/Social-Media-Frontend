import React, { useEffect, useState } from 'react';
import { Avatar, Table } from 'antd';
import { usersList } from '../../api/getApi';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  const handleUserClick = (record) => {
    navigate(`/admin/user/${record._id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await usersList();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      title: '',
      dataIndex: 'profilePicture',
      render: (profilePicture) => (
        <Avatar src={profilePicture} icon={<UserOutlined />} />
      ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Following',
      dataIndex: 'following',
      render: (following) => following.length,
      sorter: (a, b) => a.following.length - b.following.length,
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      render: (followers) => followers.length,
      sorter: (a, b) => a.followers.length - b.followers.length,
    },
    {
      title: 'Status',
      dataIndex: 'isBlocked',
      render: (isBlocked) => (
        <p style={{ color: isBlocked.status ? 'red' : 'green' }}>
          {isBlocked.status ? 'Blocked' : 'Active'}
        </p>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        <Table
          columns={columns}
          dataSource={users}
          onChange={onChange}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => handleUserClick(record),
          })}
        />
      </div>
    </div>
  );
};

export default Users;
