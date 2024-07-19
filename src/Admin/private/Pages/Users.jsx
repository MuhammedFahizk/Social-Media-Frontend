import React, { useEffect, useState } from 'react';
import { Avatar, Table } from 'antd';
import { usersList } from '../../../api/auth';
import { UserOutlined } from '@ant-design/icons';
const Users = () => {
  const [users, setUsers] = useState([]);
  
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
      dataIndex: 'ProfilePic',
      sortDirections: ['descend', 'ascend'],
      render: (profilePic) => (
        <Avatar src={profilePic} icon={<UserOutlined/>}  />
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
      title: 'Following',
      dataIndex: 'followers',
      render: (followers) => followers.length,
      sorter: (a, b) => a.followers.length - b.followers.length,
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
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Users;
