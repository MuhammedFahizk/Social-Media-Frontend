import React, { useState } from 'react';
import { Modal, Button, Form, Input, notification } from 'antd';
import DropDown from "../component/DropDown";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { FaEyeSlash, FaUserSlash } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { hideContent, reportPost } from '../auth/postApi'; // Ensure reportPost is imported

const MoreOptionFeed = ({ postId, userId }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm(); // Create a form instance

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

    // Function to show the report modal
    const showReportModal = () => {
        setIsModalVisible(true);
    };

    // Function to handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Function to handle form submit
    const handleReportSubmit = async (values) => {
        try {
            const reason = values.reason
            // Call the reportPost function with values and postId
            const response = await reportPost({reason, postId});
            console.log('Report submitted:', response);

            // Show success notification
            notification.success({
                message: 'Report Submitted',
                description: 'Your report has been successfully submitted.',
            });

            // Reset form fields
            form.resetFields();
        } catch (error) {
            console.error('Failed to submit report:', error);

            // Show error notification
            notification.error({
                message: 'Report Submission Failed',
                description: 'There was an issue submitting your report. Please try again later.',
            });
        } finally {
            // Close the modal regardless of success or error
            setIsModalVisible(false);
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
                    item={<div className='flex h-full  w-[100px]  items-center gap-2'><FaEyeSlash/><h3>Hide</h3></div>}
                />
            )
        },
        {
            key: 2,
            label: (
                <div className='flex h-full items-center gap-2 cursor-pointer' onClick={showReportModal}>
                    <GoReport className='text-red-600'/> 
                    <h3 className='text-red-600'>Report Post</h3>
                </div>
            )
        }
    ];

    return (
        <>
            <DropDown
                items={items}
                item={<IoEllipsisVerticalCircle className='text-xl' />}
            />

            <Modal
                title="Report Post"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="reportForm"
                    onFinish={handleReportSubmit}
                    layout="vertical"
                    form={form} // Attach the form instance
                >
                    <Form.Item
                        name="reason"
                        label="Reason"
                        rules={[{ required: true, message: 'Please enter the reason for reporting!' }]}
                    >
                        <Input placeholder="Enter the reason for reporting" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit Report
                        </Button>
                        <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default MoreOptionFeed;
