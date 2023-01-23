/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
import { eye, eyeOff, logoGoogle } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreDB, auth } from '../../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import './Signup.css';
import logo from '../../assets/Walktober.png';

const Signup: React.FC = () => {
  // for routing //
  const history = useHistory();

  // sign-up variables //
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  // google auth provider //
  const provider = new GoogleAuthProvider();

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
  const createUserWithGoogleAuth = (result: any) => {
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
      name: result.givenName + ' ' + result.familyName,
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
        .then(async (result: { user: { email: string } }) => {
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
        .catch((error: unknown) => {
          console.log(error);
          alert(error);
        });
      // ios & android //
    } else {
      void GoogleAuth.signOut();
      await GoogleAuth.signIn()
        .then(async (result) => {
          const idToken = result.authentication.idToken;
          const credential = GoogleAuthProvider.credential(idToken);
          signInWithCredential(auth, credential).catch((error: unknown) => {
            console.log(error);
            alert(error);
          });
          const dbRef = doc(FirestoreDB, 'users', result.email);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert('There is already an existing account under this email');
            void GoogleAuth.signOut();
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
  const signUpEmailPassword = () => {
    if (newPassword === newConfirmPassword) {
      createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((data: unknown) => {
          createUser();
          console.log(data);
          alert('Sign-up successful');
          history.push('/login');
        })
        .catch((error: unknown) => {
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
      <IonContent fullscreen className="signup">
        <IonCard>
          <IonCardHeader>
            <img alt="Walktober logo" src={logo} />
            <IonCardTitle class="ion-text-center">
              Sign up for the free 31-day walking challenge! Open to the entire
              PSU community.
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList class="ion-no-padding">
              <IonItem>
                <IonLabel position="floating" color="primary">
                  Email
                </IonLabel>
                <IonInput
                  type="email"
                  name="email"
                  onIonChange={(e) => setNewEmail(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating" color="primary">
                  First Name
                </IonLabel>
                <IonInput
                  type="text"
                  name="fname"
                  onIonChange={(e) => setNewFirstName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating" color="primary">
                  Last Name
                </IonLabel>
                <IonInput
                  type="text"
                  name="lname"
                  onIonChange={(e) => setNewLastName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating" color="primary">
                  Password
                </IonLabel>
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
                <IonLabel position="floating" color="primary">
                  Confirm Password
                </IonLabel>
                <IonInput
                  type={passwordShown ? 'text' : 'password'}
                  name="cpassword"
                  onIonChange={(e) =>
                    setNewConfirmPassword(e.target.value as string)
                  }
                ></IonInput>
                <IonIcon
                  icon={passwordShown ? eyeOff : eye}
                  slot="end"
                  onClick={togglePasswordVisibility}
                ></IonIcon>
              </IonItem>

              <IonButton expand="block" onClick={signUpEmailPassword}>
                Sign up
              </IonButton>
              <h2 className="or-divider">
                <span>OR</span>
              </h2>
              <IonButton expand="block" onClick={googleAuth} color="tertiary">
                <IonIcon icon={logoGoogle}></IonIcon> &nbsp;Sign up with Google
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="left">
          <IonCardContent>
            <IonButton expand="block" onClick={moveToLogin} color="success">
              Return to Login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
