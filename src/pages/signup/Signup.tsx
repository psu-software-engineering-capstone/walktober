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
import { db } from "../../firebase"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";

const Signup: React.FC = () => {

  const [users, setUsers] = useState([{}]);
  const usersCollectionRef = collection(db, "users");
  
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      email: newEmail,
      first_name: newFirstName,
      last_name: newLastName,
      password: newPassword,
      badges: [],
      device: "",
      num_steps: 0,
      profile_pic: "",
      team: "",
      team_leader: false,
      username: ""
    });
  };

  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const googleAuth = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = (credential as OAuthCredential).accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        alert(JSON.stringify(result));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(JSON.stringify(error));
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [usersCollectionRef]);


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
