import React, { useRef } from "react";
import { GoPaperclip } from "react-icons/go";

const FileShare = ({ setSelectedImage }) => {
  const fileInputRef = useRef(null);

  // Handle file input click
  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Pass the file to the parent component
    }
  };

  return (
    <div>
      {/* Paperclip Icon */}
      <button onClick={handleIconClick}>
        <GoPaperclip className="text-xl" />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }} // Hide the input element
        ref={fileInputRef}
        onChange={handleFileChange} // Handle file selection
      />
    </div>
  );
};

export default FileShare;
