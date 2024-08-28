import { useEffect } from 'react';
import { on } from "../../Utils/Socket"; // Assuming this is the file where your socket functions are defined
import { useDispatch } from 'react-redux';
import { addRealTimeMessage } from '../Redux/messageSlice';
const useReceiveMessage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log('message', message);
      dispatch(addRealTimeMessage(message))
      // You can add any additional logic here, such as updating state or triggering notifications
    };

    on('receiveMessage', handleReceiveMessage);

    // Cleanup function to unregister the event listener
    return () => {
      // Make sure to unregister the event listener when the component unmounts
      on('receiveMessage', null); // or use a specific function to unregister if your socket library provides one
    };
  }, []); // Empty dependency array to ensure this runs only on mount
};

export default useReceiveMessage;
