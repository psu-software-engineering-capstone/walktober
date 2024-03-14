// File created by NathanMoes, aim is to create a ionic frame work progress bar showing the progress user has made on daily goal
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useEffect, useState } from 'react';
import { IonItem, IonProgressBar } from '@ionic/react';


const now = Date.now();
const today = new Date(now);
const daysLeft = 31 - today.getUTCDate(); // 31 days in october

const PersonalProgress: React.FC<{}> = (): ReactElement => {
  const goalSteps = 100000;
  useEffect(() => {}, []); // will be used to pull the persons goal steps
  const currentSteps = 2000; /* mock data */
  useEffect(() => {}, []); // will be used to get the persons current steps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stepsLeft, setStepsLeft] = useState(goalSteps - currentSteps); /* the second value returned, setStepsLeft, is a function you can use to update the state variable*/
  return (
    <>
      <IonItem>
        <p>Goal: {goalSteps}</p>
        <hr />
        <p>Current steps: {currentSteps}</p>
        <hr />
        <p>Steps needed to hit goal: {stepsLeft}</p>
        {stepsLeft > 0 ? (
          <>
            <hr />
            <p>
              average steps needed to hit goal: {stepsLeft / daysLeft} per day
            </p>
          </>
        ) : (
          <>
            <hr />
            <p>Congrats you made your goal!</p>
          </>
        )}
      </IonItem>
      <IonProgressBar value={1 - stepsLeft / goalSteps / 1}></IonProgressBar>
    </>
  );
};

export default PersonalProgress;
