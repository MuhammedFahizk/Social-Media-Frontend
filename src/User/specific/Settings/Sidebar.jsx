import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import { IoSettings } from 'react-icons/io5';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebars = () => {
  return (
    <Sider width={260} className="site-layout-background   h-full">
      <Menu
        mode="inline"
        className=" dark:bg-primary-dark rounded-lg dark:text-white h-[500px]"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />} className="dark:text-white">
          <Link className="dark:text-white" to="/profile-settings">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LockOutlined />} className="dark:text-white">
          <Link className="dark:text-white" to="/profile-settings/password">Change Password</Link>
        </Menu.Item>
        <SubMenu
  key="sub1"
  title={<span className='text-black dark:text-white'>Manage</span>}
  icon={<SettingOutlined className='text-black dark:text-white' />}
  className="dark:text-white"
>
  <Menu.Item key="3" className="dark:text-white">
    <Link className="dark:text-white" to="/profile-settings/hide-posts">Hide Posts</Link>
  </Menu.Item>
  <Menu.Item key="4" className="dark:text-white">
    <Link className="dark:text-white" to="/profile-settings/hide-users">Hide Users</Link>
  </Menu.Item>
</SubMenu>

        <Menu.Item key="5" icon={<IoSettings />} className="dark:text-white">
          <Link className="dark:text-white" to="/profile-settings/settings">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

// Wrap the Sidebar component with React.memo for memoization
export const Sidebar = memo(Sidebars);
