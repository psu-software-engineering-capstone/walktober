import { IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './BadgeStyles.css';

const GoalComplete: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3050/3050426.png"
                alt="goal reached!"
                width={40}
                height={40}
              />
            </IonLabel>
          </IonCol>
          <IonCol>
            Summit reached
            <IonItem class="p">
              You set a steps goal for the event and reached it,
              congradulations!
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

const Attribute: React.FC<{}> = () => {
  return (
    <a href="https://www.flaticon.com/free-icons/goal" title="goal icons">
      Goal icons created by Freepik - Flaticon
    </a>
  );
};

export default GoalComplete;
export { Attribute };
