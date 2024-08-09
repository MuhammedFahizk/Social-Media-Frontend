import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { searchUsers } from '../auth/authUser'; // Adjust the path as necessary
import { MdClear } from "react-icons/md";

const SearchBar = ({ item, setSearchResults,setSearchTerm, searchTerm }) => {

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const performSearch = async () => {
      try {
        const response = await searchUsers(searchTerm, item);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
      performSearch();
  }, [searchTerm, item]); // Added item as a dependency

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        className="w-full p-2 rounded-2xl"
        value={searchTerm}
        onChange={handleInputChange}
        suffix={
            <div>
                <Button  onClick={() => {{setSearchResults([]), setSearchTerm('')}}}><MdClear className='text-red-300' /></Button>
            </div>
        }
      />
     
    </div>
  );
};

export default SearchBar;

