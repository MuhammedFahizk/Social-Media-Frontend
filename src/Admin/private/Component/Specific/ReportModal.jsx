import React, { useState } from "react";
import { Modal, Typography, Button, Space, Divider, Input, Form, Select, message } from "antd";
import { dismissReport, resolveReport } from "../../../api/PutApi";
import { deletePost } from "../../../api/deleteApi";

const { Text } = Typography;
const { Option } = Select;

const ReportModal = ({ selectedReport, onClose }) => {
    console.log(selectedReport.reportId);
    
  const [action, setAction] = useState("");
  const [adminComment, setAdminComment] = useState("");

  if (!selectedReport) return null;

  const handleResolve = async () => {
    try {
      await resolveReport(selectedReport.postId,selectedReport.reportId, adminComment);
      message.success("Report resolved successfully!");
      onClose(); 
    } catch (error) {
      console.error(error);
      message.error("Failed to resolve report.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(selectedReport.postId,selectedReport.reportId, adminComment); // Pass the comment here
      message.success("Post deleted successfully!");
      onClose(); // Close the modal after deletion
    } catch (error) {
      console.error(error);
      message.error("Failed to delete post.");
    }
  };

  const handleDismiss = async () => {
    try {
      await dismissReport(selectedReport.postId,selectedReport.reportId, adminComment); // Pass the comment here
      message.success("Report dismissed successfully!");
      onClose(); // Close the modal after dismissal
    } catch (error) {
      console.error(error);
      message.error("Failed to dismiss report.");
    }
  };

  const handleActionChange = (value) => {
    setAction(value);
  };

  const handleSubmit = async (e) => {
    if (action) {
      if (action === "delete-post") {
        await handleDelete();
      } else if (action === "dismiss") {
        await handleDismiss();
      } else {
        await handleResolve();
      }
    } else {
      message.warning("Please select an action.");
    }
  };

  return (
    <Modal
      visible={!!selectedReport} // Control modal visibility based on selectedReport
      title="Report Details"
      footer={null}
      onCancel={onClose} // Close modal on cancel
    >
      <Divider />
      <Text strong>Reporter Email:</Text>
      <Text>{selectedReport.reporterDetails.email}</Text>
      <br />
      <Text strong>Report Reason:</Text>
      <Text>{selectedReport.reason}</Text>
      <br />
      <Text strong>Post ID:</Text>
      <Text>{selectedReport.postId}</Text>
      <br />
      <Text strong>Content:</Text>
      <Text>{selectedReport.content}</Text>
      <br />
      <Text strong>Created At:</Text>
      <Text>{new Date(selectedReport.createdAt).toLocaleString()}</Text>
      <br />
      <Text strong>Status:</Text>
      <Text type={selectedReport.resolved ? "success" : "danger"}>
        {selectedReport.resolved ? "Resolved" : "Unresolved"}
      </Text>
      <Divider />

      <Form layout="vertical" onFinish={handleSubmit}>

        <Form.Item label="Select Action" required>
          <Select onChange={handleActionChange} placeholder="Select an action">
            <Option value="delete-post">Delete Post</Option>
            <Option value="ban-user">Ban User</Option>
            <Option value="dismiss">Dismiss Report</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Add a comment">
          <Input.TextArea
            rows={4}
            placeholder="Add your comments here..."
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
          />
        </Form.Item>
        <Space style={{ marginTop: "20px" }}>
          <Button type="primary" htmlType="submit" disabled={selectedReport.resolved}>
            {action === "delete-post" ? "Delete Post" : action === "dismiss" ? "Dismiss Report" : "Resolve Report"}
          </Button>
          <Button type="danger" onClick={onClose}>
            Cancel
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default ReportModal;
