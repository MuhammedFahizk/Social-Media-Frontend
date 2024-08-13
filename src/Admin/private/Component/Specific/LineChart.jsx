import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { tree } from 'd3';

// Register the required components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ fullMonthlyData = [] }) => {
  // Define month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
  ];

  // Sort fullMonthlyData by year and month
  const sortedData = fullMonthlyData.sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    }
    return a.year - b.year;
  });

  // Generate labels and data points based on sorted data
  const labels = sortedData.map(item => months[item.month - 1] );
  const dataPoints = sortedData.map(item => item.totalUsers);

  // Data for the chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Users',
        data: dataPoints,
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
      {
        label: 'Monthly Posts',
        data: sortedData.map(item => item.totalPosts),
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
    tension: 0.4

      }
    ]
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        },
        ticks: {
          autoSkip: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number'
        }
      }
    }
  };

  return (
    <div >
      <h2>Monthly User Statistics</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
