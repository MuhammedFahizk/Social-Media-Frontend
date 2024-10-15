import React from 'react';
import Matrix from '../Specific/Matrix';
import BarChart from '../Specific/DonutCharts';

const MetricsList = ({ data }) => {
  const metricsData = data || {};

  const filteredMetricsData = Object.entries(metricsData).reduce((acc, [key, value]) => {
    if (key !== 'newPostsCurrentMonth' &&  key !== 'newUsersCurrentMonth' && key !== 'blockedUsersCurrentMonth') {
      acc[key] = value;
    }
    return acc;
  }, {});

  return (
    <div className='gap-2 border p-2 rounded-lg'>
      <div className='grid grid-cols-2 gap-2 col-span-4'>
        {
          Object.entries(filteredMetricsData).map(([key, item], index) => (
            <Matrix key={index} value={item} />
          ))
        }
      </div>
      <div className='p-5 w-full rounded-lg'>
        <BarChart data={filteredMetricsData} />
      </div>
    </div>
  );
};

export default MetricsList;
