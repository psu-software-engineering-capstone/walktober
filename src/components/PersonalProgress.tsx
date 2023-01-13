import React, { ReactElement, useEffect } from 'react';
import { IonItem, IonProgressBar } from '@ionic/react';

const today = new Date();
const daysLeft = 31 - today.getUTCDate(); // 31 days in october

const PersonalProgress: React.FC<{}> = (): ReactElement => {
  const goalSteps = 1000;
  useEffect(() => {}, []); // will be used to pull the persons goal steps
  const currentSteps = 200;
  useEffect(() => {}, []); // will be used to get the persons current steps
  return (
    <>
      <IonItem>
        <p>Goal: {goalSteps}</p>
        <hr />
        <p>Current steps: {currentSteps}</p>
        <hr />
        <p>Steps needed to hit goal: {goalSteps - currentSteps}</p>
        <hr />
        <p>
          average steps needed to hit goal:{' '}
          {(goalSteps - currentSteps) / daysLeft}
        </p>
      </IonItem>
      <IonProgressBar
        value={1 - (goalSteps - currentSteps) / goalSteps / 1}
      ></IonProgressBar>
    </>
  );
};

export default PersonalProgress;
