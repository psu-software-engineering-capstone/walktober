import { IonCol, IonGrid, IonItem, IonRow } from '@ionic/react';
import React from 'react';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthStart = new Date(`October 1, ${currentYear}`);

const populateCalendar = () => {
  let number = 1;

  return (
    <IonGrid>
      <IonRow>
        <IonCol>{monthStart.getDay() == 0 ? number++ : ''}</IonCol>
        <IonCol>
          {monthStart.getDay() == 1 || number > 1 ? number++ : ''}
        </IonCol>
        <IonCol>
          {monthStart.getDay() == 2 || number > 1 ? number++ : ''}
        </IonCol>
        <IonCol>
          {monthStart.getDay() == 3 || number > 1 ? number++ : ''}
        </IonCol>
        <IonCol>
          {monthStart.getDay() == 4 || number > 1 ? number++ : ''}
        </IonCol>
        <IonCol>
          {monthStart.getDay() == 5 || number > 1 ? number++ : ''}
        </IonCol>
        <IonCol>
          {monthStart.getDay() == 6 || number > 1 ? number++ : ''}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
        <IonCol>{number++}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
        <IonCol>{number <= 31 ? number++ : ''}</IonCol>
      </IonRow>
    </IonGrid>
  );
};

const CalendarLeafs: React.FC<object> = () => {
  let calStart = false;

  return <>{populateCalendar()}</>;
};

export default CalendarLeafs;
