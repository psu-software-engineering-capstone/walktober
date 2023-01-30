import {
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { bodyOutline } from 'ionicons/icons';
import React from 'react';
import './BadgeStyles.css';

const TeamPlayer: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <IonIcon icon={bodyOutline} size="large"></IonIcon>
            </IonLabel>
          </IonCol>
          <IonCol>
            Team Player
            <IonItem class="p">
              Joined a team. Walking is more fun together!
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default TeamPlayer;
