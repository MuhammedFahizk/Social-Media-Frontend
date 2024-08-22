import React from 'react';
import DropDown from "../component/DropDown";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { FaEyeSlash, FaUserSlash } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { hideContent } from '../auth/postApi';
const MoreOptionFeed = ({ postId, userId }) => {
    // Function to handle hiding content
    const hideContentFn = async (type, id) => {
        try {
            const data = { type, id };
            const response = await hideContent(data);
            console.log("Content hidden successfully:", response);
        } catch (error) {
            console.error("Failed to hide content:", error);
        }
    };

    // Sub-items for "Hide"
    const hidePostSubItems = [
        {
            key: 1,
            label: (
                <div 
                    onClick={() => hideContentFn('post', postId)}
                    className="flex items-center gap-2 cursor-pointer">
                    <FaEyeSlash />
                    <h3>Hide Post</h3>
                </div>
            )
        },
        {
            key: 2,
            label: (
                <div 
                    onClick={() => hideContentFn('user', userId)}
                    className="flex items-center gap-2 cursor-pointer">
                    <FaUserSlash />
                    <h3>Hide User</h3>
                </div>
            )
        }
    ];

    // Main items
    const items = [
        {
            key: 1,
            label: (
                <DropDown 
                    items={hidePostSubItems} // Pass the sub-items to the DropDown component
                    item={<div className='flex h-full items-center gap-2'><FaEyeSlash/><h3>Hide</h3></div>}
                />
            )
        },
        {
            key: 2,
            label: (
                <div className='flex h-full items-center gap-2'>
                    <GoReport className='text-red-600'/> 
                    <h3 className='text-red-600'>Report Post</h3>
                </div>
            )
        }
    ];

    return (
        <DropDown
            items={items}
            item={<IoEllipsisVerticalCircle className='text-xl' />}
        />
    );
}

export default MoreOptionFeed;
