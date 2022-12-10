import {
  IonButton,
  IonCol,
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
  isPlatform,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirestoreDB, auth } from "../../firebase";
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication';
import { doc, getDoc } from "firebase/firestore";
import "./login.css";



const Login: React.FC = () => {
  const history = useHistory();

  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  // sign in with google //
  const signInWithGoogle = async () => {
    // only for web , ios and android need different approach
    if (!isPlatform("capacitor")) {
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const dbRef = doc(FirestoreDB, "users", result.user.email as string);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert("Sign-in successful");
            history.push("/app");
          } else {
            auth.signOut();
            alert("This email is not a Walktober account. Please sign-up first.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      // implement mobile version here
    }
  };

  // sign in with email and password //
  const signInEmailPassword = async () => {
    // web //
    if (!isPlatform("capacitor")) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data);
          alert("Sign-in successful");
          history.push("/app");
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    // ios & android //
    } else {
      FirebaseAuthentication.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        alert("Sign-in successful");
        history.push("/app");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      })
    }
  };

  // move to signup button
  const moveToSignup = () => {
    history.push("/signup");
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem
              fill="solid"
              className={`${isValid && "ion-valid"} ${
                isValid === false && "ion-invalid"
              } ${isTouched && "ion-touched"}`}
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

            <IonItem fill="solid">
              <IonLabel position="floating">Password input</IonLabel>
              <IonInput
                type="password"
                onIonInput={(event: any) => setPassword(event.target.value)}
              ></IonInput>
              <IonRouterLink slot="helper" href="#">
                Forgot Password?
              </IonRouterLink>
            </IonItem>

            <IonCol>
              <IonButton onClick={signInEmailPassword}>Login</IonButton>
              <IonButton onClick={signInWithGoogle} color="tertiary">
                <IonIcon icon={logoGoogle}></IonIcon> &nbsp;Sign in with Google
              </IonButton>
              <IonButton onClick={moveToSignup}>New User?</IonButton>
            </IonCol>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
