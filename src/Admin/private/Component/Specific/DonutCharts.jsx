import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

// Function to generate random light colors
const getRandomLightColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 50) + 50; // Saturation between 50% and 100%
  const lightness = Math.floor(Math.random() * 20) + 70; // Lightness between 70% and 90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function App({ data }) {
  const chartData = Object.values(data).filter(
    item => item.label !== 'Total Users' && item.label !== 'Total Posts'
  );

  const chart = {
    labels: chartData.map(item => item.label),
    datasets: [
      {
        data: chartData.map(item => item.count),
        backgroundColor: chartData.map(() => getRandomLightColor()),
        hoverBackgroundColor: chartData.map(() => getRandomLightColor()),
      }
    ]
  };

  return (
    <div>
      <Doughnut data={chart} width={200} height={200} />
    </div>
  );
}
