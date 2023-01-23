import { IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './BadgeStyles.css';

const Diamond: React.FC<{}> = () => {
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>
              <img
                src="https://cdn-icons-png.flaticon.com/512/408/408472.png"
                alt="diamond"
                width={40}
                height={40}
              />
            </IonLabel>
          </IonCol>
          <IonCol>
            Diamond
            <IonItem class="p">asdsaas</IonItem>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

const Attribute: React.FC<{}> = () => {
  return (
    <a href="https://www.flaticon.com/free-icons/diamond" title="diamond icons">
      Diamond icons created by Freepik - Flaticon
    </a>
  );
};

export default Diamond;
export { Attribute };
