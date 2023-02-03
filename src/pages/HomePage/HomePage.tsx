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
        <NavBar>Home Page</NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding testing">
        <IonGrid>
          <IonRow>
            <IonCol size="9"></IonCol>
            <IonCol size="3">
              <IonLabel className="localStepsUpdater">Todays Steps:</IonLabel>
              <IonInput
                className="localStepsUpdater"
                id="stepsUpdate"
                type="number"
                placeholder={steps.toString()}
                onInput={(event: any) => {
                  stepUpdateHandler(event);
                }}
                min="1"
                step="1"
              ></IonInput>
            </IonCol>
            <IonCol size="9"></IonCol>
            <IonCol size="3">
              click
              <a onClick={moveToManualSteps}> here </a>
              to see previous logs
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* below is only for development testing purposes */}
        <IonGrid>
          <IonRow>
            <IonCol
              className="boxSize"
              sizeSm="12"
              sizeLg="4"
              sizeMd="6"
              sizeXs="12"
            >
              Location for leaderboards
            </IonCol>
            <IonCol
              className="boxSize"
              sizeSm="12"
              sizeLg="4"
              sizeMd="6"
              sizeXs="12"
            >
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
            <IonCol sizeSm="12" sizeLg="4" sizeMd="6" sizeXs="12">
              <IonGrid>
                <IonCol className="boxSize">Location for announcements</IonCol>
                <br />
                <IonCol className="boxSize">
                  Location for personal Progress:
                </IonCol>
              </IonGrid>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                Badges Acquired:
                <div>
                  {badges.map((badge) => (
                    <IonIcon name={badge.name} key={Math.random()}></IonIcon>
                  ))}
                </div>
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
