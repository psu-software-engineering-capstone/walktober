import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonInput,
  IonButton,
  IonCardSubtitle,
} from "@ionic/react";
//import ExploreContainer from '../../components/ExploreContainer';
import "./Signup.css";

const Signup: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Signup</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>SignUp</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>First Name</IonLabel>
                <IonInput></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Last Name</IonLabel>
                <IonInput></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>Confirm Password</IonLabel>
                <IonInput></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonButton fill="solid" color="primary" class="test">Confirm</IonButton>
              </IonItem>

              <IonCardSubtitle>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Forgot Password?</a>
              </IonCardSubtitle>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
