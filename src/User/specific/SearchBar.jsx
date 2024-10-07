import React, { useState, useEffect, useCallback } from "react";
import { Input, Button } from "antd";
import { searchUsers } from "../auth/authUser"; // Adjust the path as necessary
import { MdClear } from "react-icons/md";
import debounce from "lodash.debounce";

const SearchBar = ({ item, setSearchResults, setSearchTerm, searchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (term, item) => {
      try {
        const response = await searchUsers(term, item);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }, 1000),
    [item]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm, item);
    } else {
      setSearchResults([]); // Clear results if searchTerm is empty
    }

    return () => debouncedSearch.cancel();
  }, [searchTerm, item, debouncedSearch]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="p-2">
      <Input
        type="text"
        placeholder="Search..."
        className="w-full  sm:p-2 p-1 px-2  rounded-md sm:rounded-2xl"
        value={searchTerm}
        onChange={handleInputChange}
        suffix={
          <Button onClick={handleClearSearch} className=" rounded-full shadow-2xl">
            <MdClear className="text-red-300" />
          </Button>
        }
      />
    </div>
  );
};

export default SearchBar;
