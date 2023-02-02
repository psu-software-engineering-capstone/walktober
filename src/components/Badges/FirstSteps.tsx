import {
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { footstepsOutline } from 'ionicons/icons';
import React from 'react';
import './BadgeStyles.css';

const FirstSteps: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <IonIcon icon={footstepsOutline} size="large"></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol>
            The Journey of a thousand miles
            <IonItem class="p">Record your first steps</IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default FirstSteps;
