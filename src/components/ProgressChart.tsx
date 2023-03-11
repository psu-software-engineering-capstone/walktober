// Purpose of this file is to create a React custom element to display a user's current progress in terms of past 7 days steps and or goal steps
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IonLabel, IonProgressBar } from '@ionic/react';
import './progChart.css';

// below is the interface for the steps log. It reflects the values expected for displaying
interface StepLog {
  date: string;
  steps: number;
}

const ProgressChart: React.FC<{ data: Array<StepLog>, todayStep: number, stepGoal: number }> = ({ data, todayStep, stepGoal }) => {

  // below vars are self documenting
  const stepsLeft = stepGoal - todayStep;
  const style = getComputedStyle(document.documentElement);
  //primCol contains the color for the text and lines
  const primCol = style.getPropertyValue('--primaryColor');
  // below is the react element.
  // input/props is an array of step logs
  // output is a react element
  return (
    <>
      <h1>Goal steps: {stepGoal}</h1>
      <IonLabel>
        <IonProgressBar value={1 - stepsLeft / stepGoal / 1}></IonProgressBar>
        {todayStep.toString() + '/' + stepGoal.toString() + ' steps'}
      </IonLabel>
      <Bar
        className="box"
        options={{
          scales: {
            y: {
              grid: {
                drawBorder: false,
                color: primCol
              },
              ticks: {
                beginAtZero: true,
                color: primCol,
                fontSize: 12
              }
            },
            x: {
              grid: {
                drawBorder: false,
                color: primCol
              },
              ticks: {
                beginAtZero: true,
                color: primCol,
                fontSize: 12
              }
            }
          },
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
// <div> Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware"> Good Ware </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
// <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
// <div> Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
