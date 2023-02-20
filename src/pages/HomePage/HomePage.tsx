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
  IonText,
  IonItem,
  isPlatform,
  useIonToast
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
//import ExitSurveyModal from '../exitQuestions/exitQuestionsModal';
import { Health } from '@awesome-cordova-plugins/health';
import { updateDoc } from 'firebase/firestore';

import LeaderBoardChart from '../../components/LeaderBoard/LeaderBoardChart';
import { library } from 'ionicons/icons';
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
  const [present] = useIonToast();
  const supportedTypes = [
    'steps',
    'distance', // Read and write permissions
    {
      read: ['steps'], // Read only permission
      write: ['height', 'weight'] // Write only permission
    }
  ];
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (ctx.user) {
      console.log('get past seven days steps');
      getPastSevenDaysSteps();
      GFrequestAuthorization();
    }
  }, [ctx.user]);

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

  const GFrequestAuthorization = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    await Health.requestAuthorization(supportedTypes)
      .then(GFupdateSteps)
      .catch((error: any) => alert(JSON.stringify(error)));

    return;
  };
  const GFupdateSteps = async () => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      alert('Google Fit is only available on android and ios.');
      return;
    }
    const date = new Date();
    const stepOptions: object = {
      // note I change it from HealthQueryOptions to object as HealthQueryOptions is not valid typing
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(),
      dataType: 'steps',
      filtered: true
    };
    await Health.query(stepOptions)
      .then(async (data: any) => {
        const dbRef = doc(FirestoreDB, 'users', auth.currentUser.email as string);
        const dbSnap = await getDoc(dbRef);
        const dbStepsByDate: StepLog[] = dbSnap.data().stepsByDate;
        if (dbStepsByDate.length > 0) {
          dbStepsByDate.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        }
        let dayCount = 0;
        let prevIndex = 0;
        const healthAppData: StepLog[] = [];
        for (let i = 0; i < data.length; i++) {
          const current = data[i];
          const steps = current.value;
          const date = current.startDate.toISOString().slice(0, 10);
          const prevDate = data[prevIndex].startDate.toISOString().slice(0, 10);
          if (date === prevDate && i != 0){
            healthAppData[dayCount - 1].steps += steps;
          }
          else {
            healthAppData[dayCount] = { date, steps };
            dayCount++;
          }
          prevIndex = i;
        }
        const stepsByDate = [];
        let totalStep = 0;
        let dbIndex = 0;
        let healthAppIndex = 0;
        let flag = -1;
        let i = 0;
        if (dbStepsByDate.length === 0) {
          flag = 1;
        } else if (healthAppData.length === 0) {
          flag = 0;
        }
        while(flag === -1) {
          const healthAppDateString = healthAppData[healthAppIndex].date;
          const healthAppSteps = healthAppData[healthAppIndex].steps;
          const dbDateString = dbStepsByDate[dbIndex].date;
          const dbSteps = dbStepsByDate[dbIndex].steps;
          const healthAppDate = new Date(healthAppDateString);
          const dbDate = new Date(dbDateString);
          if (healthAppDate < dbDate){
            const date = healthAppDateString;
            const steps = healthAppSteps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            healthAppIndex++;
          } else if (healthAppDate > dbDate) {
            const date = dbDateString;
            const steps = dbSteps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            dbIndex++;
          } else {
            const steps = dbSteps > healthAppSteps ? dbSteps : healthAppSteps;
            const date = dbDateString;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            healthAppIndex++;
            dbIndex++;
          }
          i++;
          if (healthAppIndex >= healthAppData.length) {
            flag = 0;
          } else if (dbIndex >= dbStepsByDate.length) {
            flag = 1;
          }
        }
        if (flag === 0) {
          for(; dbIndex < dbStepsByDate.length; dbIndex++) {
            const date = dbStepsByDate[dbIndex].date;
            const steps = dbStepsByDate[dbIndex].steps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            i++;
          }
        } else if (flag === 1) {
          for(; healthAppIndex < healthAppData.length; healthAppIndex++) {
            const date = healthAppData[healthAppIndex].date;
            const steps = healthAppData[healthAppIndex].steps;
            totalStep += steps;
            stepsByDate[i] = { date, steps };
            i++;
          }
        }
        await updateCurrentUser(stepsByDate, totalStep);
        present({
          message: 'Steps Updated!',
          duration: 1500,
          position: 'bottom'
        });
      })
      .catch((error: any) => alert(JSON.stringify(error) + 'query failed'));
  };
  const updateCurrentUser = async (stepsByDate: any, totalStep: any) => {
    if (ctx.user === null) {
      alert('You are not looged in!');
      history.push('/login');
      return;
    }
    const currentUserRef = doc(
      FirestoreDB,
      'users',
      auth.currentUser.email as string
    );
    await updateDoc(currentUserRef, {
      stepsByDate: stepsByDate,
      totalStep: totalStep
    });
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
            <IonCol size="9" sizeSm="6" sizeXs="12" sizeMd="6" sizeLg="9">
              <IonLabel className="">
                Todays Steps:{' '}
                <div className="localStepsUpdater">{steps.toString()}</div>
              </IonLabel>
              {/* <IonItem
                className="localStepsUpdater"
                id="stepsUpdate"
                placeholder={steps.toString()}
                onInput={(event: any) => {
                  stepUpdateHandler(event);
                }}
              >
                sad
              </IonItem> */}
              <br />
              click
              <a onClick={moveToManualSteps}> here </a>
              to see previous logs
            </IonCol>
            <IonCol
              size="3"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="3"
            ></IonCol>
            <IonCol
              size="9"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="9"
            ></IonCol>
            <IonCol
              size="3"
              sizeSm="6"
              sizeXs="12"
              sizeMd="6"
              sizeLg="3"
            ></IonCol>
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
              <LeaderBoardChart></LeaderBoardChart>
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
                  {pastSevenDaysSteps.length > 1 ? (
                    <ProgressChart data={pastSevenDaysSteps} />
                  ) : (
                    ' '
                  )}
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
