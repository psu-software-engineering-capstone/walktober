import {
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { watchOutline } from 'ionicons/icons';
import React from 'react';

const ConnectFitnessTracker: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <IonIcon icon={watchOutline}></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol>
            <IonItem>Connected</IonItem>
            <IonItem>Connect a fitness tracker to track steps</IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default ConnectFitnessTracker;
