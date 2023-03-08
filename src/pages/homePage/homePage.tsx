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
  RefresherEventDetail,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import WidgetBot from '@widgetbot/react-embed';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar';
import ProgressChart from '../../components/ProgressChart';
import AuthContext from '../../store/auth-context';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import './homePage.css';

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
  const [stepGoal, setStepGoal] = useState(0);

  const ctx = useContext(AuthContext); // auth context

  // update profile data when the page loads
  // update profile data when the profile data changes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(FirestoreDB, 'users', auth.currentUser.email as string),
      (doc: any) => {
        if (doc.exists()) {
          getPastSevenDaysSteps(doc.data());
        }
      }
    );
    return () => {
      console.log('unsubscribing from home page');
      unsubscribe();
    };
  }, [ctx.user]);

  // get past seven days of steps from firestore
  const getPastSevenDaysSteps = async (userData: any) => {
    const stepsByDate = userData.stepsByDate;
    const stepGoal = userData.step_goal;

    //Add today's step count
    if (stepsByDate.length > 0) {
      const today = new Date().toISOString().slice(0, 10);
      if (stepsByDate[0].date == today) {
        setSteps(stepsByDate[0].steps);
      }
      else if (stepsByDate[stepsByDate.length - 1].date == today) {
        setSteps(stepsByDate[stepsByDate.length - 1].steps);
      }
    }

    // Create an array of the last seven dates (including today)
    const pastSevenDaysDates = [];
    for (let i = 1; i < 8; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      pastSevenDaysDates.push(date.toISOString().slice(0, 10));
    }
    // Populate pastSevenDays with step count or 0 for each date
    const pastSevenDays = pastSevenDaysDates.map((date) => {
      const stepLog = stepsByDate.find(
        (stepLog: StepLog) => stepLog.date === date
      );
      if (stepLog) {
        return stepLog;
      } else {
        return { date: date, steps: 0 };
      }
    });
    setPastSevenDaysSteps(pastSevenDays.reverse());
    setStepGoal(stepGoal);
  };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // move to manual steps page
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
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="4"
              className="leaderBoard"
            >
              <LeaderBoardChart></LeaderBoardChart>
            </IonCol>
            <IonCol
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="4"
              className="todaysSteps"
            >
              <IonLabel className="">
                Todays Steps: <div className="localStepsUpdater">{steps}</div>
              </IonLabel>
              <br />
              click
              <a onClick={moveToManualSteps}> here </a>
              to see previous logs
            </IonCol>
            <IonCol
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="4"
              className="personalProgress"
            >
              {pastSevenDaysSteps.length > 1 ? (
                <ProgressChart data={pastSevenDaysSteps} todayStep = {steps} stepGoal = {stepGoal} />
              ) : (
                ' '
              )}
            </IonCol>
            <IonCol
              size="3"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="8"
              offsetLg="4"
              className="box-test"
            >
              <WidgetBot
                className="discord-widget"
                server="1068966007886069841"
                channel="1068966009106600110"
              />
            </IonCol>
          </IonRow>

          <IonCol sizeMd="12">
            <IonLabel>
              Badges Acquired:
              <div>
                {badges.map((badge) => (
                  <IonIcon name={badge.name} key={Math.random()}></IonIcon>
                ))}
              </div>
            </IonLabel>
          </IonCol>
        </IonGrid>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
