import React, { useState } from "react";
import { Segmented } from "antd";

const Segment = () => {
  const [value, setValue] = useState("Post");
  return (
    <div className="flex justify-end p-5">
      <Segmented
      
        options={["Post", "Tagged", "Saved"]}
        value={value}
        onChange={setValue}

        className="bg-text-primary"

      />
    </div>
  );
};

export default Segment;
