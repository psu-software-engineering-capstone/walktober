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
} from "@ionic/react";
//import ExploreContainer from '../../components/ExploreContainer';
import "./Signup.css";

const Signup: React.FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle class="ion-text-center">SignUp</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput type="email" name="email"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>First Name</IonLabel>
                <IonInput type="text" name="fname"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Last Name</IonLabel>
                <IonInput type="text" name="lname"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput type="password" name="password"></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Confirm Password</IonLabel>
                <IonInput type="password" name="cpassword"></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonButton fill="solid" color="tertiary" class="cbutton">
                  Confirm
                </IonButton>
              </IonItem>
              {/*Need hyperlink for the forgot password once implemented*/}
              <IonCardContent class="fpass" color="primary">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
                  Forgot Password?
                </a>
              </IonCardContent>
              <IonItem lines="none">
                <IonButton fill="solid" color="success" class="gbutton">
                  Google Alternate Sign In
                </IonButton>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
