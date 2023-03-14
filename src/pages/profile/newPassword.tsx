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
import NavBar from '../../components/NavBar';
import { auth } from '../../firebase';
import '../old/Tab1.css';

const newPassword: React.FC = () => {
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
        history.push("/app/profile");
      })
      .catch((error: any) => {
        alert('Something went wrong, please try again.\n If you have been logged in recently, you may have to log back in before attempting this.');
        console.log(error);
      });
    } else {
      alert(
        'The new password does not match the password entered for verification'
      );
    }
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
      <IonContent fullscreen>
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
        <IonButton onClick={backToProfile}> Back to Profile </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default newPassword;
