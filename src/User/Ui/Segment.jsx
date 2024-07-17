import React from "react";
import { Segmented } from "antd";

const Segment = ({ value, setValue, options }) => {
  return (
    <div className="flex justify-end p-5">
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
