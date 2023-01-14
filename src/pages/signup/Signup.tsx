/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonButton,
  IonIcon,
  isPlatform
} from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreDB, auth } from '../../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import './Signup.css';

const Signup: React.FC = () => {
  // for routing //
  const history = useHistory();

  // sign-up variables //
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  // google auth provider //
  const provider = new GoogleAuthProvider();

  // user creation with email authentication (web & ios & android) //
  const createUser = () => {
    void setDoc(doc(FirestoreDB, 'users', newEmail), {
      email: newEmail,
      name: newFirstName + ' ' + newLastName,
      badges: [],
      device: '',
      num_steps: 0,
      profile_pic: '',
      team: '',
      team_leader: false
    });
  };

  // user creation with google authentication (web) //
  const createUserWithGoogleAuth = (result: UserCredential) => {
    void setDoc(doc(FirestoreDB, 'users', result.user.email as string), {
      email: result.user.email,
      name: result.user.displayName,
      badges: [],
      device: '',
      num_steps: 0,
      profile_pic: result.user.photoURL,
      team: '',
      team_leader: false
    });
  };

  // user creation with google authentication (ios & android) //
  const createUserWithGoogleAuthMobile = (result: any) => {
    void setDoc(doc(FirestoreDB, 'users', result.email as string), {
      email: result.email,
      name: result.name,
      badges: [],
      device: '',
      num_steps: 0,
      profile_pic: result.imageUrl,
      team: '',
      team_leader: false
    });
  };

  // sign up with google //
  const googleAuth = async () => {
    // web //
    if (!isPlatform('capacitor')) {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const dbRef = doc(FirestoreDB, 'users', result.user.email as string);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert('There is already an existing account under this email');
          } else {
            alert('Sign-up successful');
            createUserWithGoogleAuth(result);
            history.push('/login');
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      // ios & android //
    } else {
      await GoogleAuth.signIn()
        .then(async (result) => {
          void FirebaseAuthentication.signInWithGoogle(
            result.authentication.idToken,
            result.authentication.accessToken
          );
          const dbRef = doc(FirestoreDB, 'users', result.email);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert('There is already an existing account under this email');
            await GoogleAuth.signOut();
            await FirebaseAuthentication.signOut();
          } else {
            alert('Sign-up successful');
            createUserWithGoogleAuthMobile(result);
            history.push('/login');
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  // sign up with email and password (web & ios & android) //
  const signUpEmailPassword = async () => {
    if (newPassword === newConfirmPassword) {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((data) => {
          createUser();
          console.log(data);
          alert('Sign-up successful');
          history.push('/login');
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      alert('Passwords are not matching');
    }
  };

  // move to login button //
  const moveToLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardTitle class="ion-text-center">SignUp</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList class="ion-no-padding">
              <IonItem color="light">
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput
                  type="email"
                  name="email"
                  onIonChange={(e) => setNewEmail(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">
                  First Name
                </IonLabel>
                <IonInput
                  type="text"
                  name="fname"
                  onIonChange={(e) => setNewFirstName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">
                  Last Name
                </IonLabel>
                <IonInput
                  type="text"
                  name="lname"
                  onIonChange={(e) => setNewLastName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">
                  Password
                </IonLabel>
                <IonInput
                  type="password"
                  name="password"
                  onIonChange={(e) => setNewPassword(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">
                  Confirm Password
                </IonLabel>
                <IonInput
                  type="password"
                  name="cpassword"
                  onIonChange={(e) =>
                    setNewConfirmPassword(e.target.value as string)
                  }
                ></IonInput>
              </IonItem>

              <IonItem lines="none" color="light">
                <IonButton
                  onClick={signUpEmailPassword}
                  fill="solid"
                  color="tertiary"
                  size="default"
                  class="cbutton"
                >
                  Sign Up
                </IonButton>
              </IonItem>

              <IonItem lines="none" color="light">
                <IonButton
                  onClick={googleAuth}
                  fill="solid"
                  color="success"
                  size="default"
                  class="gbutton"
                >
                  <IonIcon icon={logoGoogle}></IonIcon>
                  Sign Up With Google
                </IonButton>
              </IonItem>

              <IonItem lines="none" color="light">
                <IonButton
                  onClick={moveToLogin}
                  fill="solid"
                  color="tertiary"
                  size="default"
                  class="cbutton"
                >
                  Back to Log In
                </IonButton>
              </IonItem>

              {/* Need hyperlink for the forgot password once implemented */}
              <IonCardContent class="fpass" color="light">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                  Forgot Password?
                </a>
              </IonCardContent>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
