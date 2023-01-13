/* eslint-disable multiline-ternary */
import React, { useState, useContext } from 'react';
import {
  IonButton,
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
  IonButtons
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

  return (
    <>
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
            <IonLabel>Todays Steps:</IonLabel>
            <div>
              <p>{steps}</p>
            </div>
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
          <PersonalProgress />
          {/* below is only for development testing purposes */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomePage;
