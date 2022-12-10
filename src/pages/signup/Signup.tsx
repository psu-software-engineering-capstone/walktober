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
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { FirestoreDB, auth } from "../../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import "./Signup.css";



const Signup: React.FC = () => {
  const history = useHistory();

  // sign-up input variables //
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  // google auth provider //
  const provider = new GoogleAuthProvider();

  // user creation //
  const createUser = async () => {
    await setDoc(doc(FirestoreDB, "users", newEmail), {
      email: newEmail,
      name: newFirstName + " " + newLastName,
      badges: [],
      device: "",
      num_steps: 0,
      profile_pic: "",
      team: "",
      team_leader: false,
    });
  };

  // user creation with google auth //
  const createUserWithGoogleAuth = async (result: UserCredential) => {
    await setDoc(doc(FirestoreDB, "users", result.user.email as string), {
      email: result.user.email,
      name: result.user.displayName,
      badges: [],
      device: "",
      num_steps: 0,
      profile_pic: result.user.photoURL,
      team: "",
      team_leader: false,
    });
  };

  // const createUserWithGoogleAuthMobile = async (result: any) => {
  //   await setDoc(doc(FirestoreDB, "users", result.email as string), {
  //     email: result.email,
  //     name: result.name,
  //     badges: [],
  //     device: "",
  //     num_steps: 0,
  //     profile_pic: result.imageUrl,
  //     team: "",
  //     team_leader: false,
  //   });
  // };

  // google sign-up //
  const googleAuth = async () => {
    // web //
    if (!isPlatform("capacitor")) {
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const dbRef = doc(FirestoreDB, "users", result.user.email as string);
          const dbSnap = await getDoc(dbRef);
          if (dbSnap.exists()) {
            alert("There is already an existing account under this email");
          } else {
            alert("Sign-up successful");
            createUserWithGoogleAuth(result);
            history.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    // ios & android //
    } else {
      await GoogleAuth.signOut();
      await FirebaseAuthentication.signOut();
      await GoogleAuth.signIn()
        .then(async (result) => {
          await FirebaseAuthentication.signInWithGoogle(
            result.authentication.idToken,
            result.authentication.accessToken
          );
          // check duplicate account
          // needs to be implemented
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
  };

  //email sign-up (email verification needs to be implemented later)//
  const signUpEmailPassword = async () => {
    // web //
    if (!isPlatform("capacitor")) {
      if (newPassword === newConfirmPassword) {
        await createUserWithEmailAndPassword(auth, newEmail, newPassword)
          .then((data) => {
            createUser();
            console.log(data);
            alert("Sign-up successful");
            history.push("/login");
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      } else {
        alert("Passwords are not matching");
      }
    // ios & android //
    } else {
      if (newPassword === newConfirmPassword) {
        FirebaseAuthentication.createUserWithEmailAndPassword(
          newEmail,
          newPassword
        )
          .then((data) => {
            createUser();
            console.log(data);
            alert("Sign-up successful");
            history.push("/login");
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      } else {
        alert("Passwords are not matching");
      }
    }
  };

  // back to login button
  const moveToLogin = () => {
    history.push("/login");
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

              {/*Need hyperlink for the forgot password once implemented*/}
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