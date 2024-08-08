import { Input } from 'antd';
import React from 'react';

const SearchBar = ({ setSearch, search }) => {
  return (
    <Input
      placeholder='Search ...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
