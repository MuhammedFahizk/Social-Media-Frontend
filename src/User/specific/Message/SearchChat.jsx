import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { searchUsers } from "../../auth/authUser";
import { CiSearch } from "react-icons/ci";
import CustomDropdown from "./CustomDropdownUsers";

const SearchChat = () => {
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
        const response = await searchUsers(value, 'users', 0);
        console.log('response', response);
        const formattedResponse = response.data.data.map(user => ({
          label: user.userName,
          value: user.userName,
          _id: user._id
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
    option.label.toLowerCase().includes(inputValue.toLowerCase());

  return (
    <div className="w-full">
      <AutoComplete
        value={value}
        options={options}
        onSelect={onSelect}
        onChange={onChange}
        className="h-fit w-full"
        popupClassName="custom-dropdown"
        dropdownRender={menu => <CustomDropdown options={options} />}
        onFocus={() => setVisible(true)}
        onBlur={() => setTimeout(() => setVisible(false), 100)} 
      >
        <Input
          placeholder="Search ... "
          className="h-full flex items-center p-2 rounded- md border-text-primary"
          suffix={<CiSearch style={{ fontSize: 20 }} />}
        />
      </AutoComplete>
    </div>
  );
};

export default SearchChat;
