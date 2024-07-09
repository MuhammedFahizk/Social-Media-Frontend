import React, { useState } from 'react';

const FeedHeadings = () => {
    const [current, setCurrent] = useState(0);
    const headings = ['Recent', 'Friends', 'Popular'];
  
    return (
      <div className='flex gap-2 justify-end static'>
        {headings.map((item, index) => (
          <h2
            className={`text-end cursor-pointer ${index === current ? 'text-text-primary' : 'text-text-gray'}`}
            key={index}
            onClick={() => setCurrent(index)}
          >
            {item}
          </h2>
        ))}
      </div>
    );
  }
  export default FeedHeadings;
