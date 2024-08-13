import React from 'react'

const Matrix = ({ value}) => {
 
  return (
    <div className="border  shadow-lg flex gap-2 hover:bg-[#fafdf3] rounded-lg p-2 h-10 w-full">
        <h3>{value.label}</h3>
        <h3>{value.count}</h3>
    </div>

  )
}

export default Matrix