import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import { IoSettings } from 'react-icons/io5';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebars = () => {
  return (
    <Sider width={260} className="site-layout-background ">
      <Menu
        mode="inline"
        className="dark:bg-secondary-dark rounded-lg dark:text-white"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />} className="dark:text-white">
          <Link className="dark:text-white" to="/edit-profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LockOutlined />} className="dark:text-white">
          <Link className="dark:text-white" to="/edit-profile/password">Change Password</Link>
        </Menu.Item>
        <SubMenu key="sub1" title="Manage" icon={<SettingOutlined />} className="dark:text-white">
          <Menu.Item key="3" className="dark:text-white">
            <Link className="dark:text-white" to="/edit-profile/hide-posts">Hide Posts</Link>
          </Menu.Item>
          <Menu.Item key="4" className="dark:text-white">
            <Link className="dark:text-white" to="/edit-profile/hide-users">Hide Users</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="5" icon={<IoSettings />} className="dark:text-white">
          <Link className="dark:text-white" to="/edit-profile/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

// Wrap the Sidebar component with React.memo for memoization
export const Sidebar = memo(Sidebars);
