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
  isPlatform,
  useIonLoading
} from '@ionic/react';
import { eye, eyeOff, logoGoogle } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirestoreDB, auth } from '../../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithCredential,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import AdminContext from '../../store/admin-context';
import './signup.css';
import logo from '../../assets/Walktober.png';

const Signup: React.FC = () => {
  // for routing //
  const history = useHistory();

  // loading screen //
  const [present] = useIonLoading();

  // sign-up variables //
  const [newEmail, setNewEmail] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  // google auth provider //
  const provider = new GoogleAuthProvider();

  // Admin settings context //
  const adData = useContext(AdminContext);

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // user creation with email authentication (web & ios & android) //
  const createUser = () => {
    void setDoc(doc(FirestoreDB, 'users', newEmail), {
      email: newEmail,
      name: newFirstName + ' ' + newLastName,
      totalStep: 0,
      profile_pic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
      team: '',
      team_leader: false,
      stepsByDate: [],
      admin: true,
      step_goal: 0,
    });
  };

  // user creation with google authentication (web) //
  const createUserWithGoogleAuth = (result: any) => {
    void setDoc(doc(FirestoreDB, 'users', result.user.email as string), {
      email: result.user.email,
      name: result.user.displayName,
      totalStep: 0,
      profile_pic: result.user.photoURL,
      team: '',
      team_leader: false,
      stepsByDate: [],
      admin: true,
      step_goal: 0,
    });
  };

  // user creation with google authentication (ios & android) //
  const createUserWithGoogleAuthMobile = (result: any) => {
    void setDoc(doc(FirestoreDB, 'users', result.email as string), {
      email: result.email,
      name: result.givenName + ' ' + result.familyName,
      totalStep: 0,
      profile_pic: result.imageUrl,
      team: '',
      team_leader: false,
      stepsByDate: [],
      admin: true,
      step_goal: 0,
    });
  };

  // sign up with google //
  const googleAuth = async () => {
    const currentDate: Date = new Date();
    const userCreationDeadline: Date = new Date(adData.regDate);
    if (currentDate > userCreationDeadline) {
      alert(
        `The user sign-up deadline is: ${userCreationDeadline}. You cannot register for an account now.`
      );
      return;
    }
    // web //
    if (!isPlatform('capacitor')) {
      signInWithPopup(auth, provider)
        .then(async (result: { user: { email: string } }) => {
          const dbRef = doc(FirestoreDB, 'users', result.user.email as string);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert('There is already an existing account under this email');
            void auth.signOut();
          } else {
            createUserWithGoogleAuth(result);
            // delay 1 second to allow firebase to update auth state //
            present({
              message: 'Loading...',
              duration: 1000,
              spinner: 'circles'
            });
            setTimeout(() => {
              history.push('/register');
            }, 1000);
          }
        })
        .catch((error: unknown) => {
          console.log(error);
        });
      // ios & android //
    } else {
      void GoogleAuth.signOut();
      await GoogleAuth.signIn()
        .then(
          async (result: { authentication: { idToken: any }; email: any }) => {
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
              void auth.signOut();
            } else {
              createUserWithGoogleAuthMobile(result);
              // delay 1 second to allow firebase to update auth state //
              present({
                message: 'Loading...',
                duration: 1000,
                spinner: 'circles'
              });
              setTimeout(() => {
                history.push('/register');
              }, 1000);
            }
          }
        )
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  // sign up with email and password (web & ios & android) //
  const signUpEmailPassword = () => {
    const currentDate: Date = new Date();
    const userCreationDeadline: Date = new Date(adData.regDate);
    if (currentDate > userCreationDeadline) {
      alert(
        `The user sign-up deadline is: ${userCreationDeadline}. You cannot register for an account now.`
      );
      return;
    }
    if (newPassword === newConfirmPassword) {
      createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then((data: unknown) => {
          createUser();
          console.log(data);
          //send a verification link to the email
          emailVerification();
          /// delay 1 second to allow firebase to update auth state //
          present({
            message: 'Loading...',
            duration: 1000,
            spinner: 'circles'
          });
          setTimeout(() => {
            history.push('/register');
          }, 1000);
        })
        .catch((error: unknown) => {
          console.log(error);
          alert(error);
        });
    } else {
      alert('Passwords are not matching');
    }
  };

  // sends a verication link to the user's email //
  const emailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(alert("Verification link has been sent to email!"))
    .catch((error: unknown) => {
      console.log(error);
      alert(error);
    });
  };

  // move to login button //
  const moveToLogin = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen className="signup">
        <IonCard className="signup-card">
          <IonCardHeader>
            <IonCardTitle class="ion-text-center">
              <img alt="Walktober logo" src={logo} />
              Sign up for the free 31-day walking challenge! Open to the entire
              PSU community.
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList class="ion-no-padding">
              <IonItem className="signup-card-field">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  name="email"
                  onIonChange={(e) => setNewEmail(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem className="signup-card-field">
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput
                  type="text"
                  name="fname"
                  onIonChange={(e) => setNewFirstName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem className="signup-card-field">
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput
                  type="text"
                  name="lname"
                  onIonChange={(e) => setNewLastName(e.target.value as string)}
                ></IonInput>
              </IonItem>

              <IonItem className="signup-card-field">
                <IonLabel position="floating">Password</IonLabel>
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

              <IonItem className="signup-card-field">
                <IonLabel position="floating">Confirm Password</IonLabel>
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

              <div>&nbsp;</div>

              <IonButton expand="block" color="primary" onClick={signUpEmailPassword}>
                Sign up
              </IonButton>

              <h2 className="or-divider">
                <span>OR</span>
              </h2>

              <IonButton expand="block" onClick={googleAuth} color="secondary">
                <IonIcon icon={logoGoogle}></IonIcon> &nbsp;Sign up with Google
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="signup-card bottom">
          <IonCardContent>
            <IonButton expand="block" onClick={moveToLogin} color="tertiary">
              Return to Login
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
