/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IonButton,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRouterLink,
  IonPage,
  IonHeader,
  isPlatform
} from '@ionic/react';
import { eye, eyeOff, logoGoogle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithCredential
} from 'firebase/auth';
import { FirestoreDB, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './login.css';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import smallLogo from '../../assets/Walktober.png';

const Login: React.FC = () => {
  // for routing //
  const history = useHistory();

  // google auth provider //
  const provider = new GoogleAuthProvider();

  // sign-in variables //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [passwordShown, setPasswordShown] = useState(false);

  // sign out when rendering //
  useEffect(() => {
    void auth.signOut();
  }, []);

  // email validation functionality //
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  // validates input as non-empty email address //
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === '') return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // mark the email input as touched //
  const markTouched = () => {
    setIsTouched(true);
  };

  // sign in with google //
  const signInWithGoogle = async () => {
    // web //
    if (!isPlatform('capacitor')) {
      signInWithPopup(auth, provider)
        .then(async (result: { user: { email: string } }) => {
          const dbRef = doc(FirestoreDB, 'users', result.user.email as string);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert('Sign-in successful');
            history.push('/app');
          } else {
            void auth.signOut();
            alert(
              'This email is not a Walktober account. Please sign-up first.'
            );
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
        .then(
          async (result: { authentication: { idToken: any }; email: any }) => {
            const idToken = result.authentication.idToken;
            const credential = GoogleAuthProvider.credential(idToken);
            signInWithCredential(auth, credential).catch((error: any) => {
              console.log(error);
              alert(error);
            });
            const dbRef = doc(FirestoreDB, 'users', result.email);
            const dbSnap = await getDoc(dbRef);
            if (dbSnap.exists()) {
              alert('Sign-in successful');
              history.push('/app');
            } else {
              void auth.signOut();
              alert(
                'This email is not a Walktober account. Please sign-up first.'
              );
            }
          }
        )
        .catch((error: any) => {
          console.log(error);
          alert(error);
        });
    }
  };

  // sign in with email and password (web & ios & android) //
  const signInEmailPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((data: unknown) => {
        console.log(data);
        alert('Sign-in successful');
        history.push('/app');
      })
      .catch((error: unknown) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
     if(e.key === 'Enter'){
      signInEmailPassword();
     }
    });
  }, []);
  
  // move to signup button
  const moveToSignup = () => {
    history.push('/signup');
  };

  // move to forgot password page //
  const moveToForgotPassword = () => {
    history.push('/password/reset');
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen className="login">
        <IonCard className="signup-card">
          <IonCardHeader>
            <img alt="Walktober logo" src={smallLogo} />
            <IonCardTitle class="ion-text-center">
              Welcome to Walktober! Please log in to continue!
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem
              className={
                `${(isValid ?? false) && 'ion-valid'} ${
                  isValid === false && 'ion-invalid'
                } ${isTouched && 'ion-touched'}` + ' signup-card-field'
              }
            >
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                onIonInput={(event: any) => {
                  validate(event);
                  setEmail(event.target.value);
                }}
                onIonBlur={() => markTouched()}
              ></IonInput>
              <IonNote slot="helper">Enter a valid email</IonNote>
              <IonNote slot="error">Invalid email</IonNote>
            </IonItem>

            <IonItem className="signup-card-field">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type={passwordShown ? 'text' : 'password'}
                onIonInput={(event: any) => setPassword(event.target.value)}
              ></IonInput>
              <IonIcon
                icon={passwordShown ? eyeOff : eye}
                slot="end"
                onClick={togglePasswordVisibility}
              ></IonIcon>
            </IonItem>

            <IonRouterLink
              slot="helper"
              href="/password/reset"
              onClick={moveToForgotPassword}
            >
              <u>Forgot Password?</u>
            </IonRouterLink>

            <IonButton expand="block" color="primary" onClick={signInEmailPassword}>
              Login
            </IonButton>
            <h2 className="or-divider">
              <span>OR</span>
            </h2>
            <IonButton
              expand="block"
              onClick={signInWithGoogle}
              color="secondary"
            >
              <IonIcon icon={logoGoogle}></IonIcon> &nbsp;Sign in with Google
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className={'signup-card bottom'}>
          <IonCardContent className="no-account">
            Don&apos;t have an account?
            <IonButton expand="block" onClick={moveToSignup} color="tertiary">
              Create new account
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
