import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IonLabel, IonProgressBar } from '@ionic/react';

interface StepLog {
  date: string;
  steps: number;
}

const stepsLeft = 500;
const goalSteps = 1000;
const currentSteps = 500;

const ProgressChart: React.FC<{ data: Array<StepLog> }> = ({ data }) => {
  return (
    <>
      <h1>Goal steps: 1000</h1>
      <IonLabel>
        <IonProgressBar value={1 - stepsLeft / goalSteps / 1}></IonProgressBar>
        {currentSteps.toString() + '/' + goalSteps.toString() + ' steps'}
      </IonLabel>
      <Bar
        options={{
          scales: {
            y: {
              grid: {
                drawBorder: false,
                color: '#FFFFFF'
              },
              ticks: {
                beginAtZero: true,
                color: 'white',
                fontSize: 12
              }
            },
            x: {
              grid: {
                drawBorder: false,
                color: '#FFFFFF'
              },
              ticks: {
                beginAtZero: true,
                color: 'white',
                fontSize: 12
              }
            }
          },
          color: 'white'
        }}
        data={{
          labels: data.map((item) => item.date),
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
    </>
  );
};

export default ProgressChart;
