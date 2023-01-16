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
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonHeader
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './forgotpassword.css';

const ForgotPassword: React.FC = () => {
  // for routing //
  const history = useHistory();

  // sign-in variables //
  const [email, setEmail] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  // email validation functionality //
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  // validate the email input //
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === '') return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  // mark the email input as touched //
  const markTouched = () => {
    setIsTouched(true);
  };

  // sign in with email and password (web & ios & android) //
  const sendResetPassword = async () => {
    // Set up Firebase password reset
    console.log(email);
  };

  // move to signup button //
  const moveToSignup = () => {
    history.push('/signup');
  };

  // move to login button //
  const moveToLogin = () => {
    history.push('/login');
  };

  return (
      <IonPage>
        <IonHeader></IonHeader>
        <IonContent fullscreen className="login">
          <IonCard class="ion-text-center" className="right">
            <IonCardHeader>
              <IonCardTitle>Forgot Your Password?</IonCardTitle>
              <IonCardSubtitle>Enter your email, and we&apos;ll send you a link to get back into your account.</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem
                fill="solid"
                className={`${(isValid ?? false) && 'ion-valid'} ${
                  isValid === false && 'ion-invalid'
                } ${isTouched && 'ion-touched'}`} >
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  onIonInput={(event: any) => {
                    validate(event);
                    setEmail(event.target.value);
                  }}
                  onIonBlur={() => markTouched()} >
                </IonInput>
                <IonNote slot="helper">Enter a valid email</IonNote>
                <IonNote slot="error">Invalid email</IonNote>
              </IonItem>

              <IonButton expand="block" onClick={sendResetPassword}>Reset Password</IonButton>
              <h2 className="orDivider"><span>OR</span></h2>
              <IonButton expand="block" onClick={moveToLogin} color="tertiary">Return to Login</IonButton>

            </IonCardContent>
          </IonCard>

          <IonCard className="left">
            <IonCardContent className="noAccount">Don&apos;t have an account?
                <IonButton expand="block" onClick={moveToSignup} color="success">Create new account</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
  );
};

export default ForgotPassword;
