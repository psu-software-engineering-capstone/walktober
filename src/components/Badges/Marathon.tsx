import { IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './BadgeStyles.css';

const MarathonBadge: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3343/3343569.png"
                alt="Ran a Marathon!"
                width={40}
                height={40}
              />
            </IonLabel>
          </IonCol>
          <IonCol>
            Marathon!
            <IonItem class="p">
              You walked 26.2 miles, thats a whole Marathon!
            </IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

const Attribute: React.FC<{}> = () => {
  return (
    <a
      href="https://www.flaticon.com/free-icons/marathon"
      title="marathon icons"
    >
      Marathon icons created by Flat Icons - Flaticon
    </a>
  );
};

export default MarathonBadge;
export { Attribute };
