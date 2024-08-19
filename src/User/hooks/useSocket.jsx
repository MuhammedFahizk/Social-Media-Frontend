import React, { useEffect, useState } from 'react'
import { registerUser, unregisterUser, on } from "../../Utils/Socket"; // Assuming this is the file where your socket functions are defined

const useSocket = (userId, setNotifications) => {
    useEffect(() => {
        if (userId) {
          registerUser(userId);
          on("newNotification", (notification) => {
            setNotifications((prevNotifications) => [
              notification,
              ...prevNotifications,
            ]);
          });
        }
    
        return () => {
          if (userId) {
            unregisterUser(userId);
          }
        };
      }, [userId]);
    
}

export default useSocket