import { TfiCommentAlt } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { Input } from 'antd';
import { useState } from "react";
import PropTypes from "prop-types";

const CommentBox = ({ openComments, setOpenComments }) => {
    const [send , setSend] = useState(false)
  return (
    <div className="flex items-center h-full gap-2 "> 
      
      <div className="relative w-full ">
      <Input
        type="text"
        className="bg-text-primary dark:bg-white p-1 px-5 rounded-lg md:rounded-full text-xs bg-inherit border-0 hover:bg-inherit w-full"
        placeholder="Type a message..."
        onChange={() =>  setSend(true)}

      />
     { send ? <AiOutlineSend className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
: null }</div>
      <TfiCommentAlt
        className=" cursor-pointer  "
        onClick={() =>
          openComments ? setOpenComments(false) : setOpenComments(true)
        }
      />
    </div>
  );
};
CommentBox.propTypes = {
    openComments: PropTypes.bool,
    setOpenComments: PropTypes.func,
    };

export default CommentBox;
