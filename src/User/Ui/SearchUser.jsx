import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { searchUsers } from "../auth/authUser";
import { CiSearch } from "react-icons/ci";
import AvatarBtn from "../component/Avatar";
import { Link } from "react-router-dom";
const CustomDropdown = ({ options }) => (
    <ul>
      {options.map((option, index) => (
        <Link to={`/profile/${option._id}`} key={index} className="p-1 flex gap-2 hover:bg-text-primary rounded-lg" style={{ display: 'flex', alignItems: 'center' }}>
          <AvatarBtn image={option.profilePicture} spell={option.label.charAt(0).toUpperCase()} />
          <h3 className="text-black text-md ">{option.label}</h3>
        </Link>
      ))}
    </ul>
  
);

const SearchUser = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await searchUsers(value);
        const formattedResponse = response.map(user => ({
          label: user.userName,
          value: user.userName,
          _id: user._id,
          profilePicture: user.profilePicture
        }));
        setOptions(formattedResponse);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (value) {
      fetchOptions();
    }
  }, [value]);

  const filterOptions = (inputValue, option) =>
    option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;

  return (
    <div className="w-full">
      <AutoComplete
        value={value}
        options={options}
        // style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text) => setOptions(options.filter(filterOptions(text)))}
        onChange={onChange}
        placeholder=""
        className="h-full flex items-center  justify-center  mx-auto "
        popupClassName="custom-dropdown"
        dropdownRender={menu => (
          <CustomDropdown options={options} />
        )}
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 100)} // Delay to allow selection
      >
        <Input
            placeholder="Search ... "
          className="h-full flex items-center  rounded-lg border-text-primary"
          suffix={<CiSearch style={{ fontSize: 20 }} />}
        />
      </AutoComplete>
    </div>
  );
};

export default SearchUser;
