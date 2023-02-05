/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable multiline-ternary */
import { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import './HomePage.css';
import ProgressChart from '../../components/ProgressChart';
import AuthContext from '../../store/auth-context';
import { getDoc } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import { doc } from 'firebase/firestore';
import ExitSurveyModal from '../exitQuestions/exitQuestionsModal';

interface badgeOutline {
  name: string;
}

interface StepLog {
  date: string;
  steps: number;
}

const HomePage: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const history = useHistory();
  const [badges, setBadges] = useState(Array<badgeOutline>);
  const [pastSevenDaysSteps, setPastSevenDaysSteps] = useState(Array<StepLog>);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    getPastSevenDaysSteps();
  }, []);

  const getPastSevenDaysSteps = async () => {
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.replace('/login');
      return;
    }
    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    const stepsByDate = userData.stepsByDate;
    const today = new Date();
    const pastSevenDays = [];
    for (let i = 0; i < stepsByDate.length; i++) {
      const date = new Date(stepsByDate[i].date);
      const diff = (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
      if (diff < 8 && diff >= 0) {
        pastSevenDays.push(stepsByDate[i]);
      }
    }
    setPastSevenDaysSteps(pastSevenDays);
  };

  const stepUpdateHandler = (event: any): void => {
    const newValue = document.querySelector('#stepsUpdate') as HTMLInputElement;
    const newSteps = Number(newValue.value);
    if (newSteps > 0) {
      setSteps(newSteps);
    }
  };

  const moveToManualSteps = () => {
    history.push('/app/manualsteps');
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar>
          <IonTitle>Home Page</IonTitle>
        </NavBar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding testing">
        <IonGrid>
          <IonRow>
            <IonCol
              size="9"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="9"
            ></IonCol>
            <IonCol size="3" sizeSm="6" sizeXs="12" sizeMd="6" sizeLg="3">
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
            <IonCol
              size="9"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="9"
            ></IonCol>
            <IonCol size="3" sizeSm="6" sizeXs="12" sizeMd="6" sizeLg="3">
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
                  {
                    /* {pastSevenDaysSteps.length > 1 ? (
                    <ProgressChart data={pastSevenDaysSteps} />
                  ) : (
                    ' '
                  )} */
                    // pastSevenDaysSteps.map((item) => (
                    //   <IonItem key={Math.random()}>
                    //     {item.date + ' ' + item.steps}
                    //   </IonItem>
                    // ))
                  }
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
