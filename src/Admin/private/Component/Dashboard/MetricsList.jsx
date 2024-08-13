import React from 'react';
import Matrix from '../Specific/Matrix';
import BarChart from '../Specific/DonutCharts';
const MetricsList = ({ data }) => {
  // Ensure data is an object, defaulting to an empty object if undefined or null
  const metricsData = data || {};


  return (
    <div className=' gap-2 border p-2 rounded-lg'>
      <div className='grid grid-cols-2 gap-2 col-span-4'>
        {
          Object.values(metricsData).map((item, index) => (
            <Matrix key={index} value={item} />
          ))
        }
      </div>
      <div className=' p-5  w-full  rounded-lg'>
        {/* This area seems to be a placeholder; adjust as needed */}
        <BarChart data={metricsData}/>
      </div>
    </div>
  );
};

export default MetricsList;
