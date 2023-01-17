/* eslint-disable multiline-ternary */
import React, { useState, useContext } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonInput
} from '@ionic/react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import LoginOrProfileButton from '../../components/loginOrProfileButton';
import HomePageMenuItems from '../../components/HomePageMenuItems';
import PersonalProgress from '../../components/PersonalProgress';
interface badgeOutline {
  name: string;
}

const HomePage: React.FC = () => {
  const ctx = useContext(AuthContext);
  const [steps, setSteps] = useState(0);
  const history = useHistory();
  const [badges, setBadges] = useState(Array<badgeOutline>);

  const stepUpdateHandler = (event: any): void => {
    const newValue = document.querySelector('#stepsUpdate') as HTMLInputElement;
    const newSteps = Number(newValue.value);
    if (newSteps > 0) {
      // console.log(newSteps);
      setSteps(newSteps);
    }
    // console.log(newValue.value);
  };

  return ctx.isLoggedIn ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons id="homePage">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonTitle slot="secondary">Home Page</IonTitle>
          <LoginOrProfileButton />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonMenu contentId="homePage">
          <IonToolbar>
            <IonTitle>Menue</IonTitle>
          </IonToolbar>
          <HomePageMenuItems />
        </IonMenu>
        <IonItem>
          <IonGrid>
            <IonRow>
              <IonCol size="auto">
                <IonItem>
                  <IonLabel>
                    Todays Steps:
                    <IonInput
                      id="stepsUpdate"
                      type="number"
                      placeholder={steps.toString()}
                      onInput={(event: any) => {
                        stepUpdateHandler(event);
                      }}
                      min="1"
                      step="1"
                    ></IonInput>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              click
              <a href="/manualStepsLogging">here</a>
              to see previous logs
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonItem>
          <IonLabel>
            Badges Acquired:
            <div>
              {badges.map((badge) => (
                <IonIcon name={badge.name} key={Math.random()}></IonIcon>
              ))}
            </div>
          </IonLabel>
        </IonItem>

        {/* below is only for development testing purposes */}
        <IonGrid>
          <IonRow>
            <IonCol>Location for leaderboards</IonCol>
            <IonCol>Loaction for chat</IonCol>
            <IonCol>
              <IonRow>
                <IonCol>Location for anouncments</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  Location for personal Progress: <PersonalProgress />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  ) : (
    history.push('/login')
  );
};

export default HomePage;
