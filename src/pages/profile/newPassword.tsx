import React from 'react';
import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle
} from '@ionic/react';
import { updatePassword } from 'firebase/auth';
import { eyeOff, eye } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import { auth } from '../../firebase';
import './newPassword.css';

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [veriPassword, setVeriPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  async function changePass() {
    if (newPassword === '' || veriPassword === '') {
      alert('Please enter a new password');
      return;
    }
    if (newPassword == veriPassword) {
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          alert('Password change successful');
          history.push('/app/profile');
        })
        .catch((error: any) => {
          alert('Something went wrong. Please try again.');
          console.log(error);
        });
    } else {
      alert(
        'The new password does not match the password entered for verification'
      );
    }
    setNewPassword('');
    setVeriPassword('');
  }

  const backToProfile = () => {
    history.push('/app/profile');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> Change Password </IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding body">
        <IonCard className="password-change-card">
          <IonItem>
            <IonLabel position="floating">New Password</IonLabel>
            <IonInput
              type={passwordShown ? 'text' : 'password'}
              name="password"
              value={newPassword}
              onIonChange={(e) => setNewPassword(e.target.value as string)}
            ></IonInput>
            <IonButton
              fill="clear"
              color="medium"
              slot="end"
              onClick={togglePasswordVisibility}
              className="password-show"
            >
              <IonIcon
                slot="icon-only"
                icon={passwordShown ? eyeOff : eye}
              ></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Verify New Password</IonLabel>
            <IonInput
              type={passwordShown ? 'text' : 'password'}
              name="password"
              value={veriPassword}
              onIonChange={(e) => setVeriPassword(e.target.value as string)}
            ></IonInput>
            <IonButton
              fill="clear"
              color="medium"
              slot="end"
              onClick={togglePasswordVisibility}
              className="password-show"
            >
              <IonIcon
                slot="icon-only"
                icon={passwordShown ? eyeOff : eye}
              ></IonIcon>
            </IonButton>
          </IonItem>
          <IonGrid>
            <IonRow className="button-col">
              <IonCol size="5">
                <IonButton type="submit" onClick={changePass}>
                  {' '}
                  Submit{' '}
                </IonButton>
              </IonCol>
              <IonCol size="7">
                <IonButton onClick={backToProfile}> Back to Profile </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NewPassword;
