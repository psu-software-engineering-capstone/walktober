/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useEffect, useState } from 'react';
import { IonButton, IonItem, IonProgressBar } from '@ionic/react';

const today = new Date();
const daysLeft = 31 - today.getUTCDate(); // 31 days in october
const devmode = true;

const PersonalProgress: React.FC<{}> = (): ReactElement => {
  const goalSteps = 100000;
  useEffect(() => {}, []); // will be used to pull the persons goal steps
  const currentSteps = 2000;
  useEffect(() => {}, []); // will be used to get the persons current steps
  const [stepsLeft, setStepsLeft] = useState(goalSteps - currentSteps);
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
