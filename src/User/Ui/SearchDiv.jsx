import React, { useState } from 'react';
import FeedHeadings from '../component/FeedHeadings';
import SearchBar from './SearchBar';
import UsersList from './UsersList';
const SearchDiv = () => {
    const [value, setValue] = useState('users');
    const headings = ['users', 'blogs', 'images'];
    const [offset, setOffset] = useState(0)
    const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    
    return (
        <div className='p-2 h-[90vh] col-span-6 w-full flex text-black  flex-col gap-2'>
            <SearchBar  searchTerm={searchTerm} setSearchTerm={setSearchTerm}  setSearchResults={setSearchResults} item={value}  />
            <FeedHeadings headings={headings} setValue={setValue}  value={value} />
            <UsersList data={searchResults} setSearchResults={setSearchResults} offset={offset} searchTerm={searchTerm} setOffset={setOffset} item={value}/>
        </div>
    );
};

export default SearchDiv;
