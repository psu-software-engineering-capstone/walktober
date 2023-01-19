import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const apple = (): void => {
  const barChart = new Chart(CHART, {
    type: 'bar',
    data: {
      labels: ['mon', 'tue', 'wed', 'thrs', 'fry', 'sat', 'sun'],
      datasets: [
        {
          label: 'Number of steps',
          backgroundColor: '#00ff00',
          borderColor: '#00ff00',
          borderWidth: 2,
          data: [12, 10, 20, 50, 15, 16, 11]
        }
      ]
    }
  });
};

const ProgressChart: React.FC<{}> = () => {
  return (
    <>
      <Bar
        data={{
          labels: ['mon', 'tue', 'wed', 'thrs', 'fry', 'sat', 'sun'],
          datasets: [
            {
              label: 'Number of steps',
              backgroundColor: '#00ff00',
              borderColor: '#00ff00',
              borderWidth: 2,
              data: [12, 10, 20, 30, 15, 16, 11]
            }
          ]
        }}
      ></Bar>
    </>
  );
};

export default ProgressChart;
