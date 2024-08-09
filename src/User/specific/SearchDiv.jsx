import React, { useState } from 'react';
import FeedHeadings from '../component/FeedHeadings';
import SearchBar from './SearchBar';
import UsersList from './UsersList';
import BlogList from './BlogList';
import ImageList from './imageList';
const SearchDiv = () => {
    const [value, setValue] = useState('users');
    const headings = ['users', 'blogs', 'images'];
    const [offset, setOffset] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='p-2 h-[90vh]  w-[700px] flex text-black flex-col gap-2'>
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}  
                setSearchResults={setSearchResults} 
                item={value} 
            />
            <FeedHeadings 
                headings={headings} 
                setValue={setValue}  
                value={value} 
                setSearchResults={setSearchResults}
            />
            { value === 'users' && (
                <UsersList 
                    data={searchResults} 
                    setSearchResults={setSearchResults} 
                    offset={offset} 
                    searchTerm={searchTerm} 
                    setOffset={setOffset} 
                    item={value}
                />
            )}
            { value === 'blogs' && <BlogList   data={searchResults} 
                    setSearchResults={setSearchResults} 
                    offset={offset} 
                    searchTerm={searchTerm} 
                    setOffset={setOffset} 
                    item={value}  />}

                    { value === 'images' && < ImageList
                    setSearchResults={setSearchResults} 

                    data={searchResults} 
                        />}
        </div>
    );
};

export default SearchDiv;
