import React, { useState } from 'react';

const FeedHeadings = ({ headings, setValue }) => {
    const [current, setCurrent] = useState(0);

    const handleClick = (index, item) => {
        setCurrent(index);
        setValue(item);
    };

    return (
        <div className='flex gap-2 justify-end static'>
            {headings.map((item, index) => (
                <h2
                    className={`text-end cursor-pointer transition-all ease-in duration-400 ${index === current ? 'text-text-primary ' : 'text-text-gray'}`}
                    key={index}
                    onClick={() => handleClick(index, item)}
                >
                    {item}
                </h2>
            ))}
        </div>
    );
};

export default FeedHeadings;
