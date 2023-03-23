// File is created for the display of badges, currently non implemented function

import {
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { accessibilityOutline } from 'ionicons/icons';
import React from 'react';

const Badge: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <IonIcon icon={accessibilityOutline}></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol>
            <IonItem>Main Text Of Badge Name</IonItem>
            <IonItem>Badge Description Stuff In Text</IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default Badge;
