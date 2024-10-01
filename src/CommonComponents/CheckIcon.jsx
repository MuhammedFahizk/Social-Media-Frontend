import React from 'react';

const CheckIcon = ({ className = "h-8 w-8 text-red-500", width = 24, height = 24, strokeWidth = 2 }) => {
  return (
    <svg 
      className={className} 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      strokeWidth={strokeWidth} 
      stroke="currentColor" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />  
      <path d="M7 12l5 5l10 -10" />  
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
};

export default CheckIcon;
