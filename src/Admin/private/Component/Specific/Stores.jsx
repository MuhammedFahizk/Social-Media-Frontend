import { Card, Table } from 'antd';
import React from 'react';

const Stores = ({ user }) => {
  // Prepare the data for the table
  const dataSource = user?.story?.map((story, index) => ({
    key: index,
    name: `Story ${index + 1}`, // Assuming stories don't have names; adjust accordingly
    views: story.views.length,
    tags: story.tags ? story.tags.join(', ') : 'No tags', // Assuming each story has a tags array
    number: index + 1,
    createdAt: new Date(story.createdAt).toLocaleString(),
  })) || [];

  // Define the columns for the table
  const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    
    
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  return (
    <Card className="bg-white shadow-lg rounded-lg p-6 h-[500px] overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800">Stories</h2>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Total Stories:</span> {dataSource.length}
      </p>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false} 
      />
    </Card>
  );
};

export default Stores;
