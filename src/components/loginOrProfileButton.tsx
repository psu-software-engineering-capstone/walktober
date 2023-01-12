/* eslint-disable multiline-ternary */
import React, { ReactElement } from 'react';
import { IonButton, IonIcon } from '@ionic/react';

const loginOrProfileButton = (props: { loggedIn: boolean }): ReactElement => {
  return props.loggedIn ? (
    <IonButton class="loginHomeButton">
      <IonIcon slot="start" name="person-circle-outline"></IonIcon>
      Profile
    </IonButton>
  ) : (
    <IonButton class="loginHomeButton">
      <IonIcon slot="start" name="person-circle-outline"></IonIcon>Login
    </IonButton>
  );
};

export default loginOrProfileButton;
