import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-opacity-50 bg-gray-900 z-50">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
