/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import { useState, useContext } from 'react';
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
  IonInput,
  IonButton
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
// import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';
import LoginOrProfileButton from '../../components/loginOrProfileButton';
import HomePageMenuItems from '../../components/HomePageMenuItems';
import PersonalProgress from '../../components/PersonalProgress';
import NavBar from '../../components/NavBar';
import './HomePage.css';
interface badgeOutline {
  name: string;
}

const HomePage: React.FC = (): any => {
  // const ctx = useContext(AuthContext);
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

  const moveToManualSteps = () => {
    history.push('/app/manualsteps');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Home</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
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
              <IonButton onClick={moveToManualSteps}>here</IonButton>
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
            <IonCol className="boxSize">Location for leaderboards</IonCol>
            <IonCol className="boxSize">
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
            <IonCol>
              <IonRow>
                <IonCol className="boxSize">Location for anouncments</IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="boxSize">
                  Location for personal Progress: <PersonalProgress />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
