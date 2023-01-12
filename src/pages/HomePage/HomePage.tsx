/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/react';
import loginOrProfileButton from '../../components/loginOrProfileButton';

const HomePage: React.FC = () => {
  const [IsloggedIn, setLoggedIn] = useState(false);
  const [steps, setSteps] = useState(0);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Home Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} className="ion-padding">
          <IonItem>
            <IonLabel>Todays Steps:</IonLabel>
            <p>{steps}</p>
          </IonItem>
          {IsloggedIn ? (
            <IonButton class="loginHomeButton">
              <IonIcon slot="start" name="person-circle-outline"></IonIcon>
              Profile
            </IonButton>
          ) : (
            <IonButton class="loginHomeButton">
              <IonIcon slot="start" name="person-circle-outline"></IonIcon>
              Login
            </IonButton>
          )}
          {/* below is only for development testing purposes */}
          <IonButton
            onClick={(event: any) => {
              setLoggedIn((prev) => {
                return !prev;
              });
            }}
          >
            Switch
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
