import React from 'react';
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { IonLabel, IonProgressBar } from '@ionic/react';

interface dataProps {
  day: string;
  steps: number;
}

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

const stepsLeft = 500;
const goalSteps = 1000;
const currentSteps = 500;

const ProgressChart: React.FC<{ data: dataProps[] }> = ({ data }) => {
  return (
    <>
      <h1>Goal steps: 1000</h1>
      <IonLabel>
        <IonProgressBar value={1 - stepsLeft / goalSteps / 1}></IonProgressBar>
        {currentSteps.toString() + '/' + goalSteps.toString() + ' steps'}
      </IonLabel>
      <Bar
        data={{
          labels: data.map((item) => item.day),
          datasets: [
            {
              label: 'Number of steps',
              backgroundColor: 'rgba(225, 126, 38)',
              borderColor: 'rgba(142, 65, 46)',
              borderWidth: 2,
              data: data.map((item) => item.steps)
            }
          ]
        }}
      ></Bar>
      <Line
        data={{
          labels: data.map((item) => item.day),
          datasets: [
            {
              label: 'Number of steps',
              data: data.map((item) => item.steps)
            }
          ]
        }}
      ></Line>
    </>
  );
};

export default ProgressChart;
