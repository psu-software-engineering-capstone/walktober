import {
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React from 'react';
import './BadgeStyles.css';

const GenericBadge: React.FC<{}> = (props: {
  iconType: any;
  outerText: string;
  innerText: string;
  image: boolean;
  imgSrc: string;
  imgAlt: string;
}) => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              {props.image ? (
                <img
                  src={props.imgSrc}
                  width={40}
                  height={40}
                  alt={props.imgAlt}
                />
              ) : (
                <IonIcon icon={props.icon} size="large"></IonIcon>
              )}
            </IonLabel>
          </IonCol>
          <IonCol>
            {props.outerText}
            <IonItem class="p">{props.innerText}</IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default GenericBadge;
