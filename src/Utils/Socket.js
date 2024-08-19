import { io } from "socket.io-client"

let socket

export const registerUser = (userId) => {
    if (!socket) {
      socket = io('http://localhost:8080', { withCredentials: true, transports: ['polling', 'websocket'] });
      socket.emit('registerUser', userId);
    }
  };

  export const unregisterUser = (userId) => {
    if (socket) {
      socket.off('newNotification');
    //   socket.emit('unregisterUser', userId);
      socket = null;
    }
  };
  
  export const on = (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  };