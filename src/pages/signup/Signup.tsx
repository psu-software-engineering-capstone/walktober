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
//import ExploreContainer from '../../components/ExploreContainer';
import "./Signup.css";

const Signup: React.FC = () => {
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
                <IonLabel position="floating" color="primary">Email</IonLabel>
                <IonInput type="email" name="email" color="medium"></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">First Name</IonLabel>
                <IonInput type="text" name="fname"></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">Last Name</IonLabel>
                <IonInput type="text" name="lname"></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">Password</IonLabel>
                <IonInput type="password" name="password"></IonInput>
              </IonItem>

              <IonItem color="light">
                <IonLabel position="floating" color="primary">Confirm Password</IonLabel>
                <IonInput type="password" name="cpassword"></IonInput>
              </IonItem>

              <IonItem lines="none" color="light">
                <IonButton
                  onClick={validateEmail}
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
