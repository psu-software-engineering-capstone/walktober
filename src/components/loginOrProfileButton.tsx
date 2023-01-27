/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router';

const LoginOrProfileButton: React.FC<{}> = (): ReactElement => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  return ctx.user ? (
    <IonButton
      class="loginHomeButton"
      onClick={() => {
        history.push('/app/profile');
      }}
      slot="end"
    >
      <IonIcon slot="start" name="person-circle-outline"></IonIcon>
      Profile
    </IonButton>
  ) : (
    <IonButton
      class="loginHomeButton"
      onClick={() => {
        history.push('/login');
      }}
      slot="end"
    >
      <IonIcon slot="start" name="person-circle-outline"></IonIcon>
      Login
    </IonButton>
  );
};

export default LoginOrProfileButton;
