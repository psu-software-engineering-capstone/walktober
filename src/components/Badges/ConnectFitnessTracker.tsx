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
import './BadgeStyles.css';

const ConnectFitnessTracker: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <IonIcon icon={watchOutline} size="large"></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol>
            Connected!
            <IonItem class="p">
              Connect a fitness tracker to track steps
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default ConnectFitnessTracker;
