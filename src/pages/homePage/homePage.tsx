// File is the home page React feature component created by NathanMoes
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
import { getDoc, doc } from 'firebase/firestore';
import { auth, FirestoreDB } from '../../firebase';
import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import './homePage.css';

// below is the outline for badges, a non developed part of the project
interface badgeOutline {
  name: string;
}

// below is the outline for step logs for displaying. Needed prototype for typescript
interface StepLog {
  date: string;
  steps: number;
}

// below is the feature component for the home page
const HomePage: React.FC = () => {
  const [steps, setSteps] = useState(0); // steps to be used for current days steps
  const history = useHistory(); // history for routing
  const [badges, setBadges] = useState(Array<badgeOutline>); // badges for non implemented feature
  const [pastSevenDaysSteps, setPastSevenDaysSteps] = useState(Array<StepLog>); // As the variable says, it is the var to store and access the current user's past seven days steps for use in personal progress chart

  const ctx = useContext(AuthContext); // context hook for user data

  // load in user data and set it
  useEffect(() => {
    if (ctx.user) {
      console.log('get past seven days steps');
      getPastSevenDaysSteps();
    }
  }, [ctx.user]);

  // get past seven days of steps from firestore
  // even though the user does not have seven days of steps
  // the chart will still render with seven days of steps
  // each day will have 0 steps
  const getPastSevenDaysSteps = async () => {
    if (ctx.user === null) {
      alert('You are not logged in!');
      history.push('/login');
      return;
    }

    const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
    const dbSnap = await getDoc(dbRef);
    const userData = dbSnap.data();
    const stepsByDate = userData.stepsByDate;

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

    setPastSevenDaysSteps(pastSevenDays);
  };

  // const stepUpdateHandler = (event: any): void => {
  //   const newValue = document.querySelector('#stepsUpdate') as HTMLInputElement;
  //   const newSteps = Number(newValue.value);
  //   if (newSteps > 0) {
  //     setSteps(newSteps);
  //   }
  // };

  // handle refresher
  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay execution for 2 seconds
    getPastSevenDaysSteps(); // Refresh data
    event.detail.complete(); // Notify the refresher that loading is complete
  }

  // changes naviagtion to the manual steps recording page
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
                Todays Steps:{' '}
                <div className="localStepsUpdater">{steps.toString()}</div>
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
                <ProgressChart
                  data={pastSevenDaysSteps.reverse()}
                  todayStep={0}
                  stepGoal={0}
                />
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
