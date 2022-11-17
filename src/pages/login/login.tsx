import React, { useState } from 'react';
import { 
    IonButton, 
    IonCol,
    IonContent,
    IonHeader,
    IonInput, 
    IonItem, 
    IonLabel, 
    IonNote,
    IonRouterLink,
    IonTitle,
    IonToolbar
} from '@ionic/react';
//import ExploreContainer from '../../components/ExploreContainer';
import './login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
 
    // Email Validation Functionality
    const validateEmail = (email: string) => {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    };
  
    const validate = (ev: Event) => {
      const value = (ev.target as HTMLInputElement).value;
  
      setIsValid(undefined);
  
      if (value === '') return;
  
      validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };
  
    const markTouched = () => {
      setIsTouched(true);
    };

    // Firebase Login Functionality (to be implemented)
    function loginUser() {
        // to be implemented
        console.log(username, password);
    }
  
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Login
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem 
                    fill="solid" 
                    className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" 
                        onIonInput={ (event: any) => { 
                            validate(event); 
                            setUsername(event.target.value);
                            }
                        }
                        onIonBlur={() => markTouched()}>
                    </IonInput>
                    <IonNote slot="helper">Enter a valid email</IonNote>
                    <IonNote slot="error">Invalid email</IonNote>
                </IonItem>

                <IonItem>
                    <IonLabel position="floating">Password input</IonLabel>
                    <IonInput type="password" onIonInput={(event:any) => setPassword(event.target.value)}></IonInput>
                    <IonRouterLink slot="helper" href="#">Forgot Password?</IonRouterLink>
                </IonItem>

                <IonCol>
                    <IonButton onClick={loginUser}>Login</IonButton>
                </IonCol>
            </IonContent>
        </>
    );
  }

  export default Login;
