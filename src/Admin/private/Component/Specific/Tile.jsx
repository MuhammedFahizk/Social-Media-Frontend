import React from "react";

const Tile = ({ icon, label, color = "bg-light" }) => {
  console.log(label); // This will log the label object

  return (
    <div
      className={` border  justify-between gap-3 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl p-4 ${color} items-center`}
      style={{ backgroundColor: color }}
    >
      {icon && <span className="text-2xl text-primary">{icon}</span>} 

      {
        label
      }
      </div>
  );
};

export default Tile;
