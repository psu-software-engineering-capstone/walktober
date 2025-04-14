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
import GenericBadge from './GenericBadge';

const TeamPlayer: React.FC<{}> = () => {
  return (
    <GenericBadge
      iconType={bodyOutline}
      outerText="Team Player"
      innerText="Joined a team. Walking is more fun together!"
      isImage={false}
    ></GenericBadge>
  );
};

export default TeamPlayer;
