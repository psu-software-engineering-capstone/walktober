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
  useIonAlert,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import "./Signup.css";

import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { set, ref } from "firebase/database";
import { uid } from "uid";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential, UserCredential } from "firebase/auth";

const Signup: React.FC = () => {

  const [users, setUsers] = useState([{}]);
  
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  
  const createUser = async () => {
    const uuid = uid();
    await set(ref(db, `/${uuid}`), {
      email: newEmail,
      name: newFirstName + " " + newLastName,
      password: newPassword,
      badges: [],
      device: "",
      num_steps: 0,
      profile_pic: "",
      team: "",
      team_leader: false,
    });
  };

  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const createUserWithGoogleAuth = async (result: UserCredential) => {
    const uuid = uid();
    await set(ref(db, `/${uuid}`), {
      email: result.user.email,
      name: result.user.displayName,
      password: "",
      badges: [],
      device: "",
      num_steps: 0,
      profile_pic: result.user.photoURL,
      team: "",
      team_leader: false,
    });
  }

  const googleAuth = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = (credential as OAuthCredential).accessToken;
        const user = result.user;
        createUserWithGoogleAuth(result);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(JSON.stringify(error));
      });
  };

  const [presentAlert] = useIonAlert();

  function validateEmail() {
    presentAlert({
      header: "Alert",
      cssClass: "center-alert",
      subHeader: "There is already an existing account under this email",
      message: "Would you like to reset password?",
      buttons: [
        {
          text: "No",
          cssClass: 'alert-button-no',
        },
        {
          text: "Yes",
          cssClass: 'alert-button-yes',
          handler: () => {
            window.open(
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
            );
          },
        },
      ],
    });
  }

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
                <IonLabel>Email</IonLabel>
                <IonInput type="email" name="email" onIonChange={(e) =>
                  setNewEmail(e.target.value as string)
                }></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel>First Name</IonLabel>
                <IonInput type="text" name="fname" onIonChange={(e) =>
                  setNewFirstName(e.target.value as string)
                }></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel>Last Name</IonLabel>
                <IonInput type="text" name="lname" onIonChange={(e) =>
                  setNewLastName(e.target.value as string)
                }></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel>Password</IonLabel>
                <IonInput type="password" name="password" onIonChange={(e) =>
                  setNewPassword(e.target.value as string)
                }></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel>Confirm Password</IonLabel>
                <IonInput type="password" name="cpassword" onIonChange={(e) =>
                  setNewConfirmPassword(e.target.value as string)
                }></IonInput>
              </IonItem>

              <IonItem lines="none" color="light">
                <IonButton
                  onClick={createUser}
                  fill="solid"
                  color="tertiary"
                  size="default"
                  class="cbutton"
                >
                  Confirm
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
                  Google Alternate Sign In
                </IonButton>
              </IonItem>
              {/*Need hyperlink for the forgot password once implemented*/}
              <IonCardContent class="fpass">
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
