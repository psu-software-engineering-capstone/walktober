import { IonCol, IonGrid, IonItem, IonRow } from '@ionic/react';
import React from 'react';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const monthStart = new Date(`October 1, ${currentYear}`);

// for displaying badges we could just make an array of the badge level with its current leaf. That way the content could
// just be leaftDate[number]; to display it more or less. Probably more complicated than that but that's the jist

const populateCalendar = () => {
  let number = 1;

  return (
    <IonGrid>
      <IonRow>
        <IonCol>{'October'}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>{monthStart.getDay() == 0 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 1 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 2 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 3 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 4 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 5 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem>
            {monthStart.getDay() == 6 || number > 1 ? number++ : ''}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number++}</IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
        <IonCol>
          <IonItem>{number <= 31 ? number++ : ''}</IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const CalendarLeafs: React.FC<object> = () => {
  let calStart = false;

  return <>{populateCalendar()}</>;
};

export default CalendarLeafs;
