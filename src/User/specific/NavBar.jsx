import React, { useEffect, useState } from "react";
import Title from "../component/Title";
import SearchBer from "../component/SearchBer";
import { IoIosNotificationsOutline } from "react-icons/io";
import DarkMode from "../component/DarkMode";
import { MessageOutlined } from "@ant-design/icons";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import Notification from "./Notification";

const NavBar = () => {
  const { user } = useSelector(state => state);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:8080', { // Ensure the correct port here
      withCredentials: true,
      transports: ['polling', 'websocket'],
    });
  
    socket.emit('registerUser', user._id);
  
    socket.on('newNotification', (notification) => {
      console.log('New notification:', notification);
      setNotifications(prevNotifications => [notification, ...prevNotifications]);
    });
  
    return () => {
      socket.off('newNotification');
    };
  }, [user._id]);
  console.log('notifications', notifications);
  const notificationMenu = (
    <Menu className=" ">
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <Menu.Item key={index} className="dark:bg-ternary-dark hover:bg-secondary-dark">
            {
              notif.message.type === 'follow' || notif.message.type  === 'unFollow' ? (
                <Notification data={notif.message} setNotifications={setNotifications}/>
              ): ('') 
            }
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>No notifications</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="flex h-[56px] top-0 sticky z-50 dark:bg-darkSecondary bg-secondary-light dark:bg-secondary-dark dark:text-white justify-between px-2 md:px-10 mx-2 rounded-lg shadow-lg">
      <Title />
      <div className="flex gap-3 h-full items-center">
        <Link to={'/messages'}>
          <Badge count={2}>
            <Avatar className="bg-text-primary" count="1" icon={<MessageOutlined />} />
          </Badge>
        </Link>
        <Dropdown overlay={notificationMenu} trigger={['click']}>
          <Badge count={notifications.length}>
            <Avatar className="bg-text-primary" icon={<IoIosNotificationsOutline />} />
          </Badge>
        </Dropdown>
        <DarkMode />
        <ProfileButton />
      </div>
    </div>
  );
};

export default NavBar;


