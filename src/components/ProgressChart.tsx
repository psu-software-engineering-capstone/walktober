// Purpose of this file is to create a React custom element to display a user's current progress in terms of past 7 days steps and or goal steps
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IonItem, IonLabel, IonProgressBar } from '@ionic/react';
import './progChart.css';

// below is the interface for the steps log. It reflects the values expected for displaying
interface StepLog {
  date: string;
  steps: number;
}

// below vars are self documenting
const stepsLeft = 500;
const goalSteps = 1000;
const currentSteps = 500;

// below is the react element.
// input/props is an array of step logs
// output is a react element
const ProgressChart: React.FC<{ data: Array<StepLog> }> = ({ data }) => {
  return (
    <>
      <h1>Goal steps: 1000</h1> {/*goal steps display here*/}
      <IonLabel>
        <IonProgressBar value={1 - stepsLeft / goalSteps / 1}></IonProgressBar>
        {currentSteps.toString() + '/' + goalSteps.toString() + ' steps'}
      </IonLabel>
      <Bar
        className="box"
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
