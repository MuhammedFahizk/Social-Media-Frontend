import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import useSocket from "../../hooks/useSocket";
import { fetchUserNotifications } from "../../auth/getApi";
import { Lists } from "./Lists";
import Notification from "./Notification";
import Like from "./Like";

const NotificationMenu = () => {
  const {user} = useSelector(state => state.user)
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  useSocket(user?._id, setNewNotifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetchUserNotifications();
      setNotifications(response.data);
    };
    fetchNotifications();
  }, [user._id]);

  const separate = notifications.reduce((result, notification) => {
    const key = notification.notification.type;
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(notification);
    return result;
  }, {});

  const notificationMenu = (
    <Menu className="max-h-[500px] bg-white shadow-lg rounded-lg overflow-hidden dark:bg-ternary-dark">
      {newNotifications.length > 0 && (
        <Menu.Item className="hover:bg-gray-100 dark:hover:bg-secondary-dark">
          {newNotifications.map((item, index) => (
            <Notification key={index} data={item} />
          ))}
        </Menu.Item>
      )}
      {notifications.length > 0 ? (
        Object.entries(separate).map(([type, notificationsByType]) => (
          <React.Fragment key={type}>
            {type === "follow" ? (
              <Lists
                notifications={notificationsByType}
                setNotifications={setNotifications}
              />
            ) : type === "like" ? (
              <Like
                notifications={notificationsByType}
                setNotifications={setNotifications}
              />
            ) : null}
          </React.Fragment>
        ))
      ) : (
        <Menu.Item className="p-4 text-center hover:bg-gray-100 dark:hover:bg-secondary-dark">
          <h3 className="dark:text-white text-black">No notifications</h3>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={notificationMenu} trigger={["hover"]}>
      <Badge count={newNotifications.length}>
        <Avatar className="bg-text-primary" icon={<IoIosNotificationsOutline />} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationMenu;
