import React, { useEffect, useState } from 'react';
import { fetchReports } from '../../api/getApi';
import { Table, Card, Spin, Alert, Typography, Modal } from 'antd';
import ReportModal from '../Component/Specific/ReportModal';

const { Title, Text } = Typography;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, []);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Reporter Email',
      dataIndex: ['reporterDetails', 'email'],
      key: 'reporterEmail',
    },
    {
      title: 'Report Reason',
      dataIndex: 'reportReason',
      key: 'reportReason',
    },
    {
      title: 'Post ID',
      dataIndex: 'postId',
      key: 'postId',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Created At',
      dataIndex: 'reportCreatedAt',
      key: 'reportCreatedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'reportResolved',
      key: 'reportResolved',
      render: (resolved) => (
        <Text type={resolved ? 'success' : 'danger'}>
          {resolved ? 'Resolved' : 'Unresolved'}
        </Text>
      ),
    },
  ];

  const handleRowClick = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: '20px' }}
      />
    );
  }

  return (
    <Card style={{ margin: '20px' }}>
      <Title level={2}>Reports</Title>
      {reports.length > 0 ? (
        <Table
          dataSource={reports}
          columns={columns}
          rowKey={(record) => record.reportId}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: '20px' }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record), // Handle row click
          })}
        />
      ) : (
        <Text>No reports found</Text>
      )}
      
      
        {selectedReport && (
          <ReportModal onClose={handleModalClose}  selectedReport={selectedReport}/>
        )}
    </Card>
  );
};

export default Reports;
