import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle
} from '@ionic/react';
import { updatePassword } from 'firebase/auth';
import { eyeOff, eye } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import NavBar from '../../components/NavBar';
import { auth } from '../../firebase';
import '../Tab1.css';

const newPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [veriPassword, setVeriPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  async function changePass() {
    if (oldPassword == auth.currentUser.Password) {
      if (newPassword == veriPassword) {
        updatePassword(auth.currentUser, newPassword);
      } else {
        alert(
          'The new password does not match the password entered for verification'
        );
      }
    } else {
      alert('The current password does not match the one on file.');
    }
  }
  updatePassword(auth.currentUser, newPassword)
    .then(() => {
      alert('Password change successful');
      useHistory().push('/profile');
    })
    .catch((error: any) => {
      alert('Something went wrong, please try again');
      console.log(error);
    });

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle> Change Password </IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer name="Change Password" />
        <IonItem>
          <IonLabel position="floating">Old Password</IonLabel>
          <IonInput
            type={passwordShown ? 'text' : 'password'}
            name="password"
            onIonChange={(e) => setOldPassword(e.target.value as string)}
          ></IonInput>
          <IonIcon
            icon={passwordShown ? eyeOff : eye}
            slot="end"
            onClick={togglePasswordVisibility}
          ></IonIcon>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">New Password</IonLabel>
          <IonInput
            type={passwordShown ? 'text' : 'password'}
            name="password"
            onIonChange={(e) => setNewPassword(e.target.value as string)}
          ></IonInput>
          <IonIcon
            icon={passwordShown ? eyeOff : eye}
            slot="end"
            onClick={togglePasswordVisibility}
          ></IonIcon>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Verify New Password</IonLabel>
          <IonInput
            type={passwordShown ? 'text' : 'password'}
            name="password"
            onIonChange={(e) => setVeriPassword(e.target.value as string)}
          ></IonInput>
          <IonIcon
            icon={passwordShown ? eyeOff : eye}
            slot="end"
            onClick={togglePasswordVisibility}
          ></IonIcon>
        </IonItem>
        <IonButton onClick={changePass}> Submit </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default newPassword;
