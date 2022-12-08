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
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { db, auth } from "../../firebase";
import { set, ref, child, get } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider, OAuthCredential, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
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

  // user creation begins //
  const createUser = async () => {
    await set(ref(db, 'users/' + auth.currentUser?.uid), {
      email: newEmail,
      name: newFirstName + " " + newLastName,
      badges: {'0': 'starter'},
      device: "",
      num_steps: 0,
      profile_pic: "",
      team: "",
      team_leader: false,
    });
  };

  const createUserWithGoogleAuth = async (result: UserCredential) => {
    await set(ref(db, 'users/' + auth.currentUser?.uid), {
      email: result.user.email,
      name: result.user.displayName,
      badges: {'0': 'starter'},
      device: "",
      num_steps: 0,
      profile_pic: result.user.photoURL,
      team: "",
      team_leader: false,
    });
  }
  // user creation ends //

  // google sign-up begins //
  const googleAuth = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = (credential as OAuthCredential).accessToken;
        const user = result.user;
        const dbRef = ref(db);
        // duplicate email check
        get(child(dbRef, "users/" + auth.currentUser?.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            alert("There is already an existing account under this email");
          } else {
            alert("Sign-up successful")
            createUserWithGoogleAuth(result);
            history.push("/login");
          }
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        alert("There was an error. Please try again.");
      });
  };
  // google sign-up ends //

  //email sign-un begins (email verification needs to be implemented later)//
  const signUpEmailPassword = async () => {
    if (newPassword === newConfirmPassword) {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword)
        .then(() => {
          createUser();
          alert("Sign-up successful");
          history.push("/login");
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    } else {
      alert("Passwords are not matching");
    }
  }
  //email sign-up ends //

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
