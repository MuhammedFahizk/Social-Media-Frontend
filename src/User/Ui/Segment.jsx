import React from "react";
import { Segmented } from "antd";

const Segment = ({ value, setValue, options }) => {
  return (
    <div className="flex justify-start col-span-3   my-2     h-full items-center ">
      <Segmented
        options={options}
        value={value}
        onChange={setValue}

        className="dark:bg-secondary-dark dark:text-white  active:text-red-200 bg-white  p-2"
      />
    </div>
  );
};

export default Segment;
