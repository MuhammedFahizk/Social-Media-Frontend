import React from "react";
import { Segmented } from "antd";

const Segment = ({ value, setValue, options }) => {
  return (
    <div className="flex justify-end col-span-3      h-full items-center ">
      <Segmented
        options={options}
        value={value}
        onChange={setValue}
        className=""
      />
    </div>
  );
};

export default Segment;
