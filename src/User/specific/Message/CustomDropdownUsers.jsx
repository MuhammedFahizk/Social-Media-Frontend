import React, { useCallback } from "react";
import AvatarBtn from "../../component/Avatar";
import { useDispatch } from "react-redux";
import { ChooseUser, addChat } from "../../Redux/chattingSlice";

const CustomDropdown = ({ options }) => {
  const dispatch = useDispatch();

  const handleSelectUser = useCallback((user) => {
    dispatch(ChooseUser(user._id));
    dispatch(addChat(user));
  }, [dispatch]);

  return (
    <ul className="h-[40vh] overflow-y-scroll no-scrollbar">
      {options.map((option, index) => (
        <div
          key={index}
          className="p-1 flex gap-2 hover:bg-text-primary rounded-lg"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => handleSelectUser(option)}
        >
          <AvatarBtn />
          <h3 className="text-black text-md">{option.label}</h3>
        </div>
      ))}
    </ul>
  );
};

export default CustomDropdown;
